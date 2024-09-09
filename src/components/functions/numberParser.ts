export function numberParser(input: string): string {
    const index = input.indexOf('57');
    if (index === -1) {
      // Si no se encuentra "57", devolver el string original
      return input;
    }
    // Devolver el resto del string después de "57"
    return input.substring(index + 2);
  }