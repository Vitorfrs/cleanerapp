import { supabase } from './supabase';
import type { ServiceProvider } from '../types';

interface MatchingCriteria {
  serviceDate: string;
  startTime: string;
  endTime: string;
  zipCode: string;
  serviceId: string;
}

export async function findAvailableCleaners({
  serviceDate,
  startTime,
  endTime,
  zipCode,
  serviceId
}: MatchingCriteria): Promise<ServiceProvider[]> {
  try {
    const { data, error } = await supabase.rpc('find_available_cleaners', {
      p_service_date: serviceDate,
      p_start_time: startTime,
      p_end_time: endTime,
      p_zip_code: zipCode,
      p_service_id: serviceId
    });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error finding cleaners:', error);
    return [];
  }
}

export async function matchBestCleaner(criteria: MatchingCriteria): Promise<ServiceProvider | null> {
  const availableCleaners = await findAvailableCleaners(criteria);
  
  if (!availableCleaners.length) return null;

  // Sort by rating and distance
  return availableCleaners.sort((a, b) => {
    // Prioritize rating (70% weight)
    const ratingDiff = (b.rating - a.rating) * 0.7;
    // Consider distance (30% weight)
    const distanceDiff = ((a as any).distance - (b as any).distance) * 0.3;
    
    return ratingDiff + distanceDiff;
  })[0];
}