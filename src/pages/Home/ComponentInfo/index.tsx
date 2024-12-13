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
  SecordLineContainer,
} from './styles';

const ComponentInfo: React.FC = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  const { selectedAsset } = useContext(CompanieContext);
  const [imageFile, setImageFile] = React.useState<File | undefined>();
  const [image, setImage] = React.useState<string | undefined>();

  const handleChangeInputImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      const ImageFile = e.target.files[0];

      if (
        ImageFile.type !== 'image/jpeg' &&
        ImageFile.type !== 'image/png' &&
        ImageFile.type !== 'image/jpg' &&
        ImageFile.type !== 'image/webp'
      ) {
        return;
      }

      setImageFile(ImageFile);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.onerror = () => {
        //toastError({ title: 'Erro ao converter a Imagem!' });
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
              <div
                className="image-wrapper"
                onClick={() => {
                  if (!ref.current || imageFile) return;
                  ref.current?.click();
                }}
              >
                {!imageFile && <p>Adicionar imagem</p>}
                {image && <img src={image} alt="Imagem do Ativo" />}
                <input type="file" ref={ref} onInput={handleChangeInputImage} />
              </div>
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
