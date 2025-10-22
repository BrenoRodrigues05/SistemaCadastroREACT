"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("teste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Usuário ou senha inválidos");

      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso!");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-red-50 border border-red-200 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-red-600">BRENO</h1>
                    <span className="block text-3xl font-extrabold text-gray-700 dark:text-gray-300 ml-1">
                      TECH
                    </span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="text-left">
            <label className="block text-sm text-red-700 font-semibold mb-1">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Digite seu usuário"
              className="w-full p-3 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm text-red-700 font-semibold mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
              className="w-full p-3 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-red-700 text-sm">
          © {new Date().getFullYear()} Sistema de Cadastro — Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
