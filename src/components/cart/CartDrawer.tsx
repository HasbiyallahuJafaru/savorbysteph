"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ChatText, Minus, Plus, ShoppingBagOpen, Storefront, Trash, Truck, WhatsappLogo, X } from "@phosphor-icons/react";
import { site } from "@/config/site";
import { formatPrice } from "@/data/menu";
import { buildOrderMessage, smsLink, validateOrder, whatsappLink, type OrderErrors } from "@/lib/order";
import { cartTotal, useCart, type OrderDetails } from "@/store/cart";

const useIsDesktop = () =>
  useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true,
  );

const timeSlots = ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

export function CartDrawer() {
  const { lines, details, isOpen, close, setQty, remove, setDetails, clear } = useCart();
  const isDesktop = useIsDesktop();
  const lenis = useLenis();
  const [errors, setErrors] = useState<OrderErrors>({});
  const [sent, setSent] = useState(false);
  const total = cartTotal(lines);
  const today = useMemo(() => new Date().toLocaleDateString("en-CA"), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, lenis]);

  useEffect(() => {
    if (!isOpen) setSent(false);
  }, [isOpen]);

  const update = (patch: Partial<OrderDetails>) => {
    setDetails(patch);
    const keys = Object.keys(patch) as (keyof OrderDetails)[];
    if (keys.some((k) => errors[k])) setErrors((e) => ({ ...e, ...Object.fromEntries(keys.map((k) => [k, undefined])) }));
  };

  const send = (channel: "whatsapp" | "sms") => {
    const found = validateOrder(details);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`order-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const msg = buildOrderMessage(lines, details);
    window.open(channel === "whatsapp" ? whatsappLink(msg) : smsLink(msg), "_blank", "noopener");
    setSent(true);
  };

  const panelMotion = isDesktop
    ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <motion.button
            type="button"
            aria-label="Close your order"
            onClick={close}
            className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            {...panelMotion}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            data-lenis-prevent
            className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-[var(--radius-panel)] bg-paper shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[480px] md:rounded-none md:rounded-l-[var(--radius-panel)]"
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-line md:hidden" aria-hidden />
            <div className="flex items-center justify-between px-6 pb-4 pt-4 md:pt-7">
              <h2 id="cart-title" className="text-3xl">
                Your order
              </h2>
              <button type="button" onClick={close} aria-label="Close" className="grid size-11 place-items-center rounded-full hover:bg-shell">
                <X size={22} />
              </button>
            </div>

            {lines.length === 0 ? (
              <EmptyCart onClose={close} />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6">
                  <ul className="divide-y divide-line">
                    <AnimatePresence initial={false}>
                      {lines.map((l) => (
                        <motion.li
                          key={l.key}
                          layout
                          exit={{ opacity: 0, x: 40 }}
                          className="flex items-center gap-4 py-4"
                        >
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-4 ring-white">
                            <Image src={l.image} alt="" fill sizes="64px" className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{l.name}</p>
                            <p className="text-sm text-muted">{l.option}</p>
                            <div className="mt-2 flex items-center gap-1">
                              <QtyButton label={`Decrease ${l.name}`} onClick={() => setQty(l.key, l.qty - 1)}>
                                <Minus size={14} />
                              </QtyButton>
                              <span className="w-7 text-center tabular-nums">{l.qty}</span>
                              <QtyButton label={`Increase ${l.name}`} onClick={() => setQty(l.key, l.qty + 1)}>
                                <Plus size={14} />
                              </QtyButton>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="tabular-nums">{formatPrice(l.price * l.qty)}</span>
                            <button type="button" onClick={() => remove(l.key)} aria-label={`Remove ${l.name}`} className="text-muted hover:text-accent">
                              <Trash size={18} />
                            </button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <div className="mt-4 rounded-[20px] bg-shell p-1.5" role="radiogroup" aria-label="Delivery or pickup">
                    <div className="relative grid grid-cols-2">
                      {(["delivery", "pickup"] as const).map((f) => {
                        const active = details.fulfillment === f;
                        return (
                          <button
                            key={f}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => update({ fulfillment: f })}
                            className={`relative z-10 flex h-12 items-center justify-center gap-2 rounded-2xl text-[15px] font-medium transition-colors ${active ? "text-white" : "text-ink-soft"}`}
                          >
                            {active && (
                              <motion.span layoutId="fulfillment-pill" className="absolute inset-0 -z-10 rounded-2xl bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                            )}
                            {f === "delivery" ? <Truck size={18} /> : <Storefront size={18} />}
                            {f === "delivery" ? "Delivery" : "Pickup"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    {details.fulfillment === "delivery"
                      ? "We deliver across Charlotte and nearby areas. The delivery fee is confirmed with your order."
                      : site.pickupArea}
                  </p>

                  <div className="mt-6 grid gap-4">
                    <Field id="name" label="Full name" error={errors.name}>
                      <input id="order-name" autoComplete="name" value={details.name} onChange={(e) => update({ name: e.target.value })} className={inputCls(errors.name)} />
                    </Field>
                    <Field id="phone" label="Phone" error={errors.phone}>
                      <input id="order-phone" type="tel" autoComplete="tel" inputMode="tel" value={details.phone} onChange={(e) => update({ phone: e.target.value })} className={inputCls(errors.phone)} />
                    </Field>
                    <AnimatePresence initial={false}>
                      {details.fulfillment === "delivery" && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <Field id="address" label="Delivery address" error={errors.address}>
                            <input id="order-address" autoComplete="street-address" value={details.address} onChange={(e) => update({ address: e.target.value })} className={inputCls(errors.address)} />
                          </Field>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="grid grid-cols-2 gap-3">
                      <Field id="date" label={details.fulfillment === "delivery" ? "Delivery date" : "Pickup date"} error={errors.date}>
                        <input id="order-date" type="date" min={today} value={details.date} onChange={(e) => update({ date: e.target.value })} className={inputCls(errors.date)} />
                      </Field>
                      <Field id="time" label="Preferred time">
                        <select id="order-time" value={details.time} onChange={(e) => update({ time: e.target.value })} className={inputCls()}>
                          <option value="">Any time</option>
                          {timeSlots.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <Field id="notes" label="Notes (optional)">
                      <textarea id="order-notes" rows={2} value={details.notes} onChange={(e) => update({ notes: e.target.value })} placeholder="Spice level, allergies, gate code" className={`${inputCls()} h-auto py-3`} />
                    </Field>
                  </div>
                </div>

                <div className="border-t border-line bg-paper px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-display text-2xl tabular-nums">{formatPrice(total)}</span>
                  </div>
                  {sent ? (
                    <div className="mt-4 rounded-2xl bg-accent-tint p-4 text-sm text-accent-deep">
                      Your order message is ready in the app that just opened. Send it, and Steph will confirm your total and timing.
                      <button type="button" onClick={() => { clear(); close(); }} className="mt-3 block font-medium underline underline-offset-4">
                        Done, clear my order
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => send("whatsapp")}
                        className="mt-4 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[#1f7a45] text-[16px] font-medium text-white transition-colors hover:bg-[#186238] active:scale-[0.99]"
                      >
                        <WhatsappLogo size={22} weight="fill" /> Send order on WhatsApp
                      </button>
                      <button type="button" onClick={() => send("sms")} className="mt-2 flex h-11 w-full items-center justify-center gap-2 text-[15px] text-ink-soft hover:text-accent">
                        <ChatText size={18} /> Or send by text message
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

const inputCls = (error?: string) =>
  `h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-ink placeholder:text-[#8a8990] outline-none transition-colors focus:border-ink ${
    error ? "border-accent" : "border-line"
  }`;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`order-${id}`} className="text-sm font-medium text-ink-soft">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-accent-deep">
          {error}
        </p>
      )}
    </div>
  );
}

function QtyButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="grid size-8 place-items-center rounded-full border border-line hover:border-ink">
      {children}
    </button>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 pb-16 pt-8 text-center">
      <div className="grid size-24 place-items-center rounded-full bg-accent-tint text-accent">
        <ShoppingBagOpen size={40} weight="light" />
      </div>
      <p className="mt-6 font-display text-2xl">Nothing here yet</p>
      <p className="mt-2 max-w-[30ch] text-muted">Add a soup, some jollof or a tray of small chops to get started.</p>
      <Link href="/menu" onClick={onClose} className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-7 font-medium text-white hover:bg-accent">
        Browse the menu
      </Link>
    </div>
  );
}
