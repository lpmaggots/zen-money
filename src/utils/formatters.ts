const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR')

const dateDisplayFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export const formatCurrency = (value: number): string => {
  return currencyFormatter.format(value)
}

export const formatDate = (dateStr: string): string => {
  const parts = dateStr.split('-')
  const year = parseInt(parts[0] ?? '2024', 10)
  const month = parseInt(parts[1] ?? '1', 10)
  const day = parseInt(parts[2] ?? '1', 10)
  return dateFormatter.format(new Date(year, month - 1, day))
}

export const formatDateDisplay = (year: number, month: number, day: number): string => {
  return dateDisplayFormatter.format(new Date(year, month - 1, day))
}
