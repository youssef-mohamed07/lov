import { z } from "zod";

import { uploadPrivateFile } from "@/lib/cloudinary";
import { getSql } from "@/lib/db";

export const runtime = "nodejs";

const text = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) =>
  z.string().trim().max(max).optional().default("");
const email = z.string().trim().email().max(254).transform((value) => value.toLowerCase());

const contactSchema = z.object({
  kind: z.literal("contact"),
  name: text(120),
  email,
  subject: text(80),
  message: text(5000),
});

const newsletterSchema = z.object({
  kind: z.literal("newsletter"),
  email,
});

const eligibilitySchema = z.object({
  kind: z.literal("eligibility_request"),
  eligibility: z.object({
    bookingFor: text(40),
    birthDate: text(10),
    reason: text(80),
    reasonEligible: z.boolean(),
    situations: z.array(text(80)).max(20),
    technical: z.array(text(80)).max(20),
    technicalComplete: z.boolean(),
  }),
  patientLastName: text(120),
  patientFirstName: text(120),
  patientBirthDate: text(10),
  patientSex: optionalText(20),
  guardianLastName: optionalText(120),
  guardianFirstName: optionalText(120),
  guardianLink: optionalText(40),
  parentalAuthority: z.boolean(),
  email,
  phone: text(40),
  address: text(250),
  postalCode: text(20),
  city: text(120),
  country: text(80),
  doctorName: optionalText(160),
  prescription: text(20),
  previousCare: text(20),
  source: optionalText(80),
  terms: z.literal(true),
  earlyStart: z.literal(true),
  marketing: z.boolean(),
});

const jsonSubmissionSchema = z.discriminatedUnion("kind", [
  contactSchema,
  newsletterSchema,
  eligibilitySchema,
]);

const existingBilanSchema = z.object({
  profile: text(30),
  birthDate: text(10),
  need: text(80),
  name: text(120),
  email,
  phone: text(40),
  message: optionalText(5000),
});

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const kind = String(formData.get("kind") ?? "");

      if (kind === "careers") {
        return handleCareers(formData);
      }

      return handleExistingBilan(formData);
    }

    const parsed = jsonSubmissionSchema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json(
        { error: "Les informations envoyées sont invalides." },
        { status: 400 },
      );
    }

    const sql = getSql();

    if (parsed.data.kind === "newsletter") {
      const [subscriber] = await sql`
        INSERT INTO newsletter_subscribers (email)
        VALUES (${parsed.data.email})
        ON CONFLICT (lower(email))
        DO UPDATE SET status = 'active', updated_at = now()
        RETURNING id
      `;

      return Response.json({ ok: true, id: subscriber.id });
    }

    const submission = parsed.data;
    const [row] = await sql`
      INSERT INTO submissions (kind, email, payload)
      VALUES (
        ${submission.kind},
        ${submission.email},
        ${JSON.stringify(submission)}::jsonb
      )
      RETURNING id
    `;

    return Response.json({ ok: true, id: row.id }, { status: 201 });
  } catch (error) {
    console.error("Submission failed", error);
    return Response.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 },
    );
  }
}

const careersSchema = z.object({
  name: text(120),
  email,
  role: optionalText(120),
  roleSlug: optionalText(80),
});

async function handleCareers(formData: FormData) {
  const parsed = careersSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role") || "",
    roleSlug: formData.get("roleSlug") || "",
  });

  if (!parsed.success) {
    return Response.json(
      { error: "Les informations envoyées sont invalides." },
      { status: 400 },
    );
  }

  const cv = formData.get("cv");
  const hasCv = cv instanceof File && cv.size > 0;

  if (!hasCv) {
    return Response.json(
      { error: "Merci de joindre votre CV." },
      { status: 400 },
    );
  }

  if (cv.size > 4 * 1024 * 1024) {
    return Response.json(
      { error: "Le CV ne doit pas dépasser 4 Mo." },
      { status: 413 },
    );
  }

  const allowedTypes = new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ]);
  if (!allowedTypes.has(cv.type)) {
    return Response.json(
      { error: "Le CV doit être un PDF, DOC, DOCX, JPG ou PNG." },
      { status: 400 },
    );
  }

  const storedCv = await uploadPrivateFile(cv, "lov/careers");
  const payload = {
    ...parsed.data,
    cv: storedCv,
  };
  const sql = getSql();

  const [row] = await sql`
    INSERT INTO submissions (
      kind,
      email,
      payload,
      file_name,
      file_type,
      file_size
    )
    VALUES (
      'careers',
      ${parsed.data.email},
      ${JSON.stringify(payload)}::jsonb,
      ${cv.name},
      ${cv.type},
      ${cv.size}
    )
    RETURNING id
  `;

  return Response.json({ ok: true, id: row.id }, { status: 201 });
}

async function handleExistingBilan(formData: FormData) {
  const parsed = existingBilanSchema.safeParse({
    profile: formData.get("profile"),
    birthDate: formData.get("birthDate"),
    need: formData.get("need"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message") || "",
  });

  if (!parsed.success) {
    return Response.json(
      { error: "Les informations envoyées sont invalides." },
      { status: 400 },
    );
  }

  const report = formData.get("report");
  const hasReport = report instanceof File && report.size > 0;

  if (hasReport && report.size > 4 * 1024 * 1024) {
    return Response.json(
      { error: "Le document ne doit pas dépasser 4 Mo." },
      { status: 413 },
    );
  }

  const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);
  if (hasReport && !allowedTypes.has(report.type)) {
    return Response.json(
      { error: "Le document doit être un PDF, JPG ou PNG." },
      { status: 400 },
    );
  }

  const storedReport = hasReport
    ? await uploadPrivateFile(report, "lov/existing-bilan")
    : null;
  const payload = {
    ...parsed.data,
    report: storedReport,
  };
  const sql = getSql();

  const [row] = await sql`
    INSERT INTO submissions (
      kind,
      email,
      payload,
      file_name,
      file_type,
      file_size
    )
    VALUES (
      'existing_bilan',
      ${parsed.data.email},
      ${JSON.stringify(payload)}::jsonb,
      ${hasReport ? report.name : null},
      ${hasReport ? report.type : null},
      ${hasReport ? report.size : null}
    )
    RETURNING id
  `;

  return Response.json({ ok: true, id: row.id }, { status: 201 });
}
