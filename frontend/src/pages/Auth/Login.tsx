import { Label } from "@/components/ui/label";
import { Input } from "../../components/ui/input";
import { TextField } from "@/components/TextField";
import { useAuthController } from "./useAuthController";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Login() {
  const { handleLogin, isLoading } = useAuthController();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex flex-col gap-4 bg-gray-100 h-screen justify-center p-4">
      <img src="/Logo.svg" alt="Financy" className="w-32 mx-auto" />
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl p-8 max-w-110 mx-auto w-full">
        <h2 className="text-lg">Fazer login</h2>
        <p>Entre na sua conta para continuar</p>
        <div className="w-full">
          <Label htmlFor="email" className="text-label">
            E-mail
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="seu@mail.com"
            className="w-full py-3.5 text-input-placeholder"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <TextField
          label="Nome"
          icon={<></>}
          type="text"
          placeholder="Digite seu nome"
        />
        <Button
          className="w-full mt-4 "
          onClick={() => handleLogin(email, password)}
          disabled={isLoading}>
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
