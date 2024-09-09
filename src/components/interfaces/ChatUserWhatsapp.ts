
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

  enum WhatsappStatus {
    "initial",
    "onMainMenu",
    "selectingState",
    "attended",
    "blocked"
  }

export interface WhatsappMessage {
  id: number,
  message: string,
  to:string,
  status: string,
  direction: string,
  type: string,
  mediaId: "",
  attendant: number,
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
  message: string,//archivo de base64
  to:string,
  status: string,
  direction: string,
  type: string,
  mediaId: "",
  attendant: number,
}

export interface WhatsappVideo {
  id: number,
  message: string,//archivo de base64
  to:string,
  status: string,
  direction: string,
  type: string,
  mediaId: "",
  attendant: number,
}

export interface WhatsappDoc {
  id: number,
  message: string,
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
