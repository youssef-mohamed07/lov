import { TrustShowcase } from "@/components/sections/trust-showcase";
import { bilan } from "@/data/bilan";

export function BilanTrust() {
  const { trust } = bilan;

  return (
    <TrustShowcase
      image={trust.image}
      imageAlt={trust.imageAlt}
      badgeLabel={trust.badgeLabel}
      badgeValue={trust.badgeValue}
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
