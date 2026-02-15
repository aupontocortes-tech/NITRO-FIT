/**
 * Formata uma string de dígitos como CPF: 000.000.000-00
 */
export function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

/**
 * Valida CPF (dígitos verificadores e sequências inválidas).
 */
export function validateCpf(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "")
  if (digits.length !== 11) return false

  // Rejeita sequências iguais (111.111.111-11, etc.)
  if (/^(\d)\1{10}$/.test(digits)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i], 10) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  if (remainder !== parseInt(digits[9], 10)) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i], 10) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  if (remainder !== parseInt(digits[10], 10)) return false

  return true
}

/**
 * Retorna apenas os 11 dígitos do CPF (sem formatação).
 */
export function getCpfDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11)
}
