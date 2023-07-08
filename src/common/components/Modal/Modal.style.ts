import styled from 'styled-components';
import { media } from 'styled-bootstrap-grid';

/*  we can use theme for more robust design */

export const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  width: 100%;
  overflow: hidden; 
  
  ${media.xs`
    width: 100vw;
  `}
  
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    /* Styles specific to iPhone X, XS, 11 Pro, 12 Pro (Mobile Safari) */
    padding-bottom: env(safe-area-inset-bottom);
    padding-top: env(safe-area-inset-top);
  }
  
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    /* Styles specific to iPhone XR, 11, 11 Pro Max, 12, 12 Pro Max (Mobile Safari) */
    padding-bottom: env(safe-area-inset-bottom);
    padding-top: env(safe-area-inset-top);
  }
  
  /* Add more media queries for other mobile devices if needed */
`;


export const CrossButtonWrapper = styled.button`
  position: absolute;
  top: 10px;
  right: 30px;
  background: none;
  border: none;
  color: #fff;
  font-size: 80px;
  cursor: pointer;

  ${media.xs`    
    font-size: 40px;
  `}
`;

export const ButtonWrapper = styled.button`  
  font-size: 25px;
  background-color: #F9BD59;
  color: #ffffff;
  padding: 10px 20px;
  margin: 10px 0px;
  border: none; 
  cursor: pointer;
  border-radius: 5px;
`;

/* we can add more styling for header */
export const ModalHeader = styled.h2`
  padding: 0px;
`;

export const ModalContent = styled.div`
  background-color: #316bf5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #ffffff;
`;