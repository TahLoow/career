export type AlertVariant = 'success' | 'error' | 'warning';

export type NotificationRequest = {
  title?: string;
  message?: string;
  duration?: number;
  variant?: AlertVariant;
  onClose?: () => void;
};

export interface Notification extends NotificationRequest {
  id: string;
}
