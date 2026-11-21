import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Memo · Juego de memoria", template: "%s | Memo" },
  description:
    "Juego accesible de parejas con tres dificultades, cronómetro y récords locales.",
  openGraph: {
    title: "Memo · Juego de memoria",
    description: "Pon a prueba tu memoria con un juego de parejas.",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <a className="saltar" href="#contenido">
          Saltar al contenido
        </a>
        <header className="cabecera">
          <div className="contenedor barra">
            <Link className="logo" href="/" aria-label="Memo, ir al juego">
              <span className="logo-icono">✳</span> memo
              <span className="punto">.</span>
            </Link>
            <nav aria-label="Navegación principal">
              <Link href="/">Jugar</Link>
              <Link href="/records">Récords</Link>
            </nav>
          </div>
        </header>
        <main id="contenido" className="contenedor">
          {children}
        </main>
        <footer className="pie">
          <div className="contenedor">
            Memo · Entrena tu mente, una pareja a la vez.{" "}
            <span>Hecho con React y Next.js.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
