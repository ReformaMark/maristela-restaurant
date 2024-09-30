import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface OverviewCardProps {
    title: string;
    description: string;
    data: string;
    icon: LucideIcon;
    className?: string;
}

export const OverviewCard = ({
    data,
    description,
    title,
    icon: Icon,
    className
}: OverviewCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 bg-red-400 rounded-t-md text-white">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent className="pt-3">
                <div className="text-2xl font-bold">{data}</div>
                <p className="text-xs opacity-80">{description}</p>
            </CardContent>
        </Card>
    )
}