
export const ImageMessage: React.FC<{
    src: {
      message: { data: ArrayBufferLike };
      type: string;
    };
    direction: "outgoing" | "incoming";
  }> = ({ src, direction }) => {
    const url = URL.createObjectURL(
      new Blob([new Uint8Array(src.message.data)], { type: "image/jpeg" })
    );
    return (
      <img
        src={url}
        alt="Shared image"
        className={`max-w-32 lg:max-w-48 rounded-lg ${
          direction === "outgoing" ? "ml-auto" : "mr-auto"
        }`}
      />
    );
  };