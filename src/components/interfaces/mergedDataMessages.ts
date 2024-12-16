export interface ChatMessages {
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
  fileName?:   string;
}
