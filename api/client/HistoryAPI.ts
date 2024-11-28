import { useQuery } from "@tanstack/react-query";
import { useUserEmail } from "../Hooks/userHook";
import { api } from "../AuthAPI";
import { IClientProjectInfo } from "./ClientAPI";

export const getClientProjectHistory = () => {
  const userEmail = useUserEmail();
  return useQuery<IClientProjectInfo[], Error>({
    queryKey: ["project-history", userEmail],
    queryFn: async () => {
      const response = await api.get(`api/Client/GetClientProjectHistory`, {
        params: { userEmail },
      });
      return response.data;
    },
  });
};
