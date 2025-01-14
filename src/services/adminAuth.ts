import { supabase } from './supabase';
import type { AuthResponse } from './auth';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  lastSignIn?: string;
}

export async function loginAdmin(
  email: string, 
  password: string
): Promise<AuthResponse> {
  try {
    // Input validation
    if (!email?.trim() || !password?.trim()) {
      throw new Error('Email and password are required');
    }

    // Attempt authentication
    const { data: { user, session }, error: authError } = 
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

    if (authError) throw authError;
    if (!user) throw new Error('Authentication failed');

    // Verify admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, name, role, last_sign_in_at')
      .eq('id', user.id)
      .eq('role', 'admin')
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      throw new Error('Access denied: Admin privileges required');
    }

    const adminUser: AdminUser = {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: 'admin',
      lastSignIn: profile.last_sign_in_at
    };

    return { user: adminUser, error: null };
  } catch (error) {
    console.error('Admin login error:', error);
    return {
      user: null,
      error: error instanceof Error 
        ? error 
        : new Error('Authentication failed')
    };
  }
}

export async function registerAdmin(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  try {
    // Input validation
    if (!email?.trim() || !password?.trim() || !name?.trim()) {
      throw new Error('All fields are required');
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email.trim())
      .single();

    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    // Create new admin user
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: {
        data: {
          name: name.trim(),
          role: 'admin'
        }
      }
    });

    if (authError) throw authError;
    if (!user) throw new Error('Failed to create account');

    // Create admin profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: email.trim(),
        name: name.trim(),
        role: 'admin'
      });

    if (profileError) {
      throw new Error('Failed to create admin profile');
    }

    const adminUser: AdminUser = {
      id: user.id,
      email: user.email!,
      name: name.trim(),
      role: 'admin'
    };

    return { user: adminUser, error: null };
  } catch (error) {
    console.error('Admin registration error:', error);
    return {
      user: null,
      error: error instanceof Error 
        ? error 
        : new Error('Registration failed')
    };
  }
}