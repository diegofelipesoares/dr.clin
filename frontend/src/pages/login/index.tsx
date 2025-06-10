import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Label } from "../../components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="login" className="w-full"> 
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>

        {/* LOGIN */}
        <TabsContent value="login">
      <Card className="w-full max-w-xl min-w-[400px]">
        <CardHeader className="text-left">
          <CardTitle >Login</CardTitle>
          <CardDescription>Digite suas credenciais de acesso.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="text-left" >
            <Label className="text-left">Email</Label>
            <Input type="email" className="w-full" placeholder="seu@email.com" />
          </div>
          <div className="grid gap-1">
            <Label className="text-left block">Senha</Label>
            <Input type="password" className="w-full" placeholder="********" />
          </div>
          <Button className="w-full">Entrar</Button>
        </CardContent>
      </Card>
    </TabsContent>

        {/* REGISTRO */}
        <TabsContent value="register">
          <Card className="w-full max-w-xl min-w-[400px]">
            <CardHeader>
              <CardTitle className="text-left">Registrar</CardTitle>
              <CardDescription className="text-left">
                Crie uma nova conta Dr.Clin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-left">
                <Label>Nome:</Label>
                <Input placeholder="Seu nome completo" />
              </div>
              <div className="text-left">
                <Label>Email:</Label>
                <Input type="email" placeholder="seu@email.com" />
              </div>
              <div className="text-left">
                <Label>Senha:</Label>
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