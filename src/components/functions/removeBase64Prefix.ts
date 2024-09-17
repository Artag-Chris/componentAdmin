
/**
 * Removes the base64 prefix from a base64 string.
 * @param base64String - The base64 string to remove the prefix from.
 * @returns The base64 string without the prefix.
 */
export function removeBase64Prefix(base64String: string): string {
    const prefix = 'data:';

    // Find the index of the prefix in the base64 string
    const indexOfPrefix = base64String.indexOf(prefix);

    if (indexOfPrefix !== -1) {
        // If the prefix is found, find the index of the comma after the prefix
        const indexOfComma = base64String.indexOf(',', indexOfPrefix + prefix.length);

        if (indexOfComma !== -1) {
            // If the comma is found, return the substring after the comma
            return base64String.substring(indexOfComma + 1);
        }
    }

    // If the prefix or comma is not found, return the original base64 string
    return base64String;
}