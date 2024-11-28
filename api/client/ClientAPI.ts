import { useMutation, useQuery } from "@tanstack/react-query";
import { useClientUserEmail, useUserEmail } from "../Hooks/userHook";
import { api } from "../AuthAPI";

interface IProjId {
  projId: string;
}

// const userEmail = "richardddquirante98@gmail.com";

// export const getClientProjId = (userEmail: string) => {
export const getClientProjId = () => {
  const userEmail = useUserEmail();
  return useQuery<IProjId, Error>({
    queryKey: ["projId", userEmail],
    queryFn: async () => {
      const response = await api.get(`api/Client/GetClientProjectId`, {
        params: { userEmail },
      });
      return response.data;
    },
  });
};

export interface IClientProjectInfo {
  projId: string;
  projName: string;
  projDescript: string;
  discount: number;
  vatRate: number;
  clientId: string;
  clientFName: string;
  clientLName: string;
  clientContactNum: string;
  clientAddress: string;
  systemType: string;
  kWCapacity: number;
  sex: string;
  isMale: boolean;
  paymentProgress?: number;
  projectProgress?: number;
  status?: "OnGoing" | "Finished" | "OnWork" | "OnProcess";

  installers?: [{ name: string; position: string }];
  facilitatorName?: string;
  facilitatorEmail?: string;

  projectStarted?: string;
  projectEnded?: string;
  totalDays?: number;
}

// fetch client Info
export const getClientProjectInfo = () => {
  const { data: client, isLoading: projLoading } = getClientProjId();

  if (projLoading) return { isLoading: true }; // Return loading state while projId is being fetched or is missing

  return useQuery<IClientProjectInfo, Error>({
    queryKey: ["client-Info", client?.projId],
    queryFn: () =>
      api
        .get("api/Project/Get-Client-Info", {
          params: { projId: client?.projId }, // Ensure projId is accessed properly
        })
        .then((res) => res.data),
  });
};
