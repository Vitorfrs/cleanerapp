import { supabase } from './supabase';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin'
  } | null;
  error: Error | null;
}

async function verifyProfile(userId: string): Promise<boolean> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single();
    
  return !error && !!profile;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!user) throw new Error('Authentication failed');
    
    // Verify profile exists
    const hasProfile = await verifyProfile(user.id);
    if (!hasProfile) {
      throw new Error('User profile not found');
    }

    return {
      user: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata.name || '',
        role: user.user_metadata.role || 'user',
        session: session
      },
      error: null
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      user: null,
      error: error as Error
    };
  }
}

export async function registerUser(
  email: string, 
  password: string, 
  name: string
): Promise<AuthResponse> {
  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'user'
        },
        emailRedirectTo: `${window.location.origin}/login`
      }
    });

    if (error) throw error;
        
    // Verify profile creation
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (!profile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: email.trim(),
            name,
            role: 'user'
          });
          
        if (profileError) {
          throw new Error('Profile creation failed');
        }
      }
      
      // Auto-login after registration
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) throw signInError;
    }

    return {
      user: user ? {
        id: user.id,
        email: user.email!,
        name: user.user_metadata.name,
        role: 'user'
      } : null,
      error: null
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      user: null,
      error: error as Error
    };
  }
}

export async function resetPassword(email: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) throw error;

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function updatePassword(newPassword: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}