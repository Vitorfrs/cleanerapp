import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { getAdminSession } from '../services/adminAuth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthResponse['user']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  const setLoading = (value: boolean) => setIsLoading(value);

  async function checkAdminStatus(userId: string) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
      
    return profile?.role === 'admin';
  }

  useEffect(() => {
    async function initAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setLoading(true);

      if (session?.user) {
        const isAdmin = await checkAdminStatus(session.user.id);
        if (!isAdmin) {
          setUser(null);
          setIsAuthenticated(false);
          await supabase.auth.signOut();
          return;
        }
          
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || '',
          role: 'admin'
        });
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      setInitialized(true);
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!profile || profile.role !== 'admin') {
          setUser(null);
          setIsAuthenticated(false);
          await supabase.auth.signOut();
          return;
        }
          
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || '',
          role: 'admin'
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (initialized && !isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [initialized, isAuthenticated, isLoading, navigate]);

  return { isAuthenticated, isLoading, user };
}