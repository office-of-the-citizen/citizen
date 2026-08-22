import type { MetadataRoute } from "next";

/**
 * Installable citizen application. Nothing here is constitutional truth —
 * it is presentation and platform identity, which is Citizen's own
 * responsibility. Shortcuts open the two doorways citizens use most.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Your Local Government — Office of the Citizen",
    short_name: "Your LG",
    description:
      "Discover Nigeria, your state, and the constitutional profile of your Local Government.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4f7f4",
    theme_color: "#095c33",
    lang: "en-NG",
    categories: ["government", "education", "news"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "Search records", short_name: "Search", url: "/search" },
      { name: "Explore Nigeria", short_name: "Explore", url: "/explore" },
      { name: "Participate", short_name: "Participate", url: "/participate" },
    ],
  };
}
