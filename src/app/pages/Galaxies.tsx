import React from 'react';
import styled from 'styled-components';
import { GalaxiesLayout } from '../components/GalaxiesLayout';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { GalaxiesProps } from '../components/GalaxiesLayout/types';

const GalaxiesPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 3rem 3rem;
  width: calc(100% - 6rem);
`

export const Galaxies = (props: GalaxiesProps) => {
  const { galaxies = [], status = 'loading' } = props

  const renderLayout = () => {
    if (status === 'error') return <ErrorState />

    if (status === 'loading') return <LoadingSpinner />

    if (status === 'ready' && galaxies.length === 0) return <EmptyState />

    return <GalaxiesLayout galaxies={galaxies} />
  }

  return (
    <GalaxiesPageWrapper>
      <h1>Galaxias</h1>
      {renderLayout()}
    </GalaxiesPageWrapper>
  );
}
