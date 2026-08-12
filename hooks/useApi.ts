'use client';

import {
  useMutation,
  useQuery,
  type MutationFunction,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const rawText = await response.text();
  let body: unknown = rawText;

  try {
    body = rawText ? JSON.parse(rawText) : null;
  } catch {
    // Keep non-JSON responses available in the error message.
  }

  if (!response.ok) {
    const detail = typeof body === 'string' ? body : JSON.stringify(body);
    throw new Error(`API Error: ${response.status} - ${detail}`);
  }

  return body as T;
}

export function useApiQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError>,
) {
  return useQuery<TData, TError>({
    ...options,
    staleTime: options.staleTime ?? 5 * 60 * 1000,
    gcTime: options.gcTime ?? 10 * 60 * 1000,
  });
}

export function useApiMutation<TData, TVariables, TError = Error>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>,
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
}
