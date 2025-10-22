export default function Footer(){
    return(
            <footer className="w-full bg-gray-100 border-t border-gray-200 dark:bg-gray-900 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-gray-600 text-sm">
        <p suppressHydrationWarning className="mb-3 sm:mb-0">
  © {new Date().getFullYear()} Sistema de Cadastro. Todos os direitos reservados.
         </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/BrenoRodrigues05"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
    
}