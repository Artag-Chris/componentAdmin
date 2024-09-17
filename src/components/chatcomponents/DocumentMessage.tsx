import { File } from "lucide-react";
export const DocumentMessage: React.FC<{
    src: {
      message: { data: ArrayBufferLike };
      type: string;
    };
    direction: "outgoing" | "incoming";
  }> = ({ src, direction }) => {
    const url = URL.createObjectURL(
      new Blob([new Uint8Array(src.message.data)], {
        type: "application/octet-stream",
      })
    );
    return (
      <a
        href={url}
        download="documento"
        className={`flex items-center text-blue-500 hover:underline ${
          direction === "outgoing" ? "ml-auto" : "mr-auto"
        }`}
      >
        <File size={24} className="mr-2" />
        Ver documento
      </a>
    );
  };
  