export function formatCPF(cpf: string) {
  // Divide a string nas partes corretas
  const part1 = cpf.slice(0, 3)
  const part2 = cpf.slice(3, 6)
  const part3 = cpf.slice(6, 9)
  const part4 = cpf.slice(9, 11)

  // Retorna o CPF formatado
  return `${part1}.${part2}.${part3}-${part4}`
}
