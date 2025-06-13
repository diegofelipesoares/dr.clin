//Pagina de Login/Registro do sistema Dr.Clin

/* Importação dos componentes de abas (Tabs), 
usados para alternar entre as opções de "Login" e "Registrar" */
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';

// Importação dos componentes visuais de cartão (Card),
// utilizados para estruturar visualmente os formulários
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../components/ui/card';

// Importação do componente: formulário de login
import { LoginForm } from '../../components/AuthForm/LoginForm';

// Importação do componente: formulário de registro
import { RegisterForm } from '../../components/AuthForm/RegisterForm';

// COMPONENTE PRINCIPAL da página de login/registro
export default function LoginPage() {
  return (
    // CONTAINER PRINCIPAL com layout em coluna e espaçamento entre elementos
    <div className='flex w-full max-w-[400px] flex-col gap-6'>
      {/* Componente de ABAS com valor padrão 'login' */}
      <Tabs defaultValue='login' className='w-full'>
        {/* Lista de ABAS (login e registrar), dispostas em duas colunas */}
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='register'>Registrar</TabsTrigger>
        </TabsList>

        {/* CONTEÚDO da aba "Login" */}
        <TabsContent value='login'>
          <Card className='w-full max-w-xl sm:min-w-[400px]'>
            {/* Cabeçalho do cartão com título e descrição */}
            <CardHeader className='text-left'>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Digite suas credenciais de acesso.
              </CardDescription>
            </CardHeader>

            {/* Corpo do cartão com o formulário de login */}
            <CardContent className='grid gap-6'>
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* CONTEÚDO da aba "Registrar" */}
        <TabsContent value='register'>
          <Card className='w-full max-w-xl min-w-[400px]'>
            {/* Cabeçalho do cartão com título e descrição */}
            <CardHeader className='text-left'>
              <CardTitle>Registrar</CardTitle>
              <CardDescription>Crie uma nova conta Dr.Clin</CardDescription>
            </CardHeader>

            {/* Corpo do cartão com o formulário de registro */}
            <CardContent className='space-y-4'>
              <RegisterForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
