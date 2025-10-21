import Header from "./components/Header";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors min-h-screen">
      {/* Cabeçalho */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex items-center h-[calc(100vh-5rem)] px-16">
        <div className="flex flex-col items-start space-y-4">
          {/* Nome principal */}
          <div className="leading-tight">
            <h1 className="text-7xl font-extrabold text-red-600">BRENO</h1>
            <span className="block text-3xl text-gray-700 dark:text-gray-300 ml-1">
              TECH
            </span>
          </div>

          {/* Subtítulo */}
          <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
            Cadastro de Colaboradores
          </h2>
        </div>
      </main>
    </div>
  );
}
