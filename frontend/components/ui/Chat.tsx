// components/ui/Chat.tsx

export default function Chat() {
  return (
    <section className="flex-1 p-8">

      <div className="bg-white rounded-3xl shadow-sm h-full flex flex-col p-6">

        {/* Header chat */}
        <div className="mb-6">

          <h2 className="text-2xl font-semibold text-gray-800">
            Asesora Virtual
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Orientación segura y anónima
          </p>

        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-4">

          {/* Mensaje bot */}
          <div className="bg-gray-100 p-4 rounded-2xl max-w-[70%]">

            <p className="text-gray-800">
              Hola, soy Esperanza. ¿Cómo puedo ayudarte hoy?
            </p>

          </div>

          {/* Mensaje usuario */}
          <div className="bg-purple-100 p-4 rounded-2xl max-w-[70%] ml-auto">

            <p className="text-gray-800">
              Necesito ayuda para identificar una situación.
            </p>

          </div>

        </div>

        {/* Botones rápidos */}
        <div className="flex gap-3 mt-6 flex-wrap">

          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-600 transition">
            Iniciar diagnóstico
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600 transition">
            Buscar refugio
          </button>

          <button className="bg-purple-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-purple-600 transition">
            Ruta legal
          </button>

        </div>

        {/* Input */}
        <div className="mt-6 flex gap-4">

          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button className="bg-purple-600 text-white px-6 rounded-2xl hover:bg-purple-700 transition">
            Enviar
          </button>

        </div>

      </div>

    </section>
  );
}