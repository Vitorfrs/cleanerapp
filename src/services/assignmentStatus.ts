import { supabase } from './supabase';
import { sendWhatsAppNotification } from './whatsapp';

export const RESPONSE_TIMEOUT = 30 * 60 * 1000; // 30 minutes

interface AssignmentStatus {
  quoteId: string;
  cleanerId: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  responseDeadline: string;
}

export async function createAssignmentStatus(
  quoteId: string,
  cleanerId: string
): Promise<AssignmentStatus> {
  const responseDeadline = new Date(Date.now() + RESPONSE_TIMEOUT).toISOString();

  const { data, error } = await supabase
    .from('assignment_status')
    .insert({
      quote_id: quoteId,
      cleaner_id: cleanerId,
      status: 'pending',
      response_deadline: responseDeadline
    })
    .select()
    .single();

  if (error) throw error;

  // Send WhatsApp notification
  await sendWhatsAppNotification({
    to: cleanerId,
    template: 'assignment_request',
    params: {
      quoteId,
      deadline: new Date(responseDeadline).toLocaleString()
    }
  });

  return data;
}

export async function updateAssignmentStatus(
  quoteId: string,
  status: AssignmentStatus['status']
) {
  const { data, error } = await supabase
    .from('assignment_status')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('quote_id', quoteId)
    .select()
    .single();

  if (error) throw error;

  // Send status update notification
  if (status === 'accepted' || status === 'declined') {
    await sendWhatsAppNotification({
      to: data.cleaner_id,
      template: `assignment_${status}`,
      params: { quoteId }
    });
  }

  return data;
}

export async function checkExpiredAssignments() {
  const { data: expired, error } = await supabase
    .from('assignment_status')
    .select('*')
    .eq('status', 'pending')
    .lt('response_deadline', new Date().toISOString());

  if (error) throw error;

  // Update expired assignments
  for (const assignment of expired) {
    await updateAssignmentStatus(assignment.quote_id, 'expired');
  }

  return expired;
}