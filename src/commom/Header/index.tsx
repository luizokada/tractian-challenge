import React, { useContext } from 'react';
import {
  CompanieOption,
  CompanieSelectionContainer,
  HeaderContainer,
} from './styles';
import TractianLogoIcon from '../../icons/TractianLoago';
import { CompanieContext } from '../../context/Companie';
import CompanieIcon from '../../icons/CompanieIcon';

const Header: React.FC = () => {
  const { companies, selectedCompany, setSelectedCompany } =
    useContext(CompanieContext);
  return (
    <HeaderContainer>
      <TractianLogoIcon />
      <CompanieSelectionContainer>
        {companies?.map((companie) => (
          <CompanieOption
            key={companie.id}
            $isSelected={companie.id === selectedCompany}
            onClick={() => {
              if (selectedCompany !== companie.id) {
                setSelectedCompany(companie.id);
              }
            }}
          >
            <CompanieIcon />
            <p>{companie.name}</p>
          </CompanieOption>
        ))}
      </CompanieSelectionContainer>
    </HeaderContainer>
  );
};

export default Header;
