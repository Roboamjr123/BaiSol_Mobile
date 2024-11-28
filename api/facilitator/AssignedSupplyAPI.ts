import { useQuery } from "@tanstack/react-query";
import { useUserEmail } from "../Hooks/userHook";
import { api } from "../AuthAPI";

// Define the MaterialsDetails interface
interface IMaterialsDetails {
  suppId: number; // Required integer field
  mtlId: number; // Required integer field
  mtlDescription: string; // Required string field
  mtlQuantity?: number | null; // Optional integer field (can be null)
  mtlUnit: string; // Required string field
}

// Define the AssignedMaterialsDTO interface
export interface IAssignedMaterials {
  mtlCategory: string; // Required string field
  details?: IMaterialsDetails[]; // Optional list of IMaterialsDetails
}

export const getAssignedMaterialsByFacilitator = () => {
  const userEmail = useUserEmail();
  return useQuery<IAssignedMaterials[], Error>({
    queryKey: ["assigned-materials", userEmail],
    queryFn: async () => {
      const response = await api.get(
        "api/Facilitator/AssignedMaterialsSupply",
        {
          params: {
            userEmail: userEmail,
          },
        }
      );
      return response.data;
    },
  });
};

// Define the EquipmentDetails interface
interface IEquipmentDetails {
  suppId: number; // Required integer field
  eqptCode: string; // Required string field
  eqptDescript: string; // Required string field
  quantity: number; // Required integer field
  eqptUnit: string; // Required string field
}

// Define the AssignedEquipmentDTO interface
export interface IAssignedEquipment {
  eqptCategory: string; // Required string field
  details?: IEquipmentDetails[]; // Optional list of IEquipmentDetails
}

export const getAssignedEquipmentByFacilitator = () => {
  const userEmail = useUserEmail();
  return useQuery<IAssignedEquipment[], Error>({
    queryKey: ["assigned-equipment", userEmail],
    queryFn: async () => {
      const response = await api.get(
        "api/Facilitator/AssignedEquipmentSupply",
        {
          params: {
            userEmail: userEmail,
          },
        }
      );
      return response.data;
    },
  });
};
