import Link from "next/link";
export default function NotFound() {
  return (
    <section className="vacio">
      <h1>Página no encontrada</h1>
      <p>Esta dirección no existe.</p>
      <Link href="/">Volver al juego</Link>
    </section>
  );
}
