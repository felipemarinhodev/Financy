import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuthController } from "./useAuthController";

export function Login() {
  const { handleLogin, isLoading } = useAuthController();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex flex-col gap-4 bg-gray-100 h-screen justify-center p-4">
      <img src="/Logo.svg" alt="Financy" className="w-32 mx-auto" />
      <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-2xl p-8 max-w-110 mx-auto w-full">
        <h2 className="text-xl font-bold">Fazer login</h2>
        <p>Entre na sua conta para continuar</p>
        <TextField
          label="E-mail"
          icon="mailbox"
          type="email"
          placeholder="mail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <TextField
          label="Senha"
          icon="lock"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <Button
          className="w-full mt-4 "
          onClick={() => handleLogin(email, password)}
          disabled={isLoading}
          size="lg">
          Entrar
        </Button>
        <div className="flex justify-between">
          <div>Lembrar-me</div>
          <a className="text-green-base">Recuperar senha</a>
        </div>
      </div>
    </main>
  );
}
