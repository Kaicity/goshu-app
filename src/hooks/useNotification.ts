import { STATUS_LABELS, type Status } from '@/enums/statusEnum';
import type { NotificationDto } from '@/models/dto/notificationDto';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function useNotification() {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: false,
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // User account được tạo
    socket.on('user:added', (user: { email: string }) => {
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

    // Status thay đổi
    socket.on('user:update-status', (user: { email: string; status: string }) => {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          message: `Tài khoản ${user.email} được phê duyệt với trạng thái: ${STATUS_LABELS[user.status as Status]}`,
          createdAt: new Date(),
          read: false,
        },
      ]);
    });

    // Đơn nghỉ phép

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
