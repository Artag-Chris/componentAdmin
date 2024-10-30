import axios from 'axios';
import { toast } from 'react-toastify';

export const sendTemplate = async (url: string, payload: any) => {
  try {
    const respuesta = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Respuesta:', respuesta.data);
    toast.success('Mensaje enviado correctamente!');
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error al enviar el mensaje');
  }
};