import { WhatsappAudio, WhatsappDoc, WhatsappImage, WhatsappMessage, WhatsappVideo } from "../interfaces";

export class Conversation {
    id: number;
    name: string;
    phone: string;
    email: null;
    identification: string;
    attending: number;
    lastActive: Date;
    wppStatus: string;
    detail: string;
    WhatsappMessage?: WhatsappMessage[];
    WhatsappImage?: WhatsappImage[];
    WhatsappAudio?: WhatsappAudio[];
    WhatsappVideo?: WhatsappVideo[];
    WhatsappDoc?: WhatsappDoc[];

    constructor(
        id: number,
        name: string,
        phone: string,
        email: null,
        identification: string,
        attending: number,
        lastActive: Date,
        wppStatus: string,
        detail: string,
        WhatsappMessage: WhatsappMessage[],
        WhatsappImage: WhatsappImage[],
        WhatsappAudio: WhatsappAudio[],
        WhatsappVideo: WhatsappVideo[],
        WhatsappDoc: WhatsappDoc[]
    ) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.identification = identification;
        this.attending = attending;
        this.lastActive = lastActive;
        this.wppStatus = wppStatus;
        this.detail = detail;
        this.WhatsappMessage = WhatsappMessage;
        this.WhatsappImage = WhatsappImage;
        this.WhatsappAudio = WhatsappAudio;
        this.WhatsappVideo = WhatsappVideo;
        this.WhatsappDoc = WhatsappDoc;
    }

    mergeArrays() {
        return [
            ...this.WhatsappMessage!,
            ...this.WhatsappImage!,
            ...this.WhatsappAudio!,
            ...this.WhatsappVideo!,
            ...this.WhatsappDoc!,
        ];
    }
}