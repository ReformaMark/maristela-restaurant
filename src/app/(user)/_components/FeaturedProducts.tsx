import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Recommendation from './Recommendation'
import Special from './Special'
import Featured from './Featured'
function FeaturedProducts() {
  return (
    <div className='font-cairo'>
        <h1 className='text-xl md:text-2xl font-bold tracking-wider text-center'>Featured Products</h1>
        <Tabs defaultValue="all" className="w-full">
            <TabsList className='w-full bg-transparent'>
                <TabsTrigger value="all" className='md:text-lg rounded-none data-[state=active]:border-b-2 border-b-primary'>All</TabsTrigger>
                <TabsTrigger value="special" className='md:text-lg rounded-none  data-[state=active]:border-b-2 border-b-primary'>Special</TabsTrigger>
                <TabsTrigger value="recomendation" className='md:text-lg rounded-none  data-[state=active]:border-b-2 border-b-primary'>Chef&apos;s Recommendation</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <Featured/>
            </TabsContent>
            <TabsContent value="special">
                <Special/>
            </TabsContent>
            <TabsContent value="recomendation">
                <Recommendation/>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default FeaturedProducts