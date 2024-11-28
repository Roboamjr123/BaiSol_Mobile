import { selectUser } from "@/redux/authSlice";
import { useSelector } from "react-redux";
import { getClientProjId } from "../client/ClientAPI";
export const useUserEmail = () => {
  const user = useSelector(selectUser);
  return user?.email;
};
export const useClientUserEmail = () => {
  const user = useSelector(selectUser);
  return user?.userRole === "Client" ? user?.email : null;
};

export const useUserRole = () => {
  const user = useSelector(selectUser);
  return user?.userRole || "Developer";
};
