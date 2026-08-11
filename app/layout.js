import "../styles.css";

export const metadata = {
  title: "Sensia Horizontes do Atlântico | Guia do morador",
  description: "Guia privado com informações práticas para os moradores do condomínio Sensia Horizontes do Atlântico.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
