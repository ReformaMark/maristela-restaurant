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

function Search() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <PopoverContent>
          <p>Search suggestions will appear here</p>
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
