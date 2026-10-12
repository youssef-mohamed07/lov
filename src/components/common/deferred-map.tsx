"use client";

import { LoaderCircle, MapPinned } from "lucide-react";
import { useState } from "react";

type DeferredMapProps = {
  address: string;
  city: string;
  embedSrc: string;
  title: string;
};

export function DeferredMap({
  address,
  city,
  embedSrc,
  title,
}: DeferredMapProps) {
  const [isRequested, setIsRequested] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative size-full min-h-[280px] overflow-hidden bg-[#f3f0ea]">
      {isRequested && (
        <iframe
          title={title}
          src={embedSrc}
          className={`absolute inset-0 size-full border-0 grayscale-[0.15] contrast-[1.05] transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div
            className="absolute inset-0 opacity-50"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(32deg, transparent 46%, rgba(255,255,255,.9) 47%, rgba(255,255,255,.9) 51%, transparent 52%), linear-gradient(112deg, transparent 43%, rgba(255,255,255,.75) 44%, rgba(255,255,255,.75) 48%, transparent 49%)",
            }}
          />
          <div className="relative flex max-w-xs flex-col items-center text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-background text-accent shadow-sm">
              {isRequested ? (
                <LoaderCircle className="size-6 animate-spin" aria-hidden />
              ) : (
                <MapPinned className="size-6" aria-hidden />
              )}
            </span>
            <p className="mt-4 font-display text-lg font-semibold text-foreground">
              {address}
            </p>
            <p className="mt-1 text-sm text-muted">{city}</p>
            {!isRequested && (
              <button
                type="button"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-white"
                onClick={() => setIsRequested(true)}
              >
                Afficher la carte
              </button>
            )}
            {isRequested && (
              <p className="mt-4 text-sm text-muted" role="status">
                Chargement de la carte…
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
