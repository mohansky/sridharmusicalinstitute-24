import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heading } from "../custom-ui/heading";
import { options } from "@/.velite";

export default function FAQ() {
  return (
    < >
      <Heading>FAQ</Heading>
      <Accordion type="single" collapsible>
        {options.faq.map((item: any, index: number) => (
          <AccordionItem value={item.question} key={index}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ >
  );
}
