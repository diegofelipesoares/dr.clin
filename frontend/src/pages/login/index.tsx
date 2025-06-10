import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Label } from "../../components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <Tabs defaultValue="login" className="w-full max-w-xl"> {/* AQUI aumenta a largura */}
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>

        {/* LOGIN */}
        <TabsContent value="login">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Acesse sua conta Dr.Clin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" className="w-full" placeholder="seu@email.com" />
          </div>
          <div>
            <Label>Senha</Label>
            <Input type="password" className="w-full" placeholder="********" />
          </div>
          <Button className="w-full">Entrar</Button>
        </CardContent>
      </Card>
    </TabsContent>

        {/* REGISTRO */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Registrar</CardTitle>
              <CardDescription>
                Crie uma nova conta Dr.Clin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nome</Label>
                <Input placeholder="Seu nome completo" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="seu@email.com" />
              </div>
              <div>
                <Label>Senha</Label>
                <Input type="password" placeholder="********" />
              </div>
              <Button className="w-full">Criar conta</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}