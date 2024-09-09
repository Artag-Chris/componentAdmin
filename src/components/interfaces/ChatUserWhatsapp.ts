
export interface User {
    id?:number
    name: string;
    phone:string;
    email?: string;
    identification: string;
    atending:number;
    lastActive: Date;
    wppStatus:WhatsappStatus;
    WhatsappMessage?: any[],
    WhatsappImage?  : any[],
    WhatsappAudio?  : any[],
    WhatsappVideo?  : any[],
    WhatsappDoc  ?  : any[],
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

