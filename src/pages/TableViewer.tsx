import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

interface TableInfo {
  table: string;
  columns: {
    column_name: string;
    data_type: string;
    is_nullable: string;
  }[];
}

export function TableViewer() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTables() {
      try {
        const { data, error } = await supabase
          .from('information_schema.columns')
          .select('table_name, column_name, data_type, is_nullable')
          .eq('table_schema', 'public');

        if (error) throw error;

        // Group by table
        const tableMap = data.reduce((acc: Record<string, TableInfo>, curr) => {
          if (!acc[curr.table_name]) {
            acc[curr.table_name] = {
              table: curr.table_name,
              columns: []
            };
          }
          acc[curr.table_name].columns.push({
            column_name: curr.column_name,
            data_type: curr.data_type,
            is_nullable: curr.is_nullable
          });
          return acc;
        }, {});

        setTables(Object.values(tableMap));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tables');
      } finally {
        setLoading(false);
      }
    }

    fetchTables();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Database Tables</h1>
      
      <div className="space-y-6">
        {tables.map((table) => (
          <div key={table.table} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">{table.table}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nullable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {table.columns.map((column) => (
                    <tr key={column.column_name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{column.column_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{column.data_type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{column.is_nullable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}