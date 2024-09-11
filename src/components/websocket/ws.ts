import { User } from "../interfaces";

export const initializeWebSocket = (
    setData: React.Dispatch<React.SetStateAction<User[]>>,
    data: User[]
  ): WebSocket => {
    const ws = new WebSocket("ws://localhost:4000/ws");
  
    ws.onopen = () => {
      console.log("WebSocket del front-end conectado");
    };
  
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, ...newData]);
      localStorage.setItem("whatsappData", JSON.stringify([...data, ...newData]));
    };
  
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    ws.onclose = () => {
      console.log(
        "WebSocket connection closed. Attempting to reconnect in 5 seconds..."
      );
      setTimeout(() => {
        initializeWebSocket(setData, data);
      }, 5000);
    };
  
    return ws;
  };