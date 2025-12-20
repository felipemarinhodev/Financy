import { Card } from "@/components/Card";
import { TextField } from "@/components/TextField";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useProfileController } from "./useProfileController";

export const Profile = () => {
  const { user, handleLogout } = useProfileController();

  return (
    <Card className="flex flex-col gap-6 justify-center items-center max-w-110 mx-auto w-full">
      <Avatar className="w-16 h-16">
        <AvatarFallback className="bg-gray-300 text-gray-800 font-medium text-2xl">
          {user?.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h2 className="text-gray-800 font-semibold text-xl">{user?.name}</h2>
        <span className="text-gray-500 text-base font-normal">
          {user?.email}
        </span>
      </div>
      <hr className="text-gray-200 w-full my-2" />
      <TextField label="Nome completo" value={user?.name} className="mb-4" />
      <TextField label="Email" value={user?.email} disabled />{" "}
      {/* TODO: tem que adicionar uma mensagem de error no componente TextField */}
      <div className="w-full mt-4 flex flex-col gap-4">
        <Button size="lg" className="w-full">
          Salvar alterações
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2 text-danger" />
          Sair da conta
        </Button>
      </div>
    </Card>
  );
};
