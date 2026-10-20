"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Visual design follows 21st.dev's "heroui-date-picker" (field + rounded
// popover calendar with a month/year heading, round day cells); the logic is
// written fresh because that component was a static June 2026 mock.

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const YEARS_AHEAD = 5;

const monthHeading = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });
const shortDisplay = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});
const longLabel = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function sameDay(a: Date | null, b: Date | null) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** YYYY-MM-DD in local time (what the form submits). */
function toIso(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Whole weeks covering the given month, Sunday first. */
function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const start = addDays(first, -first.getDay());
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Math.ceil((first.getDay() + daysInMonth) / 7) * 7;
  return Array.from({ length: cells }, (_, i) => addDays(start, i));
}

type View = { year: number; month: number };

/**
 * Date picker for forms: a field-styled trigger plus a popover calendar.
 * Past dates are disabled. Submits the chosen date as YYYY-MM-DD under
 * `name` via a hidden input.
 */
export function DatePicker({
  id,
  name,
  className,
  placeholder = "Select a date",
}: {
  id?: string;
  name: string;
  /** Classes for the trigger, so it can match the surrounding inputs. */
  className?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [yearMode, setYearMode] = useState(false);
  const [view, setView] = useState<View>(() => {
    const today = startOfToday();
    return { year: today.getFullYear(), month: today.getMonth() };
  });
  const [focused, setFocused] = useState<Date | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const daysRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  const today = startOfToday();
  const isPast = (date: Date) => date.getTime() < today.getTime();
  const atFirstMonth = view.year === today.getFullYear() && view.month === today.getMonth();

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Keep DOM focus on the keyboard-focused day as it moves.
  useEffect(() => {
    if (!open || yearMode || !focused) return;
    daysRef.current
      ?.querySelector<HTMLButtonElement>(`[data-date="${toIso(focused)}"]`)
      ?.focus();
  }, [open, yearMode, focused]);

  function showMonth(year: number, month: number) {
    const target = new Date(year, month, 1);
    const earliest = new Date(today.getFullYear(), today.getMonth(), 1);
    const clamped = target.getTime() < earliest.getTime() ? earliest : target;
    setView({ year: clamped.getFullYear(), month: clamped.getMonth() });
  }

  function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    const start = value ?? today;
    setView({ year: start.getFullYear(), month: start.getMonth() });
    setFocused(start);
    setYearMode(false);
    setOpen(true);
  }

  function select(date: Date) {
    setValue(date);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function moveFocus(days: number) {
    if (!focused) return;
    let next = addDays(focused, days);
    if (isPast(next)) next = today;
    setFocused(next);
    if (next.getFullYear() !== view.year || next.getMonth() !== view.month) {
      setView({ year: next.getFullYear(), month: next.getMonth() });
    }
  }

  function onDaysKeyDown(e: React.KeyboardEvent) {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in moves) {
      e.preventDefault();
      moveFocus(moves[e.key]);
    }
  }

  const days = monthGrid(view.year, view.month);
  const inView = (date: Date) => date.getFullYear() === view.year && date.getMonth() === view.month;
  // Roving tabindex: one day in the grid is reachable with Tab.
  const tabbable =
    focused && inView(focused) && !isPast(focused)
      ? focused
      : days.find((d) => inView(d) && !isPast(d)) ?? null;

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        onClick={toggle}
        className={cn(className, "flex cursor-pointer items-center justify-between gap-3 text-left")}
      >
        <span className={value ? "text-paper" : "text-muted-2"}>
          {value ? shortDisplay.format(value) : placeholder}
        </span>
        <Calendar size={16} className="shrink-0 text-muted" aria-hidden />
      </button>
      <input type="hidden" name={name} value={value ? toIso(value) : ""} />

      {open ? (
        <div
          id={popoverId}
          role="dialog"
          aria-label="Choose a date"
          className="absolute right-0 top-[calc(100%+0.375rem)] z-50 w-[16rem] max-w-[calc(100vw-2rem)] origin-top animate-[date-picker-in_160ms_ease-out] rounded-xl border border-line-strong bg-surface-2 p-2.5 shadow-[0_18px_44px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setYearMode((m) => !m)}
              aria-expanded={yearMode}
              className="flex h-7 items-center gap-1 rounded-md px-1.5 text-[13px] font-medium text-paper transition-colors hover:bg-paper/5"
            >
              {monthHeading.format(new Date(view.year, view.month, 1))}
              <ChevronDown
                size={14}
                className={cn("text-muted transition-transform", yearMode && "rotate-180")}
                aria-hidden
              />
            </button>
            <button
              type="button"
              aria-label="Previous month"
              disabled={atFirstMonth}
              onClick={() => showMonth(view.year, view.month - 1)}
              className="ml-auto flex size-7 items-center justify-center rounded-md text-paper transition-colors hover:bg-paper/5 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => showMonth(view.year, view.month + 1)}
              className="flex size-7 items-center justify-center rounded-md text-paper transition-colors hover:bg-paper/5"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {yearMode ? (
            <div className="mt-2 grid grid-cols-3 gap-1 border-t border-line pt-2">
              {Array.from({ length: YEARS_AHEAD + 1 }, (_, i) => today.getFullYear() + i).map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    showMonth(year, view.month);
                    setYearMode(false);
                  }}
                  className={cn(
                    "h-8 rounded-md text-[12px] transition-colors",
                    year === view.year ? "bg-paper font-semibold text-ink" : "text-paper hover:bg-paper/10"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-1.5 grid grid-cols-7" aria-hidden>
                {WEEK_DAYS.map((d) => (
                  <span key={d} className="flex h-6 items-center justify-center text-[11px] font-medium text-muted-2">
                    {d}
                  </span>
                ))}
              </div>
              <div ref={daysRef} className="grid grid-cols-7 gap-y-0.5" onKeyDown={onDaysKeyDown}>
                {days.map((date) => {
                  const past = isPast(date);
                  const selected = sameDay(date, value);
                  const isToday = sameDay(date, today);
                  return (
                    <button
                      key={toIso(date)}
                      type="button"
                      data-date={toIso(date)}
                      disabled={past}
                      tabIndex={sameDay(date, tabbable) ? 0 : -1}
                      aria-label={`${longLabel.format(date)}${isToday ? ", today" : ""}${selected ? ", selected" : ""}`}
                      aria-current={isToday ? "date" : undefined}
                      onClick={() => select(date)}
                      onFocus={() => setFocused(date)}
                      className={cn(
                        "mx-auto flex size-7 items-center justify-center rounded-full text-[12px] transition-[background-color,color,transform] duration-150 active:scale-95",
                        selected
                          ? "bg-paper font-semibold text-ink"
                          : past
                            ? "cursor-not-allowed text-muted-2/40"
                            : inView(date)
                              ? "text-paper hover:bg-paper/10"
                              : "text-muted-2 hover:bg-paper/10",
                        isToday && !selected && "ring-1 ring-inset ring-line-strong"
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <div className="mt-1.5 flex items-center justify-between border-t border-line pt-1.5">
            <button
              type="button"
              onClick={() => {
                setValue(null);
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className={cn(
                "rounded-lg px-2 py-1 text-[12px] text-muted transition-colors hover:text-paper",
                !value && "invisible"
              )}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => select(today)}
              className="rounded-lg px-2 py-1 text-[12px] font-medium text-paper transition-colors hover:bg-paper/5"
            >
              Today
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
