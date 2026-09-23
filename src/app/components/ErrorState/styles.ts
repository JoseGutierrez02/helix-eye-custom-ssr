import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  text-align: center;
`

export const ErrorTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: #2646A6;
`

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 300;
  color: #333;
`

export const RetryButton = styled.a`
  padding: 0.8rem 2.5rem;
  border-radius: 25px;
  background: #2646A6;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #1d3780;
  }
`