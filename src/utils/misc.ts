export function range(startAt: number, size: number) {
  return Array.from(Array(size).keys()).map(i => i + startAt)
}
