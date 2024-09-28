//funcion para  volver el base64 en blob
export function base64ToBlob(base64: string | { data: string }, contentType: string = '', sliceSize: number = 512): Blob {
  try {
      let base64Data: string;

      if (typeof base64 === 'string') {
          base64Data = base64;
      } else if (typeof base64 === 'object' && base64.data) {
          base64Data = base64.data;
      } else {
          throw new Error('Input is not a valid base64 string or object');
      }

      // Eliminar el prefijo si está presente
      base64Data = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;

      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
  } catch (error) {
      console.error('Error decoding base64 string:', error);
      throw new Error('Failed to convert base64 to Blob');
  }
}