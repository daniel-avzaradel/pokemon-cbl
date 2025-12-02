import styled, { keyframes } from 'styled-components';
import Pokeball from '../../assets/pokeball2.png';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const borderAndTextFlash = keyframes`
  0% {
    border-color: #3498db;
    filter: drop-shadow(0 0 2px #3498db);
  }
  25% {
    border-color: #e74c3c;
    filter: drop-shadow(0 0 4px #e74c3c);
  }
  50% {
    border-color: #f1c40f;
    filter: drop-shadow(0 0 6px #f1c40f);
  }
  75% {
    border-color: #2ecc71;
    filter: drop-shadow(0 0 4px #2ecc71);
  }
  100% {
    border-color: #3498db;
    filter: drop-shadow(0 0 2px #3498db);
  }
`;

export const LoadingContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
`

const typingDots = keyframes`
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
  100% { content: ''; }
`;

const ModalContent = styled.div`
    width: 600px;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0%);
    display: flex;
    align-items: center;
    padding: 2rem;
    border-radius: 15px;
    color: white;
    gap: 2rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    animation: ${borderAndTextFlash} 2s linear infinite;

    & > h1 {
        font-size: 3rem;
        transition: border-color 0.2s, box-shadow 0.2s;
        animation: ${borderAndTextFlash} 2s linear infinite;
        &::after {
        content: '';
        animation: ${typingDots} 1.5s steps(4, end) infinite;
        margin-left: 5px;
        }
    }
    & > img {
        animation: ${spin} 2s linear infinite;
    }
`

const LoadingBattle = () => {

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 5000)
  }, [])

  if(redirect) {
    toast.error("failed to fetch data");
    return <Navigate to="/battle" replace />
  }

  return (
    <LoadingContainer>
        <ModalContent>
            <img src={Pokeball} width={90} />
            <h1>LOADING BATTLE</h1>
        </ModalContent>
    </LoadingContainer>
  )
}

export default LoadingBattle