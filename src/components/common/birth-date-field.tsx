"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

const MONTHS = [
  { value: "01", short: "Jan", label: "Janvier" },
  { value: "02", short: "Fév", label: "Février" },
  { value: "03", short: "Mar", label: "Mars" },
  { value: "04", short: "Avr", label: "Avril" },
  { value: "05", short: "Mai", label: "Mai" },
  { value: "06", short: "Juin", label: "Juin" },
  { value: "07", short: "Juil", label: "Juillet" },
  { value: "08", short: "Août", label: "Août" },
  { value: "09", short: "Sep", label: "Septembre" },
  { value: "10", short: "Oct", label: "Octobre" },
  { value: "11", short: "Nov", label: "Novembre" },
  { value: "12", short: "Déc", label: "Décembre" },
] as const;

type Segment = "day" | "month" | "year";

type BirthDateFieldProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  /** Large typographic preview + age chip. Off by default in tight layouts. */
  featured?: boolean;
};

function daysInMonth(year: string, month: string) {
  if (!year || !month) return 31;
  return new Date(Number(year), Number(month), 0).getDate();
}

function clampDay(day: string, year: string, month: string) {
  if (!day) return day;
  const maximum = daysInMonth(year, month);
  return Number(day) > maximum ? String(maximum).padStart(2, "0") : day;
}

function padDay(day: string) {
  if (!day) return "";
  return day.padStart(2, "0");
}

export function calculateAge(birthDate: string) {
  if (!birthDate) return null;
  const birth = new Date(`${birthDate}T12:00:00`);
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export function BirthDateField({
  value,
  onChange,
  name,
  featured = false,
}: BirthDateFieldProps) {
  const initial = value.split("-");
  const [year, setYear] = useState(initial[0] ?? "");
  const [month, setMonth] = useState(initial[1] ?? "");
  const [day, setDay] = useState(initial[2] ?? "");
  const [active, setActive] = useState<Segment | null>(null);

  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const dayId = useId();
  const yearId = useId();
  const currentYear = new Date().getFullYear();

  const committed = year.length === 4 && month && day ? `${year}-${month}-${day}` : "";

  useEffect(() => {
    function handlePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setActive(null);
      }
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, []);

  function emit(nextYear: string, nextMonth: string, nextDay: string) {
    const validYear =
      nextYear.length === 4 &&
      Number(nextYear) >= currentYear - 120 &&
      Number(nextYear) <= currentYear;
    if (validYear && nextMonth && nextDay) {
      onChange(`${nextYear}-${nextMonth}-${nextDay}`);
      return;
    }
    onChange("");
  }

  function applyDay(raw: string, nextYear = year, nextMonth = month) {
    const digits = raw.replace(/\D/g, "").slice(0, 2);
    const nextDay = clampDay(digits.length === 2 ? padDay(digits) : digits, nextYear, nextMonth);
    setDay(nextDay);
    emit(nextYear, nextMonth, nextDay.length === 2 ? nextDay : "");
    return nextDay;
  }

  function applyMonth(nextMonth: string) {
    const nextDay = clampDay(day.length === 2 ? day : padDay(day), year, nextMonth);
    setMonth(nextMonth);
    setDay(nextDay);
    emit(year, nextMonth, nextDay.length === 2 ? nextDay : "");
    setActive("year");
    requestAnimationFrame(() => yearRef.current?.focus());
  }

  function applyYear(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    const nextDay = clampDay(day.length === 2 ? day : padDay(day), digits, month);
    setYear(digits);
    setDay(nextDay);
    emit(digits, month, nextDay.length === 2 ? nextDay : "");
  }

  function handleDayChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 2);
    const paddedEarly = digits.length === 1 && Number(digits) > 3;
    const nextDay = applyDay(paddedEarly ? padDay(digits) : digits);
    if (nextDay.length === 2) {
      setActive("month");
      dayRef.current?.blur();
    }
  }

  function handleDayBlur() {
    if (day.length === 1 && Number(day) > 0) {
      applyDay(padDay(day));
    }
  }

  function handleDayKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowRight" && (day.length === 2 || !day)) {
      event.preventDefault();
      setActive("month");
    }
  }

  function handleYearKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !year) {
      event.preventDefault();
      setActive("month");
    }
    if (event.key === "ArrowLeft" && !year) {
      event.preventDefault();
      setActive("month");
    }
  }

  const monthMeta = MONTHS.find((item) => item.value === month);
  const age = calculateAge(committed);
  const ageReady = age !== null && age >= 0 && age <= 120;

  return (
    <div ref={rootRef} className="min-w-0">
      {featured ? (
        <div className="mb-5">
          <p className="font-display text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.35rem]">
            <span className={day.length === 2 ? "text-foreground" : "text-muted-soft"}>
              {day.length === 2 ? padDay(day) : "JJ"}
            </span>
            <span className="mx-2.5 text-muted-soft/70">·</span>
            <span
              className={cn(
                "italic",
                monthMeta ? "text-brand" : "text-muted-soft",
              )}
            >
              {monthMeta ? monthMeta.label.toLowerCase() : "mois"}
            </span>
            <span className="mx-2.5 text-muted-soft/70">·</span>
            <span className={year.length === 4 ? "text-foreground" : "text-muted-soft"}>
              {year.length === 4 ? year : "AAAA"}
            </span>
          </p>
          {ageReady ? (
            <p className="mt-3 inline-flex items-center rounded-full bg-[var(--flow-tone-soft)] px-3 py-1 text-sm font-medium text-foreground ring-1 ring-inset ring-[var(--flow-tone)]/20">
              {age} {age > 1 ? "ans" : "an"}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">Tapez le jour, choisissez le mois.</p>
          )}
        </div>
      ) : null}

      <div
        className={cn(
          "grid grid-cols-[4.6rem_1fr_5.6rem] overflow-hidden rounded-2xl border bg-background transition-[border-color,box-shadow]",
          active
            ? "border-[var(--flow-tone)] shadow-[0_0_0_4px_var(--flow-tone-soft)]"
            : "border-border",
        )}
      >
        <label
          htmlFor={dayId}
          className={cn(
            "flex min-h-[4.25rem] cursor-text flex-col justify-center border-r border-border px-3 transition-colors",
            active === "day" && "bg-[var(--flow-tone-soft)]",
          )}
        >
          <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">
            Jour
          </span>
          <input
            id={dayId}
            ref={dayRef}
            inputMode="numeric"
            autoComplete="bday-day"
            maxLength={2}
            placeholder="15"
            aria-label="Jour de naissance"
            value={day}
            onFocus={() => setActive("day")}
            onBlur={handleDayBlur}
            onChange={(event) => handleDayChange(event.target.value)}
            onKeyDown={handleDayKeyDown}
            className="w-full bg-transparent font-display text-2xl font-semibold tracking-tight text-foreground outline-none placeholder:text-muted-soft"
          />
        </label>

        <button
          type="button"
          aria-expanded={active === "month"}
          aria-label="Mois de naissance"
          onClick={() => setActive(active === "month" ? null : "month")}
          className={cn(
            "flex min-h-[4.25rem] flex-col items-start justify-center border-r border-border px-4 text-left transition-colors",
            active === "month" && "bg-[var(--flow-tone-soft)]",
          )}
        >
          <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">
            Mois
          </span>
          <span
            className={cn(
              "font-display text-2xl font-semibold tracking-tight",
              monthMeta ? "text-foreground" : "text-muted-soft",
            )}
          >
            {monthMeta ? monthMeta.label : "Août"}
          </span>
        </button>

        <label
          htmlFor={yearId}
          className={cn(
            "flex min-h-[4.25rem] cursor-text flex-col justify-center px-3 transition-colors",
            active === "year" && "bg-[var(--flow-tone-soft)]",
          )}
        >
          <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">
            Année
          </span>
          <input
            id={yearId}
            ref={yearRef}
            inputMode="numeric"
            autoComplete="bday-year"
            maxLength={4}
            placeholder="2018"
            aria-label="Année de naissance"
            value={year}
            onFocus={() => setActive("year")}
            onChange={(event) => applyYear(event.target.value)}
            onKeyDown={handleYearKeyDown}
            className="w-full bg-transparent font-display text-2xl font-semibold tracking-tight text-foreground outline-none placeholder:text-muted-soft"
          />
        </label>
      </div>

      <div
        className={cn(
          "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out",
          active === "month" && "grid-rows-[1fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
            {MONTHS.map((item) => {
              const selected = item.value === month;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => applyMonth(item.value)}
                  className={cn(
                    "rounded-xl px-2 py-2.5 text-center text-sm font-medium transition-colors",
                    selected
                      ? "bg-[var(--flow-tone)] text-[var(--flow-tone-fg)]"
                      : "bg-surface-muted text-foreground hover:bg-[var(--flow-tone-soft)]",
                  )}
                >
                  {item.short}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {name ? <input type="hidden" name={name} value={value} /> : null}
    </div>
  );
}
