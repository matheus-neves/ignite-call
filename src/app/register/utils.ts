'use server'

import { fetchWrapper } from '@/utils/fetchWrapper'
import { RegisterFormData } from './page'

interface CreateUserResponse {
  id: string
  username: string
  name: string
  created_at: Date
}

export async function createUser(data: RegisterFormData) {
  try {
    const response = await fetchWrapper<CreateUserResponse>({
      url: 'users',
      options: {
        method: 'POST',
        body: JSON.stringify(data),
      },
    })

    return response
  } catch (err) {
    console.log(err)
  }
}
