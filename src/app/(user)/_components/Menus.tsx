'use client'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { DocumentByName } from 'convex/server'
import { DataModel } from '../../../../convex/_generated/dataModel'
import Recommendation from './Recommendation'
import CategoryTemplate from './CategoryTemplate'


export type AugmentedMenu = DocumentByName<DataModel, "menus"> & {
    ratings?: DocumentByName<DataModel, "ratings">[];
    url?: string | null | undefined;
  };

function Menus() {
    const menus = useQuery(api.menus.allMenus)
  return (
    <div>
        <Recommendation/>
        <CategoryTemplate menus={menus} categoryName='Pork'/>
        <CategoryTemplate menus={menus} categoryName='Chicken'/>
        <CategoryTemplate menus={menus} categoryName='Pancit & Pasta'/>
        <CategoryTemplate menus={menus} categoryName='Extras'/>
        <CategoryTemplate menus={menus} categoryName='Beverages'/>
        <CategoryTemplate menus={menus} categoryName='Sizzling Plate'/>
        <CategoryTemplate menus={menus} categoryName='Super Silog Meals'/>
        <CategoryTemplate menus={menus} categoryName='Seafood'/>
        <CategoryTemplate menus={menus} categoryName='Veggies'/>
    </div>
  )
}

export default Menus