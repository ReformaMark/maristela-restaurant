"use client"
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAllMenus } from "@/features/menu/api/use-all-menus";
import { Loader2Icon } from "lucide-react";
import { EditColumns } from "./_components/edit-columns";
import { useMemo, useState } from "react";
const EditProductsPage = () => {
    const { data, isLoading } = useAllMenus()
    const [activeTab, setActiveTab] = useState("edit")

    const filteredMenu = useMemo(() => {
        if (activeTab === "edit") {
            return data?.filter(m => m.isArchived === false)
        } else {
            return data?.filter(m => m.isArchived === true)
        }
    }, [data, activeTab])

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
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-6">
                <div className="col-span-1">
                    <div className="grid">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Products
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="edit" className="w-full" onValueChange={(value) => setActiveTab(value)}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="edit">Products</TabsTrigger>
                                        <TabsTrigger value="archived">Archived</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="edit">
                                        <DataTable
                                            columns={EditColumns}
                                            // @ts-expect-error just a type error
                                            data={filteredMenu}
                                            filter="name"
                                        />
                                    </TabsContent>
                                    <TabsContent value="archived">
                                        <DataTable
                                            columns={EditColumns}
                                            // @ts-expect-error just a type error
                                            data={filteredMenu}
                                            filter="name"
                                        />
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProductsPage;