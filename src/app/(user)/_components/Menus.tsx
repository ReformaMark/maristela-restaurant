'use client'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import {  Doc } from '../../../../convex/_generated/dataModel'
import Recommendation from './Recommendation'
import CategoryTemplate from './CategoryTemplate'
import { RatingWithUser } from '@/components/ProductCard'


export type AugmentedMenu = Doc<'menus'> & {
    ratings: RatingWithUser[];
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