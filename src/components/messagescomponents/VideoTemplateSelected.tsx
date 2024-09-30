interface VideoTemplateSelectedProps {
    selectedTemplate: any; // puedes cambiar el tipo de dato a algo más específico si lo necesitas
  }
  
  const VideoTemplateSelected: React.FC<VideoTemplateSelectedProps> = ({ selectedTemplate }) => {
    return (
      <div>VideoTemplateSelected</div>
    )
  }
  
  export default VideoTemplateSelected;