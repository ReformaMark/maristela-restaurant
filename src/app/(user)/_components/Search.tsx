'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

function Search() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const searchItem = useQuery(api.menus.searchMenus, {search: searchValue})


  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsPopoverOpen(e.target.value.length > 0); // Show popover when typing starts
  
  };

  const handleOnFocus = () => {
    setIsPopoverOpen(true); // Open popover on focus
  };


  return (
    <div className="relative flex gap-x-2">
      <Popover open={isPopoverOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            placeholder="What do you need?"
            id="search"
            name="search"
            className="py-3 pl-32"
            onChange={handleInputChange}
            value={searchValue}
            onFocus={handleOnFocus}

          />
        </PopoverTrigger>
        <PopoverContent className="w-[500px] inset-0 min-h-40 space-y-3 flex flex-col">
          <h1 className="text-sm font-semibold">Search result</h1>
          {searchItem ? searchItem.map((item)=>(
            <Link href={`/search/${item.name}`} key={item._id} className="w-full px-5 hover:bg-yellow py-2 hover:text-primary transition-all duration-300 ease-in">
              {item.name}
            </Link>
          )): (
            <Loader2Icon className='w-6 h-6 animate-spin' />
          )}
        </PopoverContent>
      </Popover>

      <Label htmlFor="search" className="absolute top-1 rounded-lg bg-gray-100 py-2 px-2 left-2">
        All Categories
      </Label>
      <Button variant={"default"} className="uppercase font-bold">
        SEARCH
      </Button>
    </div>
  );
}

export default Search;
