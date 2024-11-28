import { useQuery } from "@tanstack/react-query";
import { getClientProjId } from "./client/ClientAPI";
import { api } from "./AuthAPI";
import { useClientUserEmail } from "./Hooks/userHook";

interface IProjectProgress {
  progress: number;
}

export const getProjectProgress = () => {
  const { data: client, isLoading } = getClientProjId();
  if (isLoading) return { isLoading: true };
  return useQuery<IProjectProgress, Error>({
    queryKey: ["ProjectProgress", client?.projId],
    queryFn: async () => {
      const response = await api.get("api/Gantt/ProjectProgress", {
        params: {
          projId: client?.projId,
        },
      });
      return response.data;
    },
  });
};

export interface IProjectInfo {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  projectId: string;
  projectDescription: string;
  projectDateCreation: string;
  projectDateValidity: string;
}

// Fetch all project info
export const getProjectInfo = () => {
  const { data: client, isLoading } = getClientProjId();
  if (isLoading) return { isLoading: true };
  const customerEmail = useClientUserEmail();
  return useQuery<IProjectInfo, Error>({
    queryKey: ["project-info", client?.projId, customerEmail],
    queryFn: () =>
      api
        .get("api/Project/ProjectQuotationInfo", {
          params: { projId: client?.projId, customerEmail },
        })
        .then((res) => res.data),
  });
};

export interface ProjectQuotationTotalExpense {
  quoteId: string;
  subTotal: string;
  discount: string;
  discountRate: string;
  subTotalAfterDiscount: string;
  vat: string;
  vatRate: string;
  total: string;
  estimationDate: number;
  totalMaterialCost: IProjectSupply;
  totalLaborCost: IProjectSupply;
}

export interface IProjectSupply {
  description: string;
  lineTotal: string;
}

// fetch all project Expense
export const getProjectExpense = () => {
  const customerEmail = useClientUserEmail();
  const { data: client, isLoading } = getClientProjId();
  if (isLoading) return { isLoading: true };

  return useQuery<ProjectQuotationTotalExpense, Error>({
    queryKey: ["project-Expense", client?.projId, customerEmail], // Include parameters for better cache control
    queryFn: () =>
      api
        .get("api/Project/ProjectQuotationExpense", {
          params: { projId: client?.projId, customerEmail },
        })
        .then((res) => res.data),
  });
};

export interface IProjectSupply {
  description: string;
  lineTotal: string;
}

// fetch all project Supply
export const getProjectSupply = () => {
  const { data: client, isLoading } = getClientProjId();
  if (isLoading) return { isLoading: true };
  return useQuery<IProjectSupply[], Error>({
    queryKey: ["project-supply-quotation", client?.projId],
    queryFn: async () => {
      const response = await api.get("api/Project/ProjectQuotationSupply", {
        params: { projId: client?.projId },
      });
      return response.data;
    },
  });
};

// Check project status
export const getIsOnGoingProject = () => {
  const { data: client, isLoading } = getClientProjId();
  if (isLoading) return { isLoading: true };

  return useQuery<boolean, Error>({
    queryKey: ["IsProjectOnGoing", client?.projId],
    queryFn: async () => {
      const response = await api.get("api/Project/IsProjectOnGoing", {
        params: {
          projId: client?.projId,
        },
      });
      return response.data;
    },
  });
};
