import React from 'react';
import { ErrorContainer, ErrorTitle, ErrorMessage, RetryButton } from './styles';

export const ErrorState = () => (
  <ErrorContainer>
    <ErrorTitle>Algo salió mal</ErrorTitle>
    <ErrorMessage>
      No se pudieron cargar las galaxias. Intentalo de nuevo.
    </ErrorMessage>
    <RetryButton href="/galaxias">Reintentar</RetryButton>
  </ErrorContainer>
);