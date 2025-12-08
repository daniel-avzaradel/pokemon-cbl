export const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

export const delay = async(ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const pokedexEntry = (id: number) => {
        return id < 10 ? id.toString().padStart(3, "0")
            : (id >= 10 && id < 100) ? id.toString().padStart(3, "0")
                : id
}

export function reduceHexOpacity(hex8: string, factor: number): string {
  // Normalize input like "#RRGGBBAA"
  const hex = hex8.replace("#", "");

  if (hex.length !== 8) {
    throw new Error("Hex must be 8 digits (#RRGGBBAA)");
  }

  const rgb = hex.slice(0, 6);
  const alphaHex = hex.slice(6, 8);

  // Convert AA -> decimal (0–255)
  const alphaDec = parseInt(alphaHex, 16);

  // Apply factor
  const newAlpha = Math.round(alphaDec * factor);

  // Clamp 0–255
  const clamped = Math.max(0, Math.min(255, newAlpha));

  // Convert back to 2-digit hex
  const newAlphaHex = clamped.toString(16).padStart(2, "0");

  return `#${rgb}${newAlphaHex}`;
}