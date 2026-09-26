import { site } from "@/config/site";
import { formatPrice } from "@/data/menu";
import type { CartLine, OrderDetails } from "@/store/cart";
import { cartTotal } from "@/store/cart";

export type OrderErrors = Partial<Record<keyof OrderDetails, string>>;

export function validateOrder(d: OrderDetails): OrderErrors {
  const e: OrderErrors = {};
  if (!d.name.trim()) e.name = "Add your name so Steph knows who the order is for.";
  if (d.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a phone number with area code.";
  if (d.fulfillment === "delivery" && d.address.trim().length < 6) e.address = "Add a delivery address.";
  if (!d.date) e.date = "Pick a date for your order.";
  return e;
}

export function buildOrderMessage(lines: CartLine[], d: OrderDetails) {
  const items = lines.map((l) => `- ${l.qty} x ${l.name} (${l.option}) ${formatPrice(l.price * l.qty)}`).join("\n");
  const day = d.date ? new Date(`${d.date}T12:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "";
  const when = [day, d.time].filter(Boolean).join(" at ");
  const rows = [
    `Hi ${site.name}! I'd like to place an order.`,
    "",
    items,
    "",
    `Subtotal: ${formatPrice(cartTotal(lines))}`,
    `${d.fulfillment === "delivery" ? "Delivery" : "Pickup"}: ${when}`,
    d.fulfillment === "delivery" ? `Address: ${d.address}` : null,
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.notes ? `Notes: ${d.notes}` : null,
  ];
  return rows.filter((r) => r !== null).join("\n");
}

export const whatsappLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const smsLink = (text: string) => `sms:${site.phoneE164}?&body=${encodeURIComponent(text)}`;
