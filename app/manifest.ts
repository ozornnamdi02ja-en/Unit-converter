import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Universal Unit Converter",
    short_name: "Unit Converter",
    description:
      "A universal unit converter for mathematics, physics, chemistry, computing , biology and everyday measurements.",
    start_url: "/",
    display: "standalone",
    background_color: "black",
    theme_color: "#166534",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}