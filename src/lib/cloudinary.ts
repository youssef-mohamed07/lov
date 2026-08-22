import { v2 as cloudinary } from "cloudinary";

import "server-only";

export type StoredUpload = {
  provider: "cloudinary";
  assetId: string;
  publicId: string;
  version: number;
  resourceType: string;
  deliveryType: string;
  format: string | null;
  bytes: number;
  secureUrl: string;
};

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing.");
  }

  return { cloudName, apiKey, apiSecret };
}

export async function uploadPrivateFile(
  file: File,
  folder = "lov/submissions",
): Promise<StoredUpload> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  const bytes = Buffer.from(await file.arrayBuffer());
  const result = await new Promise<Awaited<ReturnType<typeof cloudinary.uploader.upload>>>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          type: "authenticated",
          folder,
          use_filename: false,
          unique_filename: true,
          overwrite: false,
        },
        (error, uploadResult) => {
          if (error) {
            reject(error);
            return;
          }

          if (!uploadResult) {
            reject(new Error("Cloudinary returned no upload result."));
            return;
          }

          resolve(uploadResult);
        },
      );

      stream.end(bytes);
    },
  );

  return {
    provider: "cloudinary",
    assetId: result.asset_id,
    publicId: result.public_id,
    version: result.version,
    resourceType: result.resource_type,
    deliveryType: result.type,
    format: result.format ?? null,
    bytes: result.bytes,
    secureUrl: result.secure_url,
  };
}
