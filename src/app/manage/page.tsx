import Header from "../components/Header";
import Forms from "../components/Forms";

export default function Manage(){
    return(
        <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors min-h-screen flex flex-col">
              {/* Cabeçalho */}
              <Header />
        
              {/* Conteúdo principal */}
              <main className="flex-1 flex items-center justify-center px-16 gap-24">
                {/* Lado esquerdo */}
                <div className="flex flex-col items-start space-y-4 max-w-lg">
                  <div className="leading-tight">
                    <h1 className="text-7xl font-extrabold text-red-600">BRENO</h1>
                    <span className="block text-3xl font-extrabold text-gray-700 dark:text-gray-300 ml-1">
                      TECH
                    </span>
                  </div>
        
                  <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
                    Cadastro de Colaboradores
                  </h2>
                </div>
        
                {/* Lado direito — Formulário */}
                <div className="bg-white/90 dark:bg-gray-900/60 backdrop-blur-md p-9 rounded-2xl shadow-lg w-[600px]">
                  <Forms />
                </div>
              </main>
            </div>
    )
}