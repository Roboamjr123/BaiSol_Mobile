import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserEmail } from "../Hooks/userHook";
import { api } from "../AuthAPI";

export interface INotificationMessage {
  notifId: number;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  isRead: boolean;
  facilitatorName: string;
  facilitatorEmail: string;
}

export interface INotificationMessageAndCount {
  notifs: INotificationMessage[];
  notifCount: number;
}

export const getNotificationMessages = () => {
  const userEmail = useUserEmail();
  return useQuery<INotificationMessageAndCount, Error>({
    queryKey: ["Notification-Messages", userEmail],
    queryFn: async () => {
      const response = await api.get(`api/Client/NotificationMessages`, {
        params: { userEmail },
      });
      return response.data;
    },
  });
};

export const useReadNotif = () => {
  const clientEmail = useUserEmail();

  return useMutation({
    mutationFn: async ({ notifId }: { notifId: number }) => {
      const response = await api.put("api/Client/ReadNotif", null, {
        params: { notifId, clientEmail },
      });
      return response.data;
    },
  });
};
