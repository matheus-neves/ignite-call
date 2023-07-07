import { RequestInit } from 'next/dist/server/web/spec-extension/request'

type RequestInfo = string | Request

interface FetchWrapperParams {
  url: RequestInfo | URL
  options?: RequestInit | undefined
}

export async function fetchWrapper<T = unknown>({
  url,
  options,
}: FetchWrapperParams) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!data.ok) {
    throw data.statusText
  }

  const result = await data.json()

  return result as T
}
