// src/pages/LoginPage.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { LoginForm } from "../../components/AuthForm/LoginForm"
import { RegisterForm } from "../../components/AuthForm/RegisterForm"

   export default function LoginPage() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Registrar</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="w-full max-w-xl sm:min-w-[400px]">
            <CardHeader className="text-left">
              <CardTitle>Login</CardTitle>
              <CardDescription>Digite suas credenciais de acesso.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card className="w-full max-w-xl min-w-[400px]">
            <CardHeader className="text-left">
              <CardTitle>Registrar</CardTitle>
              <CardDescription>Crie uma nova conta Dr.Clin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RegisterForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}