export function getVariableCount(templateName: string) {
    // Convertir el nombre de la plantilla a minúsculas para evitar problemas de mayúsculas/minúsculas
    const lowerCaseName = templateName.toLowerCase();
  
    // Inicializar el número de variables
    let variableCount = -1;
  
    // Usar expresiones regulares para buscar patrones específicos
    if (/una\s*variable/.test(lowerCaseName)) {
      variableCount = 1;
    } else if (/dos\s*variables/.test(lowerCaseName)) {
      variableCount = 2;
    } else if (/tres\s*variables/.test(lowerCaseName)) {
      variableCount = 3;
    } else if (/cuatro\s*variables/.test(lowerCaseName)) {
      variableCount = 4;
    } else if (/sin\s*variable/.test(lowerCaseName)) {
      variableCount = 0;
    }
  
    // Verificar si el nombre de la plantilla contiene la palabra "imagen"
    const hasImage = /imagen/.test(lowerCaseName);
  
    // Devolver un objeto con el número de variables y si contiene imagen
    return {
      variableCount,
      hasImage
    };
  }