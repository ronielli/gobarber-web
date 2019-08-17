import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, Badge, Notification, NotificationsList } from './styles';
import api from '~/services/api';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const hasUnread = useMemo(
    () => !!notifications.find(item => item.read === false),
    [notifications]
  );
  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');
      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));
      setNotifications(data);
    }
    loadNotifications();
  }, []);

  async function handleNotification(id) {
    await api.put(`notifications/${id}`);
    setNotifications(
      notifications.map(item =>
        item._id === id ? { ...item, read: true } : item
      )
    );
  }
  return (
    <Container>
      <Badge onClick={() => setVisible(!visible)} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>
      <NotificationsList visible={visible}>
        {notifications.map(item => (
          <Notification key={item._id} unread={!item.read}>
            <p> {item.content}o </p>
            <time>{item.timeDistance}</time>
            {!item.read && (
              <button
                onClick={() => handleNotification(item._id)}
                type="button"
              >
                Marca como lida
              </button>
            )}
          </Notification>
        ))}
      </NotificationsList>
    </Container>
  );
}
