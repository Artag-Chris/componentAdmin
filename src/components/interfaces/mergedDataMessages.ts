export interface MergedMessagesToChats {
    id:              number;
    name:            string;
    phone:           string;
    email:           null;
    identification:  string;
    attending:       number;
    lastActive:      Date;
    wppStatus:       string;
    detail:          string;
    WhatsappMessage: WhatsappMessage[];
    WhatsappImage:   WhatsappImage[];
    WhatsappAudio:   WhatsappAudio[];
    WhatsappVideo:   WhatsappVideo[];
    WhatsappDoc:     WhatsappDoc[];
}

interface WhatsappMessage {
    id:         string;
    message:    string;
    to:         string;
    status:     string;
    direction:  string;
    type:       string;
    mediaId:    string;
    timestamp:  Date;
    customerId: number;
    attendant:  number;
}
interface WhatsappImage {
    id: number,
    message: WhatsappImageData ,//archivo de base64
    to:string,
    status: string,
    direction: string,
    type: string,
    mediaId: "",
    attendant: number,
  }
  
interface WhatsappAudio {
    id: number,
    message: WhatsappAudioData,//archivo de base64
    to:string,
    status: string,
    direction: string,
    type: string,
    mediaId: "",
    attendant: number,
  }
  
interface WhatsappVideo {
    id: number,
    message: WhatsappVideoData,//archivo de base64
    to:string,
    status: string,
    direction: string,
    type: string,
    mediaId: "",
    attendant: number,
  }
  
interface WhatsappDoc {
    id: number,
    message: WhatsappDocData,
    to:string,
    status: string,
    direction: string,
    type: string,
    mediaId: "",
    attendant: number,
  }
  
   interface WhatsappImageData {
      type: string;
      data: ArrayBufferLike;
    };
    interface WhatsappVideoData {
      type: string;
      data: ArrayBufferLike;
    };
    interface WhatsappAudioData {
      type: string;
      data: ArrayBufferLike;
    };
    interface WhatsappDocData {
      type: string;
      data: ArrayBufferLike;
    };
  
