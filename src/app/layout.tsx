import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoStore",
  description: "Catálogo inteligente de veículos",
};

const themeScript = `
(function () {
  try {
    var savedTheme = localStorage.getItem("autostore-theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
