import "../styles.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Sensia Horizontes do Atlântico | Guia do morador",
  description: "Guia privado com informações práticas para os moradores do condomínio Sensia Horizontes do Atlântico.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
