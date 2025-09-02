import type { Metadata } from "next";

const metadataImport: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  authors: [{ name: "Bruno Ken" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default metadataImport;
