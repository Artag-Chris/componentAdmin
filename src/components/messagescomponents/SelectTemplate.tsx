import React, { useState, useEffect } from "react";
import { Loader2, Send, FileSpreadsheet, ChevronDown, Search, X } from "lucide-react";
import * as XLSX from "xlsx";
import usePhoneNumbers from "../hook/usePhoneNumberToSend";
import useTemplates from "../hook/useTemplates";
import { getVariableCount } from "../functions";
import TetrisLoader from "../../loaders/TetrisLoader";


interface SendMessagesProps {
  setSelectedTemplate: (template: any) => void;
  selectedTemplate: any;
  setIsExcelFileLoaded: (isExcelFileLoaded: boolean) => void;
  setMessages: (messages: any) => void;
  messages: any;
  imageUrl: string;
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComponent, setIsLoadingComponent] = useState(true)
  const [result, setResult] = useState<{
    success: boolean;
    messagesSent: any;
    error?: string;
  } | null>(null);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState(templates);

  useEffect(() => {
    setFilteredTemplates(
      templates.filter((template) =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, templates]);

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
      // Implementación del envío de mensajes (sin cambios)
      // ...
    } catch (error) {
      console.error("Error al enviar los mensajes", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingComponent(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])
   
  if (isLoadingComponent) {
    return <TetrisLoader />;
  }
  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">Envío de plantillas</h2>
        </div>
        <div className="p-6 space-y-4">
          {/* Phone Number Dropdown */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Selecciona un número del cual enviar
            </label>
            <div className="relative">
              <button
                onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {selectedPhoneNumber || "Selecciona un número de teléfono"}
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

          {/* Template Selection Button */}
          <div className="space-y-2">
            <label htmlFor="template" className="block text-sm font-medium text-gray-700">
              Selecciona una plantilla
            </label>
            <button
              onClick={() => setIsTemplateModalOpen(true)}
              className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {selectedTemplate ? selectedTemplate.name : "Selecciona una plantilla"}
            </button>
          </div>

          {/* File Upload Dropdown */}
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
                    Selecciona un archivo de excel
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
              Archivo cargado: {file.name} ({messages.length} mensajes)
            </p>
          )}

          {/* Selected Template Preview */}
          {selectedTemplate && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Plantilla seleccionada:</h3>
              <p>{selectedTemplate.name}</p>
              <p className="text-sm text-gray-600 mt-2">
                Tipo: {selectedTemplate.components[0].type}
              </p>
              <p className="text-sm text-gray-600">
                Variables: {getVariableCount(selectedTemplate.name).variableCount}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedTemplate || !selectedPhoneNumber || messages.length === 0 || isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 flex items-center justify-center ${
              !selectedTemplate || !selectedPhoneNumber || messages.length === 0 || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Enviar mensajes
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
                ? `Se enviaron ${result.messagesSent} mensajes exitosamente!`
                : `Error: ${result.error}`}
            </div>
          )}
        </div>
      </div>

      {/* Template Selection Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Seleccionar plantilla</h3>
                <button onClick={() => setIsTemplateModalOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Buscar plantillas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsTemplateModalOpen(false);
                  }}
                  className="w-full text-left p-2 hover:bg-gray-100 rounded-md mb-2"
                >
                  <p className="font-semibold">{template.name}</p>
                  <p className="text-sm text-gray-600">
                    Tipo: {template.components[0].type}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}