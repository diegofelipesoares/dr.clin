export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-screen min-h-screen flex items-center justify-center bg-grey-50 p-4'>
      {children}
    </main>
  );
}
