"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

//  Schema de validação
const formSchema = z.object({
  cpf: z.string().min(11, { message: "CPF inválido" }),
  nome: z.string().min(2, { message: "O nome precisa ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "E-mail inválido" }),
  telefone: z.string().min(10, { message: "Telefone inválido" }),
  dataNascimento: z.string().min(8, { message: "Data de nascimento inválida" }),
  estado: z.string().min(2, { message: "Estado inválido" }),
  cidade: z.string().min(2, { message: "Cidade inválida" }),
  cargo: z.string().min(2, { message: "Cargo inválido" }),
})

// Placeholders
const placeholders: Record<string, string> = {
  cpf: "000.000.000-00",
  nome: "Breno Rodrigues",
  email: "exemplo@email.com",
  telefone: "(11) 91234-5678",
  dataNascimento: "Selecione a data",
  estado: "São Paulo",
  cidade: "São Paulo",
  cargo: "Desenvolvedor",
}

export default function Forms() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      estado: "",
      cidade: "",
      cargo: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = localStorage.getItem("token")

      const response = await fetch("https://localhost:7026/api/Cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para a API")
      }

      const data = await response.json()
      console.log("✅ Sucesso:", data)
      alert("Usuário cadastrado com sucesso!")
      form.reset()
    } catch (error) {
      console.error("❌ Erro:", error)
      alert("Erro ao cadastrar usuário. Verifique o token ou sua sessão.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {Object.keys(formSchema.shape).map((fieldName) => {
          if (fieldName === "dataNascimento") {
            // Campo de data com calendário
            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof typeof formSchema.shape}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Input
                            placeholder={placeholders[fieldName]}
                            readOnly
                            value={field.value ? format(new Date(field.value), "dd/MM/yyyy") : ""}
                          />
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) field.onChange(date.toISOString())
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }

          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof typeof formSchema.shape}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {fieldName.replace(/([A-Z])/g, " $1")}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders[fieldName]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </Form>
  )
}
