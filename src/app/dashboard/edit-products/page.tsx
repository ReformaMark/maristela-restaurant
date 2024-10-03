"use client"
import { DataTable } from "@/components/data-table";
import { EditColumns } from "./_components/edit-columns";
import { useAllMenus } from "@/features/menu/api/use-all-menus";
import { Loader2Icon } from "lucide-react";

const EditProductsPage = () => {
    const { data, isLoading } = useAllMenus()

    if (isLoading) return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Loader2Icon
                    className="mr-2 h-4 w-4 animate-spin"
                />
            </div>
        </div>
    )

    if (!data) return <div>
        No data.
    </div>

    return (
        <div className="w-full h-full flex justify-center py-4">
            <DataTable
                columns={EditColumns}
                data={data}
                filter="name"
            />
        </div>
    )
}

export default EditProductsPage;