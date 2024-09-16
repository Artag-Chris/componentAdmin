import { RingLoader } from 'react-spinners';

const loadingStyles: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
};

export const LoadingComponent = () => {
  return (
    <div style={loadingStyles}>
      <RingLoader size={50} color="#123abc" />
      <p>Buscando datos...</p>
    </div>
  );
};