export function buildQueryParam(params: Record<string, any>) {
  const query = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      query.set(key, params[key])
    }
  })
  return query.toString()
}
