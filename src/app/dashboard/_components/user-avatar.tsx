"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2Icon, LogOutIcon } from "lucide-react"

import { useCurrentUser } from "@/features/auth/api/use-current-user"
import { useAuthActions } from "@convex-dev/auth/react"
import { TbChecklist } from "react-icons/tb"
import Link from "next/link"
import { toast } from "sonner"

export const UserAvatar = () => {
    const { signOut } = useAuthActions()
    const { data, isLoading, } = useCurrentUser()

    if (isLoading) {
        return <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
    }

    if (!data) {
        return null
    }

    // const { name, email, role, image } = data
    const { name, image } = data

    const avatarFallback = name.charAt(0).toUpperCase()

    const handleSignOut = async () => {
        try {
            await signOut()
            toast.success("Signed out successfully")
        } catch (error) {
            toast.error("Failed to sign out")
        }
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-8 hover:opacity-75 transition rounded-md">
                    <AvatarImage alt={name} src={image} className="rounded-md" />
                    <AvatarFallback className="bg-yellow text-white rounded-md text-sm">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="bottom" className="w-60 hidden md:block">
                <Link href={'/orders'} className="">
                    <DropdownMenuItem onClick={() => {}} className="h-10 cursor-pointer">
                        <TbChecklist  className="size-4 mr-2 " />
                        Orders
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleSignOut} className="h-10 cursor-pointer">
                    <LogOutIcon className="size-4 mr-2 " />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}