export function formatCurrency(value: number): string {
    console.log(typeof value)
    return new Intl.NumberFormat("es-Cl", {minimumFractionDigits: 0, maximumFractionDigits: 0}).format(value);
}