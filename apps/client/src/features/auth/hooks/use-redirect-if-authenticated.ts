import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/use-auth.ts";
import { getMyInfo } from "@/features/user/services/user-service";

export function useRedirectIfAuthenticated(email?: string) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const validAuth = await isAuthenticated();
      if (validAuth) {
        if (email) {
          const currentUser = await getMyInfo();
          if (currentUser.user.email !== email) {
            localStorage.removeItem("authToken");
            return;
          }
        }
        navigate("/home");
      }
    };

    checkAuth();
  }, [isAuthenticated]);
}
