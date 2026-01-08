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

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px currentColor;
  }
  50% {
    box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
  }
`;

const numberPop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #2c3e50;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin: 0;
  line-height: 1.3;
  color: #ecf0f1;
  letter-spacing: -0.01em;
  padding: 0 1rem;
  animation: ${slideUp} 0.5s ease-out;

  @media (max-width: 768px) {
    font-size: clamp(1.75rem, 7vw, 2.5rem);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const DatePickerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  animation: ${slideUp} 0.5s ease-out 0.1s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SectionLabel = styled.label`
  font-size: 1.15rem;
  font-weight: 600;
  color: #95a5a6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ecf0f1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #ecf0f1;
  text-align: center;
  margin: 0;
  letter-spacing: -0.01em;
  animation: ${slideUp} 0.5s ease-out 0.15s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CountdownCard = styled.div`
  background: rgba(52, 73, 94, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(149, 165, 166, 0.2);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.5s ease-out 0.2s both;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.25rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

export const CountdownItem = styled.div<{ $color: string; $index?: number }>`
  text-align: center;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  background: rgba(44, 62, 80, 0.6);
  border: 2px solid ${props => props.$color}40;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  animation: ${scaleIn} 0.5s ease-out ${props => ((props.$index ?? 0) * 0.1 + 0.3)}s both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.$color}20, transparent);
    transition: left 0.5s ease;
  }

  .countdown-value {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: ${props => props.$color};
    line-height: 1.2;
    position: relative;
    z-index: 1;

    span[data-animating="true"] {
      animation: ${numberPop} 0.3s ease-out;
      display: inline-block;
    }
  }

  .countdown-label {
    font-size: 1rem;
    font-weight: 500;
    color: #95a5a6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .countdown-separator {
    font-size: 0.7em;
    opacity: 0.8;
    margin: 0 0.3em;
  }

  &:hover {
    border-color: ${props => props.$color}70;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px ${props => props.$color}40;

    &::before {
      left: 100%;
    }

    .countdown-value {
      animation: ${glow} 2s ease-in-out infinite;
    }
  }

  &:focus-visible {
    outline: 2px solid ${props => props.$color};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;

    .countdown-value {
      font-size: clamp(1.5rem, 5vw, 2rem);
    }
  }
`;

export const CurrentDateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #ecf0f1;
  font-size: 1.1rem;
  padding: 1.5rem 2rem;
  background: rgba(52, 73, 94, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(149, 165, 166, 0.15);
  width: 100%;
  max-width: 500px;
  animation: ${slideUp} 0.5s ease-out 0.4s both;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.25rem 1.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

export const CurrentDateLabel = styled.div`
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.875rem;
  color: #95a5a6;
`;

export const CurrentDateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  font-size: 1.15rem;
  color: #ecf0f1;

  time {
    transition: color 0.3s ease;
    
    &:hover {
      color: #3498db;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1rem;
  }
`;

export const Separator = styled.span`
  color: #95a5a6;
  font-weight: 300;
  animation: ${pulse} 2s ease-in-out infinite;

  @media (max-width: 640px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  animation: ${slideUp} 0.5s ease-out 0.5s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const StyledDatePicker = styled.div`
  width: 100%;
  max-width: 300px;

  .ant-picker {
    background: rgba(52, 73, 94, 0.6) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(149, 165, 166, 0.3) !important;
    border-radius: 12px !important;
    padding: 0.875rem 1.25rem !important;
    font-size: 1.1rem !important;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    width: 100% !important;

    &:hover {
      border-color: rgba(52, 152, 219, 0.5) !important;
      background: rgba(52, 73, 94, 0.7) !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2) !important;
    }

    &:focus,
    &.ant-picker-focused {
      border-color: #3498db !important;
      background: rgba(52, 73, 94, 0.8) !important;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2) !important;
    }

    .ant-picker-input > input {
      color: #ecf0f1 !important;
      font-weight: 500 !important;
      font-size: 1.1rem !important;
    }

    .ant-picker-suffix {
      color: #3498db !important;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;

    .ant-picker {
      font-size: 1rem !important;
      padding: 0.75rem 1rem !important;
    }
  }
`;

export const StyledSelect = styled.div`
  .ant-select {
    width: 180px !important;

    .ant-select-selector {
      background: rgba(52, 73, 94, 0.6) !important;
      backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(149, 165, 166, 0.3) !important;
      border-radius: 12px !important;
      padding: 0.625rem 1.25rem !important;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      min-height: 48px !important;

      .ant-select-selection-item {
        color: #ecf0f1 !important;
        font-weight: 500 !important;
        font-size: 1.1rem !important;
        line-height: 36px !important;
      }

      .ant-select-selection-placeholder {
        color: #95a5a6 !important;
        font-size: 1.1rem !important;
        line-height: 36px !important;
      }

      &:hover {
        border-color: rgba(52, 152, 219, 0.5) !important;
        background: rgba(52, 73, 94, 0.7) !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2) !important;
      }
    }

    &.ant-select-focused .ant-select-selector {
      border-color: #3498db !important;
      background: rgba(52, 73, 94, 0.8) !important;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2) !important;
    }

    .ant-select-arrow {
      color: #3498db !important;
    }
  }

  @media (max-width: 768px) {
    .ant-select {
      width: 160px !important;
    }
  }
`;

export const LoadingText = styled.div`
  color: #ecf0f1;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const HomeButton = styled(Button)`
  height: 52px !important;
  font-size: 1.15rem !important;
  font-weight: 600 !important;
  padding: 0 2.5rem !important;
  border-radius: 12px !important;
  background: #e74c3c !important;
  border: 2px solid rgba(231, 76, 60, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  backface-visibility: hidden;
  transform: translateZ(0);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    transform: translate(-50%, -50%);
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  .anticon,
  span {
    position: relative;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: #c0392b !important;
    border-color: rgba(231, 76, 60, 0.5) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(231, 76, 60, 0.4) !important;

    &::before {
      opacity: 1;
    }

    &::after {
      width: 300px;
      height: 300px;
    }

    .anticon,
    span {
      transform: translateX(2px);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3) !important;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none !important;

    &:hover {
      transform: none !important;
    }
  }
`;
