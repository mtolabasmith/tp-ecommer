import { ImageResponse } from "next/og";

export const alt = "The Archive — Football Heritage Collection";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0c0a",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 14, color: "#c8a84b" }}>
          THE ARCHIVE
        </div>
        <div
          style={{
            fontSize: 66,
            marginTop: 28,
            color: "#ede7d9",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Football Heritage Collection
        </div>
        <div style={{ fontSize: 24, marginTop: 28, color: "#877e72" }}>
          Legends · Eternal Finals · Iconic Drops
        </div>
      </div>
    ),
    { ...size }
  );
}
