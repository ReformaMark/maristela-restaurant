import { Button } from "@/components/ui/button"
import { MobileSheet } from "./mobile-sheet"
import { BellIcon } from "lucide-react"
import { UserAvatar } from "./user-avatar"

export const DashboardHeader = () => {
    return (
        <header className="flex h-14 items-center justify-between border-b border-red-200 px-4 bg-gray-100/60">
            <MobileSheet />

            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                    <BellIcon className="h-5 w-5" />
                </Button>

                <UserAvatar />
            </div>
        </header>
    )
}