export function ColorToHex(color:number) {
  const hexadecimal = color.toString(16)
  return hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal
}

export function ConvertRGBtoHex(red:number, green:number, blue:number) {
  return `#${ColorToHex(red)}${ColorToHex(green)}${ColorToHex(blue)}`
}
