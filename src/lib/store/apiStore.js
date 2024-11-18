import { writable } from 'svelte/store';
import { fetchData } from './fetchData.js';

export const apiData = writable(null);
export const apiError = writable(null);
export const isLoading = writable(false);

export async function get(url) {
  isLoading.set(true);
  apiError.set(null);
  try {
    const data = await fetchData(url);
    apiData.set(data);
  } catch (error) {
    apiError.set(error.message);
  } finally {
    isLoading.set(false);
  }
}