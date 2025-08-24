// Color utilities for hex color detection and conversion
// Used by output handlers to render color tokens in their actual colors

/**
 * Detects if a string is a valid hex color code
 */
export function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(value);
}

/**
 * Converts a hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!isHexColor(hex)) return null;
  
  let hexValue = hex.slice(1);
  
  // Handle 3-digit hex codes by expanding them
  if (hexValue.length === 3) {
    hexValue = hexValue.split('').map(c => c + c).join('');
  }
  
  const r = parseInt(hexValue.slice(0, 2), 16);
  const g = parseInt(hexValue.slice(2, 4), 16);
  const b = parseInt(hexValue.slice(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Calculates the luminance of an RGB color (0-1 scale)
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determines if a color is light (should use dark text) or dark (should use light text)
 */
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.5;
}

/**
 * ANSI color codes mapping
 */
const ANSI_COLORS = {
  black: { r: 0, g: 0, b: 0, code: '\u001b[30m' },
  red: { r: 128, g: 0, b: 0, code: '\u001b[31m' },
  green: { r: 0, g: 128, b: 0, code: '\u001b[32m' },
  yellow: { r: 128, g: 128, b: 0, code: '\u001b[33m' },
  blue: { r: 0, g: 0, b: 128, code: '\u001b[34m' },
  magenta: { r: 128, g: 0, b: 128, code: '\u001b[35m' },
  cyan: { r: 0, g: 128, b: 128, code: '\u001b[36m' },
  white: { r: 192, g: 192, b: 192, code: '\u001b[37m' },
  // Bright versions
  brightBlack: { r: 128, g: 128, b: 128, code: '\u001b[90m' },
  brightRed: { r: 255, g: 0, b: 0, code: '\u001b[91m' },
  brightGreen: { r: 0, g: 255, b: 0, code: '\u001b[92m' },
  brightYellow: { r: 255, g: 255, b: 0, code: '\u001b[93m' },
  brightBlue: { r: 0, g: 0, b: 255, code: '\u001b[94m' },
  brightMagenta: { r: 255, g: 0, b: 255, code: '\u001b[95m' },
  brightCyan: { r: 0, g: 255, b: 255, code: '\u001b[96m' },
  brightWhite: { r: 255, g: 255, b: 255, code: '\u001b[97m' }
};

/**
 * Calculates the Euclidean distance between two RGB colors
 */
function colorDistance(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

/**
 * Finds the closest ANSI color to a given hex color
 */
export function hexToClosestAnsi(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '\u001b[37m'; // Default to white
  
  let closestColor = ANSI_COLORS.white;
  let minDistance = Infinity;
  
  for (const ansiColor of Object.values(ANSI_COLORS)) {
    const distance = colorDistance(rgb, ansiColor);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = ansiColor;
    }
  }
  
  return closestColor.code;
}

/**
 * Creates HTML styling for a color token with background color and appropriate text color
 */
export function createColorTokenHtml(value: string, baseStyles: string[] = []): string {
  if (!isHexColor(value)) {
    return baseStyles.join(';');
  }
  
  const styles = [...baseStyles];
  
  // Add background color
  styles.push(`background-color: ${value}`);
  
  // Add appropriate text color for contrast
  const textColor = isLightColor(value) ? '#000000' : '#ffffff';
  styles.push(`color: ${textColor}`);
  
  // Add some padding and border radius for better appearance
  styles.push('padding: 2px 4px');
  styles.push('border-radius: 3px');
  styles.push('font-weight: bold');
  
  return styles.join(';');
}
