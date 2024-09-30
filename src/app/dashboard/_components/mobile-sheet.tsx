"use client"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
export const MobileSheet = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen} >

                <div className="flex items-center space-x-4">
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <MenuIcon className="h-5 w-5 text-muted-foreground" />
                        </Button>
                    </SheetTrigger>
                </div>

                <SheetContent side="left" className="w-64 p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet >


        </>
    )
}