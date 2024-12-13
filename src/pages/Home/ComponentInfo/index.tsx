import React, { useCallback, useContext, useEffect } from 'react';
import StatusIndicator from '../../../commom/StatusIndicator';
import { SensorDict } from '../../../const/sensor';
import { StatusDict } from '../../../const/status';
import { CompanieContext } from '../../../context/Companie';
import ReceptorIcon from '../../../icons/ReceptorIcon';
import SensorIcon from '../../../icons/SensorIcon';
import {
  AssetInfoContainer,
  ComponentDetailInfoContainer,
  ComponentInfoWrapper,
  EmptyStateContainer,
  FirstLineContainer,
  ImageInputContainer,
  ImageWrapper,
  SecordLineContainer,
} from './styles';
import TrashIcon from '../../../icons/TrashIcon';
import InboxIcon from '../../../icons/InboxIcon';

const ComponentInfo: React.FC = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  const { selectedAsset } = useContext(CompanieContext);
  const [imageFile, setImageFile] = React.useState<File | undefined>();
  const [image, setImage] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | undefined>();

  const handleChangeInputImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      setError(undefined);
      const ImageFile = e.target.files[0];

      if (
        ImageFile.type !== 'image/jpeg' &&
        ImageFile.type !== 'image/png' &&
        ImageFile.type !== 'image/jpg' &&
        ImageFile.type !== 'image/webp'
      ) {
        setError('Formato de imagem inválido');
        return;
      }

      setImageFile(ImageFile);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.onerror = () => {
        setError('Erro ao carregar imagem');
      };
    },

    [],
  );

  useEffect(() => {
    return () => {
      setImage(undefined);
      setImageFile(undefined);
      if (ref.current) {
        ref.current.value = '';
      }
    };
  }, [selectedAsset]);

  return (
    <AssetInfoContainer>
      {!selectedAsset && (
        <EmptyStateContainer>
          <p>Selecione um componente</p>
        </EmptyStateContainer>
      )}
      {selectedAsset && (
        <>
          <ComponentInfoWrapper>
            <h1>{selectedAsset?.name}</h1>
            <StatusIndicator
              status={selectedAsset.status}
              type={selectedAsset.sensorType}
            />
          </ComponentInfoWrapper>
          <ComponentDetailInfoContainer>
            <FirstLineContainer>
              <ImageInputContainer>
                <ImageWrapper
                  onClick={() => {
                    if (!ref.current || imageFile) return;
                    ref.current?.click();
                  }}
                >
                  {!!image && (
                    <div
                      className="trash-icon"
                      onClick={() => {
                        setImage(undefined);
                        setImageFile(undefined);
                      }}
                    >
                      <TrashIcon width={14} height={14} color="#171717" />
                    </div>
                  )}
                  {!imageFile && (
                    <>
                      <InboxIcon />
                      <p>Adicionar imagem</p>
                    </>
                  )}
                  {image && <img src={image} alt="Imagem do Ativo" />}
                  <input
                    type="file"
                    ref={ref}
                    onInput={handleChangeInputImage}
                  />
                </ImageWrapper>
                {error && <p>{error}</p>}
              </ImageInputContainer>
              <div className="infos">
                <div className="info-item">
                  <p>
                    Tipo do sensor:{' '}
                    {selectedAsset?.sensorType &&
                      SensorDict[selectedAsset?.sensorType]}
                    {!selectedAsset?.sensorType && 'Não Informado'}
                  </p>
                </div>
                <div className="info-item">
                  <p>
                    Status:{' '}
                    {selectedAsset?.status && StatusDict[selectedAsset?.status]}
                    {!selectedAsset?.status && 'Não Informado'}
                  </p>
                </div>
              </div>
            </FirstLineContainer>
            <SecordLineContainer>
              <div className="info">
                <h1>Sensor</h1>
                <div>
                  <SensorIcon />
                  <p>{selectedAsset?.sensorId}</p>
                </div>
              </div>
              <div className="info">
                <h1>Receptor</h1>
                <div>
                  <ReceptorIcon />
                  <p>{selectedAsset?.gatewayId}</p>
                </div>
              </div>
            </SecordLineContainer>
          </ComponentDetailInfoContainer>
        </>
      )}
    </AssetInfoContainer>
  );
};

export default ComponentInfo;
