const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_username'

export interface LoginResponse {
  token: string
  username: string
}

async function parseError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string }
    return data.message ?? 'Request failed'
  } catch {
    return 'Request failed'
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUsername(): string | null {
  return localStorage.getItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return Boolean(getToken())
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  const data = (await response.json()) as LoginResponse
  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(USER_KEY, data.username)
  return data
}

export async function fetchCurrentUser(): Promise<string> {
  const token = getToken()
  if (!token) {
    throw new Error('Not authenticated')
  }

  const response = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    clearSession()
    throw new Error(await parseError(response))
  }

  const data = (await response.json()) as { username: string }
  localStorage.setItem(USER_KEY, data.username)
  return data.username
}

export async function logout(): Promise<void> {
  const token = getToken()
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch {
      // Ignore network errors on logout; local session is cleared anyway.
    }
  }
  clearSession()
}
