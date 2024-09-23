import axios from 'axios';

export const sendTemplate = async (url: string, payload: any) => {
    try {
      const respuesta = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Respuesta:', respuesta.data);
    } catch (error) {
      console.error('Error:', error);
    }
};