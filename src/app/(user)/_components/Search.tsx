'use client';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {  useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Combobox, ComboboxInput, ComboboxOptions } from '@headlessui/react'
import { AugmentedMenu } from "./Menus";
import clsx from "clsx";
import Link from 'next/link'
import { cn } from "@/lib/utils";

function Search() {

  const searchItem = useQuery(api.menus.allMenus)
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();
  const [selectedItem] =  useState<AugmentedMenu | null>(null);

  const filteredMenu =
  searchValue === ''
    ? null
    : searchItem?.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase())
      })


  return (
    <div className="w-full relative flex gap-x-2">
      {/* <Popover open={isPopoverOpen} onOpenChange={()=>{}} >
        <div className="relative w-full">
          <PopoverTrigger asChild>
            <Input
              type="text"
              placeholder="What do you need?"
              id="search"
              name="search"
              className="py-3 pl-32 w-full"
              onChange={handleInputChange}
              value={searchValue}
              onFocus={handleOnFocus}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[500px] md:w-[500px] max-h-52 p-4 overflow-auto lg:w-[500px] xl:w-[500px] 2xl:w-[660px] mt-1 min-h-40 space-y-1 flex flex-col">
            <h1 className="text-sm font-semibold">Search suggestion</h1>
            {searchItem ? searchItem.length >= 1 ? searchItem.map((item) => (
              <Link href={`/search/${item.name}`} key={item._id} className="w-full px-5 hover:bg-yellow py-1 hover:text-primary transition-all duration-300 ease-in">
                {item.name}
              </Link>
            )) : (
              <div className="text-center text-gray-300">
                No suggestion found.
              </div>
            ) : (
              <div className="text-center flex items-center justify-center">
                <Loader2Icon className='w-6 h-6 animate-spin' />
              </div>
            )}
          </PopoverContent>
        </div>
      </Popover> */}
      <Combobox  value={selectedItem?.name} onClose={()=>setSearchValue(searchValue)}>
        <ComboboxInput
          aria-label="search"
          displayValue={(item: AugmentedMenu | null) => item?.name ?? ''}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className={clsx("rounded-md  py-2 pl-32 w-full outline-1 outline-gray-600 border-gray-400 border")} 
        />
          <ComboboxOptions 
            anchor="bottom"
            className={clsx(
              'w-[var(--input-width)] max-h-52 min-h-52 overflow-auto shadow-md bg-white rounded-xl border border-white/5 p-4 [--anchor-gap:var(--spacing-1)] empty:invisible',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
            )}
          >
          <h1 className=" text-sm font-semibold">Search suggestion</h1>
          
          {filteredMenu && filteredMenu.map((item) => (
             <div
             key={item._id}
             
           
             className="py-1 px-3 cursor-pointer hover:bg-yellow hover:text-primary"
           >
             <Link href={`/search/${item.name}`} className="block w-full">
               {item.name}
             </Link>
           </div>
           
          ))}
        </ComboboxOptions>
      </Combobox>

      <Label htmlFor="search" className="absolute top-1 rounded-lg bg-gray-100 py-2 px-2 left-2">
        All Categories
      </Label>
   
   
        <Button disabled={searchValue === '' ? true : false} onClick={()=> {router.push(`/search/${searchValue}`)}} variant={"default"} className={cn("uppercase font-bold py-3")}>
          SEARCH
        </Button>

    </div>
  );
}

export default Search;
