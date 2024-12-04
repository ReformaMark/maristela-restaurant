'use client'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import {  Doc } from '../../../../convex/_generated/dataModel'
import CategoryTemplate from './CategoryTemplate'
import { RatingWithUser } from '@/components/ProductCard'


export type AugmentedMenu = Doc<'menus'> & {
    ratings: RatingWithUser[];
    url?: string | null | undefined;
  };

function Menus() {
  const allmenus = useQuery(api.menus.allMenus)
  const menus = allmenus?.filter(menu => menu.isArchived === false)
  const numberOfPork = ()=>{
    return menus?.filter((menu)=> menu.category === 'Pork').length
  }
  const numberOfChicken = ()=>{
      return menus?.filter((menu)=> menu.category === 'Chicken').length
  }
  const numberOfPP = ()=>{
      return menus?.filter((menu)=> menu.category === 'Pancit & Pasta').length
  }
  const numberOfExtras = ()=>{
      return menus?.filter((menu)=> menu.category === 'Extras').length
  }
  const numberOfBeverages = ()=>{
      return menus?.filter((menu)=> menu.category === 'Beverages').length
  }
  const numberOfSP = ()=>{
      return menus?.filter((menu)=> menu.category === 'Sizzling Plate').length
  }
  const numberOfSSM= ()=>{
      return menus?.filter((menu)=> menu.category === 'Super Silog Meals').length
  }
  const numberOfSeafood = ()=>{
      return menus?.filter((menu)=> menu.category === 'Seafood').length
  }
  const numberOfVeggies = ()=>{
      return menus?.filter((menu)=> menu.category === 'Veggies').length
  }
  const numberOfDesserts = ()=>{
      return menus?.filter((menu)=> menu.category === 'Desserts').length
  }
  return (
    <div>
      {(numberOfPork() || 0) > 0 && <CategoryTemplate menus={menus} categoryName='Pork'/>}
      {(numberOfChicken() || 0) > 0 && <CategoryTemplate menus={menus} categoryName='Chicken'/>}
      {(numberOfPP() || 0) > 0 && <CategoryTemplate menus={menus} categoryName='Pancit & Pasta'/>}
      {(numberOfExtras()|| 0) > 0 && <CategoryTemplate menus={menus} categoryName='Extras'/>}
      {(numberOfBeverages()|| 0) > 0 && <CategoryTemplate menus={menus} categoryName='Beverages'/>}
      {(numberOfSP() || 0) > 0 && <CategoryTemplate menus={menus} categoryName='Sizzling Plate'/>}
      {(numberOfSSM() || 0) > 0 && <CategoryTemplate menus={menus} categoryName='Super Silog Meals'/>}
      {(numberOfSeafood() || 0) > 0 && <CategoryTemplate menus={menus} categoryName='Seafood'/>}
      {(numberOfVeggies() || 0) > 0 && <CategoryTemplate menus={menus} categoryName='Veggies'/>}
      {(numberOfDesserts() || 0) > 0 && <CategoryTemplate menus={menus} categoryName='Desserts'/>}
  </div>
  )
}

export default Menus