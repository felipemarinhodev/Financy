import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";

export const useProfileController = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }
  return {user, handleLogout};
}