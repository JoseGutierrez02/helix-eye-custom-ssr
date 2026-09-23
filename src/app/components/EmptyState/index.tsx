import React from 'react';
import { EmptyContainer, EmptyTitle, EmptyMessage } from './styles';

export const EmptyState = () => (
  <EmptyContainer>
    <EmptyTitle>Aún no hay galaxias</EmptyTitle>
    <EmptyMessage>
      No se encontraron registros. Volvé a intentarlo más tarde.
    </EmptyMessage>
  </EmptyContainer>
);