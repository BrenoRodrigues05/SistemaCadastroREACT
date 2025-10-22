import Link from "next/link";

export default function Header() {
  return (
    <header>
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-3">
        {/* Logo / nome */}
        <h1 className="font-extrabold text-red-600 text-2xl">
            BRENO
            <span className="text-gray-700 dark:text-gray-300"> TECH</span>
        </h1>

        {/* Navegação */}
        <ul className="flex items-center gap-6 text-xl font-semibold">
        <li>
            <Link
                href="/"
                className="text-foreground hover:text-red-600 transition"
            >
                Funcionários
            </Link>
            </li>
            <li>
            <button
                onClick={() => {
                localStorage.removeItem("token"); // remove o token
                window.location.href = "/"; // redireciona para home
                }}
                    className="text-foreground hover:text-red-600 transition"
                >
                Logout
            </button>
            </li>
        </ul>
    </nav>
    </header>
);
}
