export function getToken() {
  const ss = sessionStorage.getItem('token')
  if (ss) {
    return ss
  }

  return localStorage.getItem('token') ?? ''
}

export function setToken(token: string, type: 'FOREVER' | 'SESSION') {
  if (type === 'SESSION') {
    sessionStorage.setItem('token', token)
  }
  else if (type === 'FOREVER') {
    localStorage.setItem('token', token)
  }
}

export function clearToken() {
  sessionStorage.removeItem('token')
  localStorage.removeItem('token')
}
