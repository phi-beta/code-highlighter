/**
 * Detects if a string is a valid hex color code
 */
export declare function isHexColor(value: string): boolean;
/**
 * Converts a hex color to RGB values
 */
export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
} | null;
/**
 * Calculates the luminance of an RGB color (0-1 scale)
 */
export declare function getLuminance(r: number, g: number, b: number): number;
/**
 * Determines if a color is light (should use dark text) or dark (should use light text)
 */
export declare function isLightColor(hex: string): boolean;
/**
 * Finds the closest ANSI color to a given hex color
 */
export declare function hexToClosestAnsi(hex: string): string;
/**
 * Creates HTML styling for a color token with background color and appropriate text color
 */
export declare function createColorTokenHtml(value: string, baseStyles?: string[]): string;
