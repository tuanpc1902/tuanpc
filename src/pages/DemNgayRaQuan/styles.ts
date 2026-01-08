import styled, { keyframes } from 'styled-components';
import { Button } from 'antd';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(52, 152, 219, 0.6);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 15s ease infinite;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 15% 25%, rgba(52, 152, 219, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 85% 75%, rgba(155, 89, 182, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(26, 188, 156, 0.1) 0%, transparent 50%);
    pointer-events: none;
    animation: ${float} 20s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(52, 152, 219, 0.05) 90deg,
        transparent 180deg,
        rgba(26, 188, 156, 0.05) 270deg,
        transparent 360deg
      );
    animation: ${rotate} 20s linear infinite;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    gap: 2.5rem;
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  text-align: center;
  margin: 0;
  line-height: 1.2;
  background: linear-gradient(
    135deg,
    #ecf0f1 0%,
    #3498db 30%,
    #1abc9c 60%,
    #ecf0f1 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInDown} 0.8s ease-out, ${gradientShift} 8s ease infinite;
  text-shadow: 0 0 40px rgba(52, 152, 219, 0.3);
  letter-spacing: -0.02em;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: clamp(1.75rem, 7vw, 3rem);
    letter-spacing: -0.01em;
  }
`;

export const DatePickerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

export const SectionLabel = styled.label`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ecf0f1;
  text-shadow: 0 2px 10px rgba(52, 152, 219, 0.3);
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #3498db, transparent);
    border-radius: 2px;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SubTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ecf0f1;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 30px rgba(52, 152, 219, 0.4);
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
  letter-spacing: 0.01em;
  position: relative;
  padding: 0 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -80px;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #3498db);
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -80px;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3498db, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 1rem;

    &::before,
    &::after {
      display: none;
    }
  }
`;

export const CountdownCard = styled.div`
  background: rgba(44, 62, 80, 0.5);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-radius: 32px;
  padding: 3.5rem;
  border: 2px solid rgba(149, 165, 166, 0.2);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(236, 240, 241, 0.05),
    inset 0 1px 0 rgba(236, 240, 241, 0.1),
    0 0 100px rgba(52, 152, 219, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(236, 240, 241, 0.05),
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(52, 152, 219, 0.1) 0%,
      transparent 70%
    );
    animation: ${float} 10s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-8px) scale(1.01);
    border-color: rgba(149, 165, 166, 0.4);
    box-shadow: 
      0 30px 80px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(236, 240, 241, 0.1),
      inset 0 1px 0 rgba(236, 240, 241, 0.15),
      0 0 150px rgba(52, 152, 219, 0.2);
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    border-radius: 24px;
    gap: 2rem;
  }
`;

export const CountdownItem = styled.div<{ $color: string }>`
  text-align: center;
  padding: 2.5rem 3rem;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    ${props => props.$color}20,
    ${props => props.$color}10,
    ${props => props.$color}20
  );
  border: 2px solid ${props => props.$color}50;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${scaleIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .countdown-value {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: ${props => props.$color};
    text-shadow: 0 0 20px ${props => props.$color}60;
    letter-spacing: 0.02em;
    line-height: 1.2;
  }

  .countdown-label {
    font-size: clamp(1rem, 2vw, 1.3rem);
    font-weight: 600;
    color: #95a5a6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.5rem;
  }

  .countdown-separator {
    font-size: 0.7em;
    opacity: 0.8;
    margin: 0 0.3em;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      ${props => props.$color}30,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: scale(1.05) translateY(-4px);
    border-color: ${props => props.$color}80;
    box-shadow: 
      0 15px 50px ${props => props.$color}50,
      0 0 80px ${props => props.$color}30,
      inset 0 0 30px ${props => props.$color}15;

    .countdown-value {
      text-shadow: 0 0 40px ${props => props.$color}90;
    }

    &::before {
      opacity: 1;
    }

    &::after {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 2.5rem;
    border-radius: 20px;

    .countdown-value {
      font-size: clamp(1.5rem, 6vw, 2.5rem);
    }
  }
`;

export const CurrentDateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  color: rgba(236, 240, 241, 0.95);
  font-size: 1.25rem;
  animation: ${fadeInUp} 0.8s ease-out 0.8s both;
  padding: 2rem 2.5rem;
  background: rgba(44, 62, 80, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(149, 165, 166, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(236, 240, 241, 0.1);
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #1abc9c, #9b59b6, #3498db);
    background-size: 200% 100%;
    animation: ${gradientShift} 3s ease infinite;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 1.5rem 2rem;
  }
`;

export const CurrentDateLabel = styled.div`
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.9em;
  opacity: 0.9;
  color: #95a5a6;
`;

export const CurrentDateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(52, 152, 219, 0.4);
  font-size: 1.2em;
  letter-spacing: 0.02em;
  color: #ecf0f1;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    font-size: 1em;
  }
`;

export const Separator = styled.span`
  color: rgba(52, 152, 219, 0.6);
  font-weight: 300;
  animation: ${pulse} 2s ease-in-out infinite;
  font-size: 1.5em;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const ButtonWrapper = styled.div`
  animation: ${fadeInUp} 0.8s ease-out 1s both;
`;

export const StyledDatePicker = styled.div`
  width: 100%;
  max-width: 350px;

  .ant-picker {
    background: rgba(44, 62, 80, 0.7) !important;
    backdrop-filter: blur(20px) !important;
    border: 2px solid rgba(149, 165, 166, 0.2) !important;
    border-radius: 20px !important;
    padding: 1rem 1.5rem !important;
    font-size: 1.15rem !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(236, 240, 241, 0.05) !important;
    width: 100% !important;

    &:hover {
      border-color: rgba(52, 152, 219, 0.5) !important;
      box-shadow: 
        0 12px 32px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(52, 152, 219, 0.2),
        0 0 40px rgba(52, 152, 219, 0.2) !important;
      transform: translateY(-3px);
      background: rgba(44, 62, 80, 0.8) !important;
    }

    &:focus,
    &.ant-picker-focused {
      border-color: #3498db !important;
      box-shadow: 
        0 0 0 4px rgba(52, 152, 219, 0.2),
        0 0 60px rgba(52, 152, 219, 0.3) !important;
      background: rgba(44, 62, 80, 0.9) !important;
      animation: ${glow} 2s ease-in-out infinite;
    }

    .ant-picker-input > input {
      color: #ecf0f1 !important;
      font-weight: 600 !important;
      font-size: 1.05em !important;
    }

    .ant-picker-suffix {
      color: #3498db !important;
      transition: color 0.3s ease, transform 0.3s ease;
    }

    &:hover .ant-picker-suffix {
      color: #2980b9 !important;
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;

    .ant-picker {
      font-size: 1rem !important;
      padding: 0.875rem 1.25rem !important;
    }
  }
`;

export const StyledSelect = styled.div`
  .ant-select {
    width: 200px !important;

    .ant-select-selector {
      background: rgba(44, 62, 80, 0.7) !important;
      backdrop-filter: blur(20px) !important;
      border: 2px solid rgba(149, 165, 166, 0.2) !important;
      border-radius: 20px !important;
      padding: 0.75rem 1.5rem !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: 
        0 8px 24px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(236, 240, 241, 0.05) !important;
      min-height: 52px !important;

      .ant-select-selection-item {
        color: #ecf0f1 !important;
        font-weight: 600 !important;
        line-height: 36px !important;
        font-size: 1.05em !important;
      }

      .ant-select-selection-placeholder {
        color: #95a5a6 !important;
        line-height: 36px !important;
      }

      &:hover {
        border-color: rgba(52, 152, 219, 0.5) !important;
        box-shadow: 
          0 12px 32px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(52, 152, 219, 0.2),
          0 0 40px rgba(52, 152, 219, 0.2) !important;
        transform: translateY(-3px);
        background: rgba(44, 62, 80, 0.8) !important;
      }
    }

    &.ant-select-focused .ant-select-selector {
      border-color: #3498db !important;
      box-shadow: 
        0 0 0 4px rgba(52, 152, 219, 0.2),
        0 0 60px rgba(52, 152, 219, 0.3) !important;
      background: rgba(44, 62, 80, 0.9) !important;
      animation: ${glow} 2s ease-in-out infinite;
    }

    .ant-select-arrow {
      color: #3498db !important;
      transition: color 0.3s ease, transform 0.3s ease;
    }

    &:hover .ant-select-arrow {
      color: #2980b9 !important;
      transform: translateY(2px) scale(1.1);
    }
  }

  @media (max-width: 768px) {
    .ant-select {
      width: 180px !important;
    }
  }
`;

export const LoadingText = styled.div`
  color: #ecf0f1;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out, ${pulse} 2s ease-in-out infinite;
`;

export const HomeButton = styled(Button)`
  height: 60px !important;
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  padding: 0 3rem !important;
  border-radius: 20px !important;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%) !important;
  border: 2px solid rgba(231, 76, 60, 0.3) !important;
  box-shadow: 
    0 8px 24px rgba(231, 76, 60, 0.4), 
    0 0 0 1px rgba(236, 240, 241, 0.1) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05) !important;
    box-shadow: 
      0 15px 50px rgba(231, 76, 60, 0.6), 
      0 0 80px rgba(231, 76, 60, 0.3) !important;
    background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%) !important;
    border-color: rgba(231, 76, 60, 0.5) !important;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02) !important;
  }
`;
