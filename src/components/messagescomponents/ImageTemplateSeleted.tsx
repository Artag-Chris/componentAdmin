"use client";

import React, { useEffect, useState } from "react";
import { ImageTemplateReceived } from "../interfaces";
import { getVariableCount } from "../functions";
import { Upload, Send, Image as ImageIcon } from "lucide-react";

const ImageTemplateSelected: React.FC<ImageTemplateReceived> = ({
  selectedTemplate,
}) => {
  const [variables, setVariables] = useState<any>();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setVariables(getVariableCount(selectedTemplate.name));
  }, [selectedTemplate]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">
            Plantilla con Imagen
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
              URL de la Imagen
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="sube la imagen desde internet"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300">
                <Upload className="h-5 w-5" />
              </button>
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
                      placeholder={`Ingresa el texto de la variable ${index + 1}`}
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
                            (button, index) => (
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
            <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center">
              <Send className="mr-2 h-5 w-5" />
              Envio de Plantilla
            </button>
          </div>
        </div>
      </div>

      {imageUrl && (
        <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Image Preview
            </h3>
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Template Preview"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x225?text=Invalid+Image+URL";
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTemplateSelected;