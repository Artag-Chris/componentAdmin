import React, { useEffect, useState } from "react";
//import { PDFTemplateReceived } from "../interfaces";
import { getVariableCount, sendTemplate } from "../functions";
import { Upload, Send, Phone, FileText } from "lucide-react";
import { fileToBlob } from "../functions/fileToBlob";
import { removeBase64Prefix } from "../functions/removeBase64Prefix";
import { fileMediaMeta, metaToken } from "../config/envs";
//import { cuatroVariablePDF, dosVariablePDF, sinVariablePDF, tresVariablePDF, unaVariablePDF } from "../config/envs";

const DocumentTemplateSelected: React.FC<any> = ({
  selectedTemplate,
}) => {
  const [variables, setVariables] = useState<any>();
  const [variableValues, setVariableValues] = useState<{ [key: string]: string }>({});
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setVariables(getVariableCount(selectedTemplate.name));
  }, [selectedTemplate]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Por favor, selecciona un archivo PDF válido.");
    }
  };
  const handleSendTemplate = async () => {
    if (!pdfFile) {
      alert("Por favor, selecciona un archivo PDF antes de enviar.");
      return;
    }
  
    interface Payload {
      phone: string;
      pdfFile: File;
      texto?: string;
      texto2?: string;
      texto3?: string;
      texto4?: string;
    }
  
    let payload: Payload = {
      phone: phoneNumber,
      pdfFile: pdfFile,
    };
  
    const file = pdfFile;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const blob = await fileToBlob(file);
      const formData = new FormData();
      formData.append("messaging_product", "whatsapp");
      formData.append("file", blob);
      formData.append("type", file.type);
  
      // ... resto de la lógica de la función ...
  
      switch (getVariableCount(selectedTemplate.name).variableCount) {
        case 0:
          console.log("No hay variables");
          // await sendTemplate(sinVariablePDF, payload);
          break;
        case 1:
          payload = {
            ...payload,
            texto: variableValues.variable1,
          };
          console.log("Una variable");
          // await sendTemplate(unaVariablePDF, payload);
          break;
        case 2:
          payload = {
            ...payload,
            texto: variableValues.variable1,
            texto2: variableValues.variable2,
          };
          console.log("Dos variables");
          // await sendTemplate(dosVariablePDF, payload);
          break;
        case 3:
          payload = {
            ...payload,
            texto: variableValues.variable1,
            texto2: variableValues.variable2,
            texto3: variableValues.variable3,
          };
          console.log("Tres variables");
          // await sendTemplate(tresVariablePDF, payload);
          break;
        case 4:
          payload = {
            ...payload,
            texto: variableValues.variable1,
            texto2: variableValues.variable2,
            texto3: variableValues.variable3,
            texto4: variableValues.variable4,
          };
          console.log("Cuatro variables");
          // await sendTemplate(cuatroVariablePDF, payload);
          break;
        default:
          console.error("Número de variables no soportado");
          break;
      }
  
      // Envía la solicitud con el formData
      fetch(fileMediaMeta, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${metaToken}`,
        },
        body: formData,
      })
        .then((response) => console.log("Archivo subido con éxito"))
        .catch((error) => console.error("Error al subir el archivo:", error));
    };
    reader.readAsDataURL(file);
  };

  

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">
            Plantilla con Documento PDF
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ejemplo del texto de la plantilla
            </h3>
            <p className="text-gray-600">
              {selectedTemplate.components[1].text}
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Documento PDF
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {pdfFile ? pdfFile.name : "Seleccionar archivo PDF"}
              </label>
              <button className="p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300">
                <Upload className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Número de Teléfono a Enviar
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ingresa el número de teléfono"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {variables && variables.variableCount > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Variables que tiene la plantilla
              </h3>
              {Array(variables.variableCount)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 w-24">
                      Variable {index + 1}
                    </label>
                    <input
                      type="text"
                      placeholder={`Ingresa el texto de la variable ${
                        index + 1
                      }`}
                      value={variableValues[`variable${index + 1}`] || ""}
                      onChange={(e) =>
                        setVariableValues({
                          ...variableValues,
                          [`variable${index + 1}`]: e.target.value,
                        })
                      }
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
            </div>
          )}

          {selectedTemplate.components[3] &&
            selectedTemplate.components[3].type === "BUTTONS" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Botones
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.components[3].buttons.map(
                    (button:any, index:any) => (
                      <button
                        key={index}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300"
                      >
                        {button.text}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

          <div className="pt-4">
            <button
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center"
              onClick={handleSendTemplate}
            >
              <Send className="mr-2 h-5 w-5" />
              Envío de Plantilla
            </button>
          </div>
        </div>
      </div>

      {pdfFile && (
        <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Vista previa del PDF
            </h3>
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              <FileText className="h-16 w-16 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">{pdfFile.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTemplateSelected;