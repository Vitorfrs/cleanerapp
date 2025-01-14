import React, { useEffect, useState } from 'react';
import { testSupabaseConnection } from '../services/testConnection';

export function TestConnection() {
  const [status, setStatus] = useState<{success: boolean; message?: string; error?: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      const result = await testSupabaseConnection();
      console.log('Connection test result:', result);
      setStatus(result);
      setLoading(false);
    }
    checkConnection();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Supabase Connection Test</h1>
        
        <div className="mb-4 text-sm">
          <p className="font-medium">Testing connection to:</p>
          <code className="block bg-gray-50 p-2 rounded mt-1 break-all">
            {import.meta.env.VITE_SUPABASE_URL}
          </code>
        </div>

        {status?.success ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg">
            {status.message}
            {status.session && (
              <p className="mt-2 text-sm">Session found: Active</p>
            )}
          </div>
        ) : (
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-700 font-medium">Connection Error:</p>
            <p className="text-red-600 mt-1">{status?.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}