import { supabase } from './supabase';

interface Notification {
  id: string;
  recipientId: string;
  recipientType: 'client' | 'cleaner';
  type: 'booking' | 'reminder' | 'system';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  sentAt: string;
}

export async function sendNotification({ 
  recipientId,
  recipientType,
  type,
  title,
  message,
  data
}: Omit<Notification, 'id' | 'read' | 'sentAt'>) {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        recipient_id: recipientId,
        recipient_type: recipientType,
        type,
        title,
        message,
        data,
        read: false
      });

    if (error) throw error;

    // In a real app, also trigger push notification here
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message });
    }

    // Send SMS notification if phone number is available
    if (recipientType === 'client' && data?.phone) {
      await sendSMS({
        to: data.phone,
        message: message
      });
    }

    // Send email notification
    await sendEmail({
      to: recipientId,
      subject: title,
      message: message
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error };
  }
}

async function sendSMS({ to, message }: { to: string; message: string }) {
  // In a real app, integrate with SMS service provider
  console.log('Sending SMS:', { to, message });
}

async function sendEmail({ to, subject, message }: { to: string; subject: string; message: string }) {
  // In a real app, integrate with email service provider
  console.log('Sending Email:', { to, subject, message });
}

export async function getUnreadNotifications(userId: string): Promise<Notification[]> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('recipient_id', userId)
      .eq('read', false)
      .order('sent_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return { success: false, error };
  }
}