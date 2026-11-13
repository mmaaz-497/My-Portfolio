import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { siteConfig } from "@/config/site";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for headings.
const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.xHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(siteConfig.url),
};

export const viewport: Viewport = {
  // One tag for the default (dark) theme; ThemeToggle updates it when the
  // visitor's saved choice is light, since the site theme ignores the OS setting.
  themeColor: "#0a0a0a",
};

const personId = new URL("#person", siteConfig.url).toString();

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: siteConfig.url,
      image: new URL("profile.jpg", siteConfig.url).toString(),
      email: `mailto:${siteConfig.email}`,
      jobTitle: siteConfig.role,
      description: siteConfig.description,
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.x],
      knowsAbout: ["Agentic AI", "Full-Stack Development", "Next.js", "Python", "OpenAI Agents SDK"],
    },
    {
      "@type": "WebSite",
      name: `${siteConfig.name} Portfolio`,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en",
      author: { "@id": personId },
    },
  ],
};

// Applies the saved theme before first paint so there is no flash. Dark is the
// default; light is used only when the visitor has chosen it.
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
