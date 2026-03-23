import { ImageResponse } from "next/og";
import { getCrystalById, getAllCrystalIds } from "@/app/lib/crystals";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import sharp from "sharp";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return getAllCrystalIds().map((id) => ({ id }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const crystal = getCrystalById(id);
  if (!crystal) return new Response("Not found", { status: 404 });

  // Convert WebP to PNG for Satori compatibility
  let imageDataUri = "";
  try {
    const imgPath = join(process.cwd(), "public", "crystals", `${id}.webp`);
    if (existsSync(imgPath)) {
      const pngBuffer = await sharp(imgPath).resize(280, 280).png().toBuffer();
      imageDataUri = `data:image/png;base64,${pngBuffer.toString("base64")}`;
    }
  } catch {
    // No image available, will use gradient fallback
  }

  // Load fonts
  const playfairBold = readFileSync(
    join(process.cwd(), "public", "fonts", "PlayfairDisplay-Bold.ttf")
  );
  const jakartaMedium = readFileSync(
    join(process.cwd(), "public", "fonts", "PlusJakartaSans-Medium.ttf")
  );

  const gradientColors =
    crystal.colorHexes.length >= 2
      ? `linear-gradient(135deg, ${crystal.colorHexes[0]}40, ${crystal.colorHexes[1]}40)`
      : `linear-gradient(135deg, #A78BFA20, #7C3AED20)`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0d0d14",
          position: "relative",
        }}
      >
        {/* Subtle gradient overlay from crystal colors */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: gradientColors,
            display: "flex",
          }}
        />

        {/* Border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #A78BFA, #7C3AED)",
            display: "flex",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "48px 60px",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* Crystal image */}
          {imageDataUri ? (
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: 24,
                overflow: "hidden",
                flexShrink: 0,
                background: "#14141e",
                border: "2px solid #1e1e32",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={imageDataUri}
                width={280}
                height={280}
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: 24,
                flexShrink: 0,
                background: `linear-gradient(135deg, ${crystal.colorHexes[0] || "#A78BFA"}, ${crystal.colorHexes[1] || "#7C3AED"})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}

          {/* Text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 12,
            }}
          >
            {/* Category */}
            <div
              style={{
                color: "#A78BFA",
                fontSize: 20,
                fontFamily: "Plus Jakarta Sans",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {crystal.category}
            </div>

            {/* Crystal name */}
            <div
              style={{
                color: "#ffffff",
                fontSize: 56,
                fontFamily: "Playfair Display",
                lineHeight: 1.1,
              }}
            >
              {crystal.name}
            </div>

            {/* Subtitle */}
            <div
              style={{
                color: "#A78BFA",
                fontSize: 28,
                fontFamily: "Playfair Display",
                fontStyle: "italic",
                opacity: 0.8,
              }}
            >
              {crystal.subtitle}
            </div>

            {/* Quick stats */}
            <div
              style={{
                display: "flex",
                gap: 32,
                marginTop: 16,
                color: "#8b8b9e",
                fontSize: 18,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              <div style={{ display: "flex" }}>
                {crystal.chemicalFormula}
              </div>
              <div style={{ display: "flex" }}>
                Hardness: {crystal.hardness}
              </div>
              <div style={{ display: "flex" }}>
                {crystal.crystalSystem}
              </div>
            </div>

            {/* Site name */}
            <div
              style={{
                color: "#8b8b9e",
                fontSize: 18,
                fontFamily: "Plus Jakarta Sans",
                marginTop: 20,
                opacity: 0.6,
              }}
            >
              crystalalmanac.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Playfair Display",
          data: playfairBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Plus Jakarta Sans",
          data: jakartaMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
