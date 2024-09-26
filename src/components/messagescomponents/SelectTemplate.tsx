import { useState } from "react";
import { Loader2, Send, FileSpreadsheet, ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";
import usePhoneNumbers from "../hook/usePhoneNumberToSend";
import useTemplates from "../hook/useTemplates";
import { getVariableCount } from "../functions";
import {  cuatroVariable, cuatroVariableImagen, dosVariable, dosVariableImagen, sinVariable, sinVariableImagen, tresVariable, tresVariableImagen, unaVariable, unaVariableImagen } from "../config/envs";


interface SendMessagesProps {
  setSelectedTemplate: (template: string) => void;
  selectedTemplate: any;
  setIsExcelFileLoaded: (isExcelFileLoaded: boolean) => void;
  setMessages: (messages: any) => void;
  messages: any;
  imageUrl: string;
}

const sendMessages = async (
  messages: any,

) => {
  messages.forEach((fila: any) => {
    // Aquí debes enviar un mensaje con los datos de la fila
    console.log(fila);
  });
 
};
export default function SendMessages({
  setSelectedTemplate,
  selectedTemplate,
  setIsExcelFileLoaded,
  setMessages,
  messages,
  imageUrl
}: SendMessagesProps) {
  const { templates, error, loading } = useTemplates();
  const { phoneNumbers } = usePhoneNumbers();
 
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
  const [file, setFile] = useState<any>(null);
  
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    messagesSent: any;
    error?: string;
  } | null>(null);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target) {
        setIsExcelFileLoaded(true);
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setMessages(data as any[][]);
        setIsExcelFileLoaded(true);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (!selectedTemplate || !selectedPhoneNumber || messages.length === 0) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      const promises = messages.map(async (fila:any, index:any) => {
        if (index === 0) return; // Salta la primera iteración
  
        // Procesa la fila de datos
        let phone = "";
        let texto = "";
        let texto2 = "";
        let texto3 = "";
        let texto4 = "";
  
        for (const [columna, valor] of Object.entries(fila)) {
          const indice = parseInt(columna, 10);
          if (indice === 0) {
            phone = valor as string;
          } else if (indice === 1) {
            texto = valor as string;
          } else if (indice === 2) {
            texto2 = valor as string;
          } else if (indice === 3) {
            texto3 = valor as string;
          } else if (indice === 4) {
            texto4 = valor as string;
          }
        }
  
        // Define la URL en función del tipo de componente
        let url;
        if (selectedTemplate.components[0].type === 'HEADER') {
          switch (getVariableCount(selectedTemplate.name).variableCount) {
            case 0:
              url = sinVariableImagen;
              break;
            case 1:
              url = unaVariableImagen;
              break;
            case 2:
              url = dosVariableImagen;
              break;
            case 3:
              url = tresVariableImagen;
              break;
            case 4:
              url = cuatroVariableImagen;
              break;
            default:
              // Código para manejar otros tipos de componentes
              break;
          }
        } else {
          switch (getVariableCount(selectedTemplate.name).variableCount) {
            case 0:
              url = sinVariable;
              break;
            case 1:
              url = unaVariable;
              break;
            case 2:
              url = dosVariable;
              break;
            case 3:
              url = tresVariable;
              break;
            case 4:
              url = cuatroVariable;
              break;
            default:
              // Código para manejar otros tipos de componentes
              break;
          }
        }
  
        // Envía la solicitud
        const token = Math.random().toString(36).substr(2, 9);
        const payload = {
          template: selectedTemplate.name,
          mediaId: imageUrl,
          phone: phone,
          texto: texto,
          texto2: texto2,
          texto3: texto3,
          texto4: texto4,
        };
  
        // Envía la solicitud evita la petición doble
        const response = await fetch(`${url}?token=${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        // Procesa la respuesta
        if (!response.ok) {
          throw new Error("Error al enviar el mensaje");
        }
        console.log("Respuesta:", response.statusText);
        return response.json();
      });
  
      // Espera a que todas las solicitudes se completen
      await Promise.all(promises);
    } catch (error) {
      console.error("Error al enviar los mensajes", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">Envio de plantillas</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Seleciona un numero del cual enviar
            </label>
            <div className="relative">
              <button
                onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {selectedPhoneNumber || "Selecciona un numero de telefono"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isPhoneDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {phoneNumbers?.map((phone) => (
                    <button
                      key={phone.id}
                      onClick={() => {
                        setSelectedPhoneNumber(phone.number);
                        setIsPhoneDropdownOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      {phone.number}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="template"
              className="block text-sm font-medium text-gray-700"
            >
              Seleciona una plantilla
            </label>
            <div className="relative">
              <button
                onClick={() =>
                  setIsTemplateDropdownOpen(!isTemplateDropdownOpen)
                }
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
               {templates.find((t) => t.id.toString() === selectedTemplate)?.name || "Selecciona una plantilla"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isTemplateDropdownOpen && (
                <div className="dropdown-menu absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template);//no se puede convertir a string hay que encontrar otra solucion
                       
                        setIsTemplateDropdownOpen(false);
                      }}
                      className="dropdown-item block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Adjunta un archivo excel
            </label>
            <div className="relative">
              <button
                onClick={() => setIsFileDropdownOpen(!isFileDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 flex items-center"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                {file ? file.name : "Sube un excel"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isFileDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <label
                    htmlFor="file-upload"
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer"
                  >
                    Seleciona un archivo de excel
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                      className="hidden"  
                    />
                  </label>
                  {file && (
                    <button
                      onClick={() => {
                        setFile(null);
                        setMessages([]);
                        setIsExcelFileLoaded(false);
                        setIsFileDropdownOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      Eliminar archivo
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {file && (
            <p className="text-sm text-gray-600">
              File loaded: {file.name} ({messages.length} messages)
            </p>
          )}

          <div className="space-y-2">
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-gray-700"
            >
              Informacion adicional{" "}
            </label>
            <textarea
              id="additionalInfo"
              placeholder="Enter any additional information here..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 min-h-[100px]"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={
              !selectedTemplate ||
              !selectedPhoneNumber ||
              messages.length === 0 ||
              isLoading
            }
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 flex items-center justify-center ${
              !selectedTemplate ||
              !selectedPhoneNumber ||
              messages.length === 0 ||
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Envio de mensajes
              </>
            )}
          </button>

          {result && (
            <div
              className={`text-center p-2 rounded ${
                result.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {result.success
                ? `Successfully sent ${result.messagesSent} messages!`
                : `Error: ${result.error}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
