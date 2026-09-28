import { TrustShowcase } from "@/components/sections/trust-showcase";

export function HomeShowcase() {
  return (
    <TrustShowcase
      image="/images/drive-home-section-2.png"
      imageAlt="Enfant en séance d’orthophonie en visioconférence"
      badgeLabel="Bilans réalisés"
      badgeValue="400"
      imageCaption="Une évaluation conforme aux exigences professionnelles"
      eyebrow="Pourquoi nous faire confiance ?"
      title={
        <>
          Le bilan orthophonique,{" "}
          <span className="font-medium italic text-voice">
            une autre façon de procéder
          </span>
        </>
      }
      description="Notre cabinet en ligne réalise votre bilan depuis chez vous, avec les mêmes exigences qu’un bilan en cabinet."
      ctaLabel="Demander un bilan"
      ctaHref="/demander-un-bilan"
      priority
    />
  );
}
