import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuthController } from "./useAuthController";

export function Signup() {
  const { handleCreateAccount, isLoading } = useAuthController();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex flex-col gap-4 bg-gray-100 h-screen justify-center p-4">
      <img src="/Logo.svg" alt="Financy" className="w-32 mx-auto" />
      <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-2xl p-8 max-w-110 mx-auto w-full">
        <h2 className="text-xl font-bold">Criar conta</h2>
        <p>Comece a controlar suas finanças ainda hoje</p>
        <TextField
          label="Nome completo"
          icon="user"
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
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
          className="w-full mt-4"
          onClick={() => handleCreateAccount(name, email, password)}
          disabled={isLoading}
          size="lg">
          Cadastrar
        </Button>
        <div className="flex flex-row items-center w-full">
          <hr className="border-gray-300 w-full" />
          <span className="text-md text-gray-600 mx-2">ou</span>
          <hr className="border-gray-300 w-full" />
        </div>
        <span className="text-md text-gray-600">Já tem uma conta?</span>
        <Link to="/" className="w-full">
          <Button variant="outline" className="w-full" size="lg">
            <LogIn className="w-4 h-4 mr-2" /> Fazer login
          </Button>
        </Link>
      </div>
    </main>
  );
}
