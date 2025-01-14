import { supabase } from './supabase';
import { sendNotification } from './notifications';
import { createAssignmentStatus } from './assignmentStatus';

interface AssignmentData {
  quoteId: string;
  cleanerId: string;
  scheduledDate: string;
  scheduledTime: string;
}

export async function assignCleaner({
  quoteId,
  cleanerId,
  scheduledDate,
  scheduledTime
}: AssignmentData) {
  try {
    // Start a Supabase transaction
    const { data: quote, error: quoteError } = await supabase.rpc('assign_cleaner', {
      p_quote_id: quoteId,
      p_cleaner_id: cleanerId,
      p_scheduled_date: `${scheduledDate}T${scheduledTime}`
    });

    if (quoteError) {
      console.error('Error assigning cleaner:', quoteError);
      throw quoteError;
    }

    if (!quote) {
      throw new Error('Failed to assign cleaner');
    }

    // Create assignment status
    await createAssignmentStatus(quoteId, cleanerId);

    // Send notifications
    await Promise.all([
      // Notify cleaner
      sendNotification({
        recipientId: cleanerId,
        recipientType: 'cleaner',
        type: 'booking',
        title: 'New Booking Request',
        message: `You have a new booking request for ${scheduledDate} at ${scheduledTime}. Please respond within 30 minutes.`,
        data: { quoteId }
      }),
      // Notify client
      sendNotification({
        recipientId: quote.client_email,
        recipientType: 'client',
        type: 'booking',
        title: 'Booking Update',
        message: `We're matching you with a cleaner for your booking on ${scheduledDate} at ${scheduledTime}`,
        data: { quoteId, cleanerId }
      })
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error assigning cleaner:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to assign cleaner' 
    };
  }
}