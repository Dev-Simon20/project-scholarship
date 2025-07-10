import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import path from "path";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
   const data = await request.formData();
   const file = data.get("file") as File;

   if (!file) {
      return NextResponse.json("No se ha subido ningún archivo", {
         status: 400,
      });
   }

   const buffer = Buffer.from(await file.arrayBuffer());

   const mimeType = file.type;
   const isImage = mimeType.startsWith("image/");
   const isVideo = mimeType.startsWith("video/");
   const resourceType: "image" | "video" | "raw" = isImage
      ? "image"
      : isVideo
      ? "video"
      : "raw";

   // ✅ Intentamos obtener nombre y extensión original
   const originalName = file.name || "archivo";
   const ext = path.extname(originalName); // incluye el punto: ".pdf"
   const nameWithoutExt = path.basename(originalName, ext);
   const safeName = nameWithoutExt.replace(/\s+/g, "_"); // Evita espacios

   try {
      const response: UploadApiResponse = await new Promise(
         (resolve, reject) => {
            cloudinary.uploader
               .upload_stream(
                  {
                     resource_type: resourceType,
                     public_id: `${safeName}${ext}`, // ⬅️ Nombre con extensión
                     type: 'upload'
                  },
                  (err, result) => {
                     if (err) return reject(err);
                     resolve(result as UploadApiResponse);
                  }
               )
               .end(buffer);
         }
      );

      return NextResponse.json({
         message: "Archivo subido correctamente",
         data: response.secure_url,
      });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: "Error al subir el archivo" },
         { status: 500 }
      );
   }
}
