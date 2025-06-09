//Página de login (Componente principal)
//import { useLoginMutation } from '@/services/authApi';
//import { setCredentials } from '@/store/slices/authSlice';
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function LoginPage() {
  //const [login, { isLoading }] = useLoginMutation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password }).unwrap();
//       dispatch(setCredentials(res));
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Erro no login:', err);
//     }
//   };

  return (
    <>
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className="flex w-full max-w-sm flex-col gap-6">
             <Tabs defaultValue="login"> {/* Definindo o a tab default */}
                <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Criar conta</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                <Card>
                    <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Faça login para continuar
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                    
                    </CardContent>
                    <CardFooter>
                    <Button>Entrar</Button>
                    </CardFooter>
                </Card>
                </TabsContent>
                <TabsContent value="register">
                <Card>
                    <CardHeader>
                    <CardTitle>Criar conta</CardTitle>
                    <CardDescription>
                        Crie uma conta para continuar.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                    
                    </CardContent>
                    <CardFooter>
                    <Button>Criar conta</Button>
                    </CardFooter>
                </Card>
                </TabsContent>
            </Tabs>
            </div>

        </div>
        {/* <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Entrar no Dr.Clin</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" placeholder="E-mail" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" placeholder="Senha" />
        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isLoading ? 'Entrando...' : 'Entrar'}
        </button> 
        </form>*/}
    </>
  );
}
