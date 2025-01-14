import { supabase } from './supabase';

interface WhatsAppMessage {
  to: string;
  template: string;
  params: Record<string, string>;
}

export async function sendWhatsAppNotification({ to, template, params }: WhatsAppMessage) {
  try {
    // In a real app, integrate with WhatsApp Business API
    console.log('Sending WhatsApp notification:', {
      to,
      template,
      params
    });

    // Mock successful send
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Log notification in database
    const { error } = await supabase
      .from('notifications')
      .insert({
        recipient_id: to,
        recipient_type: 'cleaner',
        type: 'whatsapp',
        title: template,
        data: params,
        read: false
      });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    return { success: false, error };
  }
}