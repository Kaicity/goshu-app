import type { NotificationDto } from "@/models/dto/notificationDto";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function useNotification() {
  const [notifications, setNotifications] = useState<NotificationDto[]>([
    {
      id: "1",
      message: "đwe",
      createdAt: new Date(),
      read: false,
    },
  ]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("user:added", (user: { email: string }) => {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          message: `Tài khoản ${user.email} đã được thêm`,
          createdAt: new Date(),
          read: false,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    notifications,
    setNotifications,
    unreadCount: notifications.length,
  };
}
