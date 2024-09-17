
export const VideoMessage: React.FC<{
    src: {
      message: { data: ArrayBufferLike };
      type: string;
    };
    direction: "outgoing" | "incoming";
  }> = ({ src, direction }) => {
    const url = URL.createObjectURL(
      new Blob([new Uint8Array(src.message.data)], { type: "video/mp4" })
    );
    return (
      <video
        controls
        className={`max-w-32 lg:max-w-48 rounded-lg${
          direction === "outgoing" ? "ml-auto" : "mr-auto"
        }`}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };