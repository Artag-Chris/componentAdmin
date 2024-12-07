export const fileToBlob = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result === null) {
          reject(new Error('Failed to read file'));
        } else {
          const blob = new Blob([result], { type: file.type });
          resolve(blob);
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  };