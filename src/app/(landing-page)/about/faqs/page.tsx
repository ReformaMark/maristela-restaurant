"use client"

import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Image from 'next/image'
import Logo from '@/../public/img/maristela-removebg1.png'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
const faqs = [
  {
    question: "What are your opening hours?",
    answer: "We are open from 10:00 AM to 10:00 PM from Monday to Sunday."
  },
  {
    question: "Do you offer delivery services?",
    answer: "Yes, we offer delivery services within the municipalities of Alitagtag, Cuenca, and Sta. Teresita."
  },
  {
    question: "Can I make a reservation?",
    answer: "Yes, you can make a reservation by calling us at 0920 623 8834."
  },
  {
    question: "Do you have vegetarian options?",
    answer: "Yes, we have a variety of vegetarian options available on our menu."
  },
  {
    question: "Where are you located?",
    answer: "We are located at Concepcion Alitagtag, Batangas, Philippines."
  }
]

export default function FAQsPage() {
    const router = useRouter()
  return (
    <div className="min-h-screen p-5">
        <ArrowLeft onClick={()=> router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
        <div className="relative w-full bg-none md:bg-gray-50">
            <h1 className='absolute w-full text-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl sm:text-xl md:text-2xl lg:text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant FAQs</h1>
            <Image src={Logo} alt='' className='size-48 mx-auto opacity-40'/>
        </div> 
      <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
