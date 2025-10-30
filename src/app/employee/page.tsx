"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Header from "../components/Header";

interface Employee {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  estado: string;
  cidade: string;
  cargo: string;
}

export default function ListEmployee() {
  const [funcionarios, setFuncionarios] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const carregarFuncionarios = async () => {
      try {
        const result = await fetch("https://localhost:7026/api/Cadastro", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!result.ok) {
          throw new Error("Erro ao buscar funcionários no sistema");
        }

        const data = await result.json();
        const lista = Array.isArray(data) ? data : [data];
        setFuncionarios(lista);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    carregarFuncionarios();
  }, [router]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Carregando funcionários...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 font-medium mt-6">
        Erro: {error}
      </p>
    );

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
          Lista de Funcionários
        </h1>

        {funcionarios.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhum funcionário encontrado.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {funcionarios.map((f) => (
              <Card
                key={f.cpf}
                className="shadow-md hover:shadow-lg transition duration-200 border border-border"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-primary">
                    {f.nome}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{f.cargo}</p>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p>
                    <strong>CPF:</strong> {f.cpf}
                  </p>
                  <p>
                    <strong>E-mail:</strong> {f.email}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {f.telefone}
                  </p>
                  <p>
                    <strong>Nascimento:</strong>{" "}
                    {new Date(f.nascimento).toLocaleDateString("pt-BR")}
                  </p>
                  <p>
                    <strong>Cidade:</strong> {f.cidade} - {f.estado}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
            <Button
            type="button"
            variant="destructive"
            className="w-full cursor-pointer"
            onClick={() => router.push("/manage")}>
                Voltar
            </Button>
        </div>
      </div>
    </div>
  );
}
