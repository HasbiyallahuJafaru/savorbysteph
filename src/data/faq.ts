import { site } from "@/config/site";

export const faqs = [
  {
    q: "Where can I get homemade Nigerian food in Charlotte, NC?",
    a: `${site.name} cooks homemade Nigerian and West African food in Charlotte, North Carolina. Browse the menu, build your order and send it to us on WhatsApp for delivery or pickup.`,
  },
  {
    q: "Do you offer delivery and pickup?",
    a: `Yes. We deliver across Charlotte and nearby areas including ${site.areasServed.slice(1, 6).join(", ")}. You can also pick up in Charlotte. Delivery fees depend on distance and are confirmed with your order.`,
  },
  {
    q: "How far ahead should I order?",
    a: site.leadTime,
  },
  {
    q: "How do I pay?",
    a: "Once we confirm your order on WhatsApp or by text, we send your total, including any delivery fee, and how to pay.",
  },
  {
    q: "Do you cater parties and events?",
    a: "Yes. We make party trays of jollof rice, fried rice, small chops, soups and grills for birthdays, weddings, church events and office lunches in the Charlotte area.",
  },
  {
    q: "Can I adjust the spice level?",
    a: "Most dishes can be made milder or hotter. Add a note to your order and Steph will adjust it.",
  },
];
