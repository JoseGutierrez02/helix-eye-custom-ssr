import React from 'react';
import { StyledConversionSection } from './styles';

const SPACESHIP_IMAGE = 'https://i.imgur.com/dBwEHOn.png'

export const ConversionSection = () => {
  return (
    <StyledConversionSection>
      <img
        className="picture"
        src={SPACESHIP_IMAGE}
        alt="Una nave espacial"
      />
      <h2 className="title">
        ¡Explorar el espacio nunca fue tan fácil!
      </h2>
      <a className="link" href='/galaxias'>Empieza ahora</a>
    </StyledConversionSection>
  );
};
