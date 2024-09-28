
export interface User {
    id?:number
    name: string;
    phone:string;
    email?: string;
    identification: string;
    atending:number;
    lastActive: Date;
    wppStatus:WhatsappStatus;
    WhatsappMessage?: WhatsappMessage[],
    WhatsappImage?  : WhatsappImage[],
    WhatsappAudio?  : WhatsappAudio[],
    WhatsappVideo?  : WhatsappVideo[],
    WhatsappDoc  ?  : WhatsappDoc[],
    detail          : String          

    // Agrega más campos según sea necesario
  }

   export enum WhatsappStatus {
    "initial",
    "onMainMenu",
    "selectingState",
    "attended",
    "blocked"
  }

export interface WhatsappMessage {
  id: string,
  message: string,
  to:string,
  status: string,
  direction: string,
  type: string,
  mediaId: "",
  attendant: number,
  timestamp?: Date
}

export interface WhatsappImage {
  id: number,
  message: WhatsappImageData ,//archivo de base64
  to:string,
  status: string,
  direction: string,
  type: string,
  mediaId: "",
  attendant: number,
}

export interface WhatsappAudio {
  id: number,
  message: WhatsappAudioData,//archivo de base64
  to:string,
  status: string,
  direction: string,
  type: string,
  mediaId: "",
  attendant: number,
}

export interface WhatsappVideo {
  id: number,
  message: WhatsappVideoData,//archivo de base64
  to:string,
  status: string,
  direction: string,
  type: string,
  mediaId: "",
  attendant: number,
}

export interface WhatsappDoc {
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
