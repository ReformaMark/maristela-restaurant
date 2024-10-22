"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-full rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const HoverPopover = (
  { 
    className,
    children, 
    content, 
    ...props 
  }:{
  className: string,
  children:React.ReactNode;
  content:React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={className}
        {...props}
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}

export { Popover, PopoverTrigger, PopoverContent, HoverPopover }