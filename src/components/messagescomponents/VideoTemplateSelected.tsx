import React, { useEffect, useState } from "react";
//import { ImageTemplateReceived } from "../interfaces";
import { getVariableCount, sendTemplate } from "../functions";
import { Upload, Send, Phone } from "lucide-react";
import { cuatroVariableImagen, cuatroVariableVideo, dosVariableImagen, dosVariableVideo, sinVariableImagen, tresVariableImagen, tresVariableVideo, unaVariableImagen, unaVariableVideo } from "../config/envs";

const ImageTemplateSelected: React.FC<any> = ({
  selectedTemplate,
}) => {
  const [variables, setVariables] = useState<any>();
  const [variableValues, setVariableValues] = useState<{ [key: string]: string }>({});
  const [videoUrl, setVideoUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setVariables(getVariableCount(selectedTemplate.name));
  }, [selectedTemplate]);

  const handleSendTemplate = () => {
    interface Payload {
      template: string,
      phone: string,
      mediaId: string,
      texto?: string;
      texto2?: string;
      texto3?: string;
      texto4?: string;
    };
    let payload: Payload = {
      phone: `${phoneNumber}`,
      mediaId: `${videoUrl}`,
      template: `${selectedTemplate.name}`,
    };

    switch (getVariableCount(selectedTemplate.name).variableCount) {
      case 0:
        if (!videoUrl.trim()) {
          console.error("Error: La URL de la imagen no puede estar vacía");
          return;
        }
        sendTemplate(sinVariableImagen, payload);

        break;
      case 1:
        if (!videoUrl.trim()) {
          console.error("Error: La URL de la imagen no puede estar vacía");
          return;
        }
        payload = {
          ...payload,
          texto: `${variableValues.variable1}`,
        };
        sendTemplate(unaVariableVideo, payload);

        break;
      case 2:
        payload = {
          ...payload,
          texto: `${variableValues.variable1}`,
          texto2: `${variableValues.variable2}`,
        };
        sendTemplate(dosVariableVideo, payload);
        break;
      case 3:
        payload = {
          ...payload,
          texto: `${variableValues.variable1}`,
          texto2: `${variableValues.variable2}`,
          texto3: `${variableValues.variable3}`,
        };
        sendTemplate(tresVariableVideo, payload);
        break;
      case 4:
        payload = {
          ...payload,
          texto: `${variableValues.variable1}`,
          texto2: `${variableValues.variable2}`,
          texto3: `${variableValues.variable3}`,
          texto4: `${variableValues.variable4}`,
        };
        sendTemplate(cuatroVariableVideo, payload);
        break;
      default:
        // Código para manejar otros tipos de componentes
        break;
    }

  };


  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">
            Plantilla con Video
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
              URL del video
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Sube la imagen desde internet"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
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

          {variables && variables.variableCount && (
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
                      placeholder={`Ingresa el texto de la variable ${index + 1
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
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.components[3] &&
                    selectedTemplate.components[3].type === "BUTTONS" &&
                    selectedTemplate.components[3].buttons &&
                    Array.isArray(selectedTemplate.components[3].buttons) && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Botones
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedTemplate.components[3].buttons.map(
                            (button: any, index: any) => (
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

      {videoUrl && (
        <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Video Preview
            </h3>
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTemplateSelected;