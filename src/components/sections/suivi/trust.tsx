import { TrustShowcase } from "@/components/sections/trust-showcase";
import { suivi } from "@/data/suivi";

export function SuiviTrust() {
  const { trust } = suivi;

  return (
    <TrustShowcase
      image={trust.image}
      imageAlt={trust.imageAlt}
      imageCaption={trust.imageCaption}
      eyebrow={trust.eyebrow}
      title={
        <>
          {trust.title}{" "}
          <span className="font-medium italic text-voice">
            {trust.titleAccent}
          </span>
        </>
      }
      description={trust.description}
      ctaLabel={trust.ctaLabel}
      ctaHref={trust.ctaHref}
    />
  );
}
