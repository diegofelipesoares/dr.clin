// Importações principais
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../lib/utils"

// Importação dos componentes de interface do ShadCN
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Label } from "../../components/ui/label"

// 1. Definindo o schema de validação com zod (validações e mensagens de erro)
const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

const registerSchema = z.object({
  name: z.string().min(1, "Nome e Sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
}) //valida se nome contém pelo menos dois nomes.
.refine((data) => data.name.trim().split(" ").length >= 2, {
    path: ["name"],
    message: "Digite seu nome completo",
  })

// 2️. Tipagem automática baseada no schema
type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

//Funções dentro da LoginPage
export default function LoginPage() {
  // 3.Configurando o useForm com o schema do zod
  
  // Hook para o formulário de Login
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm({ //Hook
    resolver: zodResolver(loginSchema),
    mode: "onChange", //Valida enquanto é digitado no input
  })

  // Hook para o formulário de registro
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange", //valida enquanto é digitado no input
  })

  // 4️. Função chamada no submit do form
  // função para login
  const onLogin = (data: LoginFormData) => {
    console.log("Login data:", data)
  }

  // função para registro
  const onRegister = (data: RegisterFormData) => {
    console.log("Registro data:", data)
  }

   return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      {/* Botões de escolhas entre os formulários */}
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Registrar</TabsTrigger>
        </TabsList>

        {/* Formulário de Login */}
        <TabsContent value="login">
          <Card className="w-full max-w-xl sm:min-w-[400px]">
            <CardHeader className="text-left">
              <CardTitle>Login</CardTitle>
              <CardDescription>Digite suas credenciais de acesso.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <form onSubmit={handleSubmitLogin(onLogin)} className="grid gap-4">
                <div className="text-left">
                  <Label htmlFor="email_login">Email</Label>
                  
                  <Input id="email_login" type="email"
                    {...registerLogin("email")}
                    //aplica cor vermelha nas bordas do input
                    className={cn(
                      "w-full", errorsLogin.email && "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {/* Aplica frase de erro abaixo do input */}
                  {errorsLogin.email && (
                    <p className="text-red-500 text-sm">{errorsLogin.email.message}</p>
                  )}

                </div>
                <div className="text-left">
                  <Label htmlFor="senha_login">Senha</Label>
                  <Input id="senha_login" type="password" {...registerLogin("password")} 
                  className={cn(
                    "w-full",
                     errorsLogin.password && "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                    )}/>
                  {errorsLogin.password && (
                    <p className="text-red-500 text-sm">{errorsLogin.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">Entrar</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formulário de Registro */}
        <TabsContent value="register">
          <Card className="w-full max-w-xl min-w-[400px]">
            <CardHeader>
              <CardTitle className="text-left">Registrar</CardTitle>
              <CardDescription className="text-left">
                Crie uma nova conta Dr.Clin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmitRegister(onRegister)} className="grid gap-4">
                <div className="text-left">
                  <Label htmlFor="nome_cadastro">Nome:</Label>
                  <Input id="nome_cadastro"{...registerRegister("name")} 
                  className={cn(
                    "w-full",
                     errorsRegister.name 
                     ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                      : ""
                    )}/>
                  {errorsRegister.name && (
                    <p className="text-red-500 text-sm">{errorsRegister.name.message}</p>
                  )}
                </div>
                <div className="text-left">
                  <Label htmlFor="email_cadastro">Email:</Label>
                  <Input id="email_cadastro" type="email" {...registerRegister("email")}
                  className={cn(
                      "w-full",
                      errorsRegister.email
                      ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                      : ""
                    )}
                  />
                  {errorsRegister.email && (
                    <p className="text-red-500 text-sm">{errorsRegister.email.message}</p>
                  )}
                </div>
                <div className="text-left">
                  <Label htmlFor="senha_cadastro">Senha:</Label>
                  <Input id="senha_cadastro" type="password" {...registerRegister("password")}
                  className={cn(
                    "w-full",
                     errorsRegister.password 
                     ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                      : ""
                    )} />
                  {errorsRegister.password && (
                    <p className="text-red-500 text-sm">{errorsRegister.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">Criar conta</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}