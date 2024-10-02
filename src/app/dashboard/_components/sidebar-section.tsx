import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, LucideIcon } from "lucide-react";
import { useToggle } from "react-use";
interface SidebarSectionProps {
    children: React.ReactNode;
    label: string;
    icon: LucideIcon;
}

export const SidebarSection = ({
    children,
    label,
    icon: Icon,
}: SidebarSectionProps) => {
    const [on, toggle] = useToggle(false)

    return (
        <div className="flex flex-col mt-3 cursor-pointer">
            <div className="flex items-center px-4 group" onClick={toggle}>

                <Icon className="mr-2 h-4 w-4" />

                <div className="flex flex-1 items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="group px-1.5 text-sm h-[28px] justify-start overflow-hidden items-center"
                    >
                        <span className="truncate">{label}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="p-0.5 text-sm shrink-0 size-6"

                    >
                        <ChevronRightIcon className={cn("size-4 transition-transform", on && "rotate-90")} />
                    </Button>
                </div>
            </div>
            {on && (
                <div className="space-y-1 ml-7">
                    {children}
                </div>
            )}
        </div>
    )
}