import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #8B6914, #C9A84C, #F5E6B3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontSize: 18,
          fontWeight: "900",
          color: "white",
          letterSpacing: "-1px",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
