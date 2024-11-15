'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { motion } from 'framer-motion'
import { FaBell, FaCheckDouble, FaTrash } from 'react-icons/fa'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useOrderStatusSound } from '@/lib/sounds'
import { Doc, Id } from '../../convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { toast } from 'sonner'

function Notification() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const notifications = useQuery(api.notifications.getNotifications)
    const markAsRead = useMutation(api.notifications.markAsRead)
    const markAllAsRead = useMutation(api.notifications.markAllAsRead)
    const clearNotifications = useMutation(api.notifications.clearNotifications)
    const playOrderStatus = useOrderStatusSound()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [prevNotifications, setPrevNotifications] = useState<Doc<"notifications">[]>()
    const unreadCount = notifications?.filter(n => !n.isRead).length || 0

    useEffect(() => {
        const currentNotifications = notifications;
        
        if (!prevNotifications) {
            setPrevNotifications(notifications);
            return;
        }

        // Only play sound if notifications length increased (new notification added)
        if (currentNotifications && prevNotifications && 
            currentNotifications.length > prevNotifications.length) {
            playOrderStatus();
        }
        
        setPrevNotifications(currentNotifications);
    }, [notifications, prevNotifications, playOrderStatus]);

    const handleNotificationClick = async (notificationId: Id<'notifications'>, orderId: Id<'transactions'>) => {
        await markAsRead({ notificationId })
        router.push(`/orders/${orderId}`)
    }
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <audio ref={audioRef} src="/sounds/notification.mp3" />
            <PopoverTrigger onClick={() => setOpen(true)}>
                <div className="relative">
                    <FaBell className='size-5 text-black' />
                    {unreadCount > 0 ?
                        <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: 2}}
                        transition={{ duration: 0.5 }}
                        className="absolute size-4 top-[-5px] right-[-6px] flex items-center justify-center rounded-full bg-yellow text-white text-sm"
                        >
                            {unreadCount}
                        </motion.div>
                    : null}
                    
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-[300px] p-0 overflow-y-auto">
                <div className="flex flex-col divide-y divide-gray-100 max-h-[300px] overflow-y-auto pb-16">
                    {notifications && notifications?.length > 0 ? (
                        notifications?.map(n => (
                            <div 
                                key={n._id} 
                                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!n.isRead ? 'bg-yellow-50' : ''}`}
                                onClick={() => handleNotificationClick(n._id, n.orderId)}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">{n.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(n._creationTime).toLocaleString()}
                                        </p>
                                    </div>
                                    {!n.isRead && (
                                        <div className="w-2 h-2 rounded-full bg-yellow mt-1.5" />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            No notifications
                        </div>
                    )}
                </div>
                {notifications && notifications?.length > 0 && (
                    <div className="p-2 border-t border-gray-10 fixed bottom-0 w-full bg-white grid grid-cols-2">
                        <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors" 
                        onClick={() => toast.promise(markAllAsRead(), {
                            loading: 'Marking all as read...',
                            success: 'All notifications marked as read',
                            error: 'Failed to mark all as read'
                        })}
                    >
                        <FaCheckDouble className="mr-2 h-4 w-4" />
                        Mark all as read
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors" 
                        onClick={() => toast.promise(clearNotifications(), {
                            loading: 'Clearing notifications...',
                            success: 'All notifications cleared',
                            error: 'Failed to clear notifications'
                        })}
                    >
                        <FaTrash className="mr-2 h-4 w-4" />
                        Clear all notifications
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default Notification