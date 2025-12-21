import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuthController } from "./useAuthController";
import { Checkbox } from "@/components/ui/checkbox";

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
          className="w-full mt-4"
          onClick={() => handleLogin(email, password)}
          disabled={isLoading}
          size="lg">
          Entrar
        </Button>
        <div className="flex flex-row justify-between w-full">
          <div className="flex items-center">
            <Checkbox className="mr-2" />
            <span className="text-gray-700 text-md">Lembrar-me</span>
          </div>
          <Link className="text-green-base text-md font-medium" to="/">
            Recuperar senha
          </Link>
        </div>
        <div className="flex flex-row items-center w-full">
          <hr className="border-gray-300 w-full" />
          <span className="text-md text-gray-600 mx-2">ou</span>
          <hr className="border-gray-300 w-full" />
        </div>
        <span className="text-md text-gray-600">Ainda não tem uma conta?</span>
        <Link to="/signup" className="w-full">
          <Button variant="outline" className="w-full" size="lg">
            <UserRoundPlus className="w-4 h-4 mr-2" /> Criar conta
          </Button>
        </Link>
      </div>
    </main>
  );
}
