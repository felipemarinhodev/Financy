import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useProfileController = () => {
  const { user, logout, updateProfile } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUpdateProfile = async (name: string) => {
    const success = await updateProfile(name);
    if (success) {
      toast.success("Perfil atualizado com sucesso!");
    } else {
      toast.error("Erro ao atualizar o perfil. Tente novamente.");
    }
  };
  return { user, handleLogout, handleUpdateProfile };
};