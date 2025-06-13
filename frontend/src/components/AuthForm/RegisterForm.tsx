// src/components/AuthForm/RegisterForm.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../../components/ui/button"
import { FormField } from "./FormField"

const registerSchema = z.object({
  name: z.string().min(1, "Nome e Sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.name.trim().split(" ").length >= 2, {
  path: ["name"],
  message: "Digite seu nome completo",
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  })

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registro:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <FormField
        id="nome_cadastro"
        label="Nome completo"
        register={register("name")}
        error={errors.name}
      />
      <FormField
        id="email_cadastro"
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email}
      />
      <FormField
        id="senha_cadastro"
        label="Senha"
        type="password"
        register={register("password")}
        error={errors.password}
      />
      <Button type="submit" className="w-full">Criar conta</Button>
    </form>
  )
}
