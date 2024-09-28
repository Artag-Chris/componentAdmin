export interface FetchDatafromAPIClass {
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
    WhatsappAudio:   Whatsapp[];
    WhatsappImage:   Whatsapp[];
    WhatsappVideo:   Whatsapp[];
    WhatsappDoc:     Whatsapp[];
}

interface Whatsapp {
    id:         string;
    message:    Message;
    to:         string;
    status:     Status;
    direction:  Direction;
    type:       string;
    mediaId:    string;
    timestamp:  Date;
    customerId: number;
    attendant:  number;
}

enum Direction {
    Incoming = "incoming",
    Outgoing = "outgoing",
}

interface Message {
    type: string;
    data: number[];
}

enum Status {
    Unread = "unread",
}

interface WhatsappMessage {
    id:         string;
    message:    string;
    to:         string;
    status:     Status;
    direction:  Direction;
    type:       Type;
    mediaId:    string;
    timestamp:  Date;
    customerId: number;
    attendant:  number;
}

enum Type {
    Text = "text",
}
