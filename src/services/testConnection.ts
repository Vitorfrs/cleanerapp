import { supabase } from './supabase';

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Connection error:', error.message);
      return { success: false, error: error.message };
    }

    // Test a simple database query
    const { error: dbError } = await supabase
      .from('test_users')
      .select('count')
      .limit(1)
      .single();

    if (dbError) {
      console.error('Database error:', dbError.message);
      return { success: false, error: dbError.message };
    }
    
    return { 
      success: true, 
      message: 'Successfully connected to Supabase',
      session: data.session 
    };
  } catch (err) {
    console.error('Test failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}