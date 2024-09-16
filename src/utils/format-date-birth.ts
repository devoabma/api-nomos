export function formtarDateBirth(data: string) {
  // Divide a string em dia, mês e ano
  const day = data.slice(0, 2)
  const month = data.slice(2, 4)
  const year = data.slice(4, 8)

  return `${day}/${month}/${year}`
}
