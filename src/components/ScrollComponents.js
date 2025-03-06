import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #FFFFFF;
  cursor: pointer;
  z-index: 3;
`;

export const ScrollText = styled.span`
  font-size: 1rem;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #FFFFFF;
`;

export const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid #FFFFFF;
  border-radius: 15px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #FFFFFF;
    border-radius: 50%;
    animation: scrollAnimation 2s infinite;
  }
  
  @keyframes scrollAnimation {
    0% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, 20px); opacity: 0; }
  }
`; 