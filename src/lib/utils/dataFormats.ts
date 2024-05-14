export const priceFormat = (price: number): string => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price)

export const phoneFormat = (phone: string): string => phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 ($2) $3-$4-$5")

