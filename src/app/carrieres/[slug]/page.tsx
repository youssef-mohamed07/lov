import type { Metadata } from "next";
import { Check, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/common/reveal";
import { CareersApplyForm } from "@/components/sections/careers-apply-form";
import { PageIntro } from "@/components/sections/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import {
  getAllCareerRoleSlugs,
  getCareerRole,
  getCareerRoleHref,
} from "@/data/carrieres";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

type CareerRolePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCareerRoleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CareerRolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRole(slug);
  if (!role) return {};

  return createPageMetadata({
    title: `${role.title} — rejoindre Lov`,
    description: role.description,
    path: getCareerRoleHref(role.slug),
    image: role.image,
    imageAlt: `Poste ${role.title} chez Lov`,
  });
}

export default async function CareerRolePage({ params }: CareerRolePageProps) {
  const { slug } = await params;
  const role = getCareerRole(slug);
  if (!role) notFound();

  const path = getCareerRoleHref(role.slug);
  const roleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JobPosting",
        "@id": absoluteUrl(`${path}#job`),
        title: role.title,
        description: role.about,
        hiringOrganization: {
          "@id": absoluteUrl("/#organization"),
        },
        ...(role.mode.toLowerCase().includes("distance") &&
        !role.mode.toLowerCase().includes("présentiel")
          ? { jobLocationType: "TELECOMMUTE" }
          : {}),
        employmentType: role.type,
        url: absoluteUrl(path),
      },
      breadcrumbJsonLd([
        { name: "Accueil", path: "/" },
        { name: "Carrières", path: "/carrieres" },
        { name: role.title, path },
      ]),
    ],
  };

  const sections = [
    { title: "Missions", items: role.missions },
    { title: "Profil recherché", items: role.profile },
    { title: "Ce que nous offrons", items: role.offer },
  ] as const;

  return (
    <main>
      <JsonLd id="career-role-jsonld" data={roleJsonLd} />

      <PageIntro
        eyebrow="Poste ouvert"
        title={role.title}
        description={role.description}
        image={role.image}
        imageAlt={`Illustration du poste ${role.title}`}
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Carrières", href: "/carrieres" },
          { label: role.title },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
            <span className="rounded-full bg-accent-soft px-3 py-1.5 font-medium text-accent">
              {role.type}
            </span>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5">
              {role.mode}
            </span>
            <span className="inline-flex items-center gap-1.5 px-1">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {role.location}
            </span>
          </div>
        }
      />

      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Reveal variant="fade">
                <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
                  Le poste
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Pourquoi ce rôle
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  {role.about}
                </p>
              </Reveal>

              <div className="mt-12 space-y-10">
                {sections.map((section, sectionIndex) => (
                  <Reveal
                    key={section.title}
                    delay={sectionIndex * 0.06}
                    variant="fade"
                  >
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {section.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-6 text-foreground sm:text-base sm:leading-7"
                        >
                          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                            <Check className="size-3.5" aria-hidden />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.08} variant="fade">
              <div className="sticky top-[calc(var(--header-height)+1rem)] overflow-hidden rounded-[1.75rem] bg-foreground px-6 py-8 text-background sm:px-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                >
                  <div className="absolute -top-1/3 -right-10 size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(254,81,16,0.35),transparent_62%)] blur-2xl" />
                </div>
                <div className="relative">
                  <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                    Postuler
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">
                    Envoyez votre candidature
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Déposez votre CV pour le poste de {role.title}. Nous
                    revenons vers vous rapidement.
                  </p>
                  <div className="mt-6">
                    <CareersApplyForm role={role.title} roleSlug={role.slug} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
