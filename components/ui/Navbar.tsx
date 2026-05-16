export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-white border-b flex items-center justify-between px-6">

      <h1 className="text-2xl font-bold text-purple-700">
        Esperanza
      </h1>

      <div className="flex gap-4">
        <button>Diagnóstico</button>
        <button>Ruta Legal</button>
        <button>Recursos CDMX</button>
      </div>

    </nav>
  );
}