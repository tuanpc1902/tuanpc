import styled, { keyframes } from 'styled-components';
import { Button } from 'antd';

/**
 * Styled components cho trang DemNgayRaQuan với design hiện đại
 */

// Animations
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
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #0a0e27;
  position: relative;
  overflow-x: hidden;

  /* Animated gradient background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(
        135deg,
        #0a0e27 0%,
        #1a1f3a 25%,
        #2d1b3d 50%,
        #1a1f3a 75%,
        #0a0e27 100%
      );
    background-size: 400% 400%;
    animation: ${gradientShift} 15s ease infinite;
    opacity: 1;
    pointer-events: none;
  }

  /* Floating orbs effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 15% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 85% 75%, rgba(236, 72, 153, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    pointer-events: none;
    animation: ${float} 20s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 2.5rem;
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  text-align: center;
  margin: 0;
  line-height: 1.1;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #e0e7ff 30%,
    #c7d2fe 60%,
    #ffffff 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInDown} 0.8s ease-out, ${gradientShift} 8s ease infinite;
  text-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: clamp(1.75rem, 7vw, 3rem);
    letter-spacing: -0.01em;
  }
`;

export const DatePickerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

export const SectionLabel = styled.label`
  font-size: 1.75rem;
  font-weight: 600;
  color: #e0e7ff;
  text-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #6366f1, transparent);
    border-radius: 2px;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SubTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
  letter-spacing: 0.01em;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -60px;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #6366f1);
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -60px;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #6366f1, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;

    &::before,
    &::after {
      display: none;
    }
  }
`;

export const CountdownCard = styled.div`
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(148, 163, 184, 0.15);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 100px rgba(99, 102, 241, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  /* Shimmer effect */
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
      rgba(255, 255, 255, 0.05),
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(148, 163, 184, 0.3);
    box-shadow: 
      0 30px 80px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 150px rgba(99, 102, 241, 0.2);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 20px;
    gap: 1.5rem;
  }
`;

export const CountdownItem = styled.div<{ $color: string }>`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: ${props => props.$color};
  text-align: center;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    ${props => props.$color}15,
    ${props => props.$color}08,
    ${props => props.$color}15
  );
  border: 1.5px solid ${props => props.$color}40;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${scaleIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  text-shadow: 0 0 20px ${props => props.$color}60;
  letter-spacing: 0.02em;

  /* Glow effect */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      ${props => props.$color}20,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: scale(1.08) translateY(-4px);
    border-color: ${props => props.$color}70;
    box-shadow: 
      0 10px 40px ${props => props.$color}50,
      0 0 60px ${props => props.$color}30,
      inset 0 0 20px ${props => props.$color}10;
    text-shadow: 0 0 30px ${props => props.$color}80;

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    padding: 1.25rem 1.5rem;
  }
`;

export const CurrentDateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(224, 231, 255, 0.95);
  font-size: 1.25rem;
  animation: ${fadeInUp} 0.8s ease-out 0.8s both;
  padding: 1.5rem 2rem;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 1.25rem 1.5rem;
  }
`;

export const CurrentDateLabel = styled.div`
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.9em;
  opacity: 0.8;
`;

export const CurrentDateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(99, 102, 241, 0.4);
  font-size: 1.1em;
  letter-spacing: 0.02em;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
    font-size: 1em;
  }
`;

export const Separator = styled.span`
  color: rgba(99, 102, 241, 0.6);
  font-weight: 300;
  animation: ${pulse} 2s ease-in-out infinite;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const ButtonWrapper = styled.div`
  animation: ${fadeInUp} 0.8s ease-out 1s both;
`;

export const StyledDatePicker = styled.div`
  width: 100%;
  max-width: 320px;

  .ant-picker {
    background: rgba(15, 23, 42, 0.6) !important;
    backdrop-filter: blur(20px) !important;
    border: 1.5px solid rgba(148, 163, 184, 0.2) !important;
    border-radius: 16px !important;
    padding: 0.875rem 1.25rem !important;
    font-size: 1.15rem !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05) !important;
    width: 100% !important;

    &:hover {
      border-color: rgba(99, 102, 241, 0.5) !important;
      box-shadow: 
        0 12px 32px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(99, 102, 241, 0.2),
        0 0 40px rgba(99, 102, 241, 0.2) !important;
      transform: translateY(-3px);
      background: rgba(15, 23, 42, 0.7) !important;
    }

    &:focus,
    &.ant-picker-focused {
      border-color: #6366f1 !important;
      box-shadow: 
        0 0 0 4px rgba(99, 102, 241, 0.2),
        0 0 60px rgba(99, 102, 241, 0.3) !important;
      background: rgba(15, 23, 42, 0.8) !important;
      animation: ${glow} 2s ease-in-out infinite;
    }

    .ant-picker-input > input {
      color: #e0e7ff !important;
      font-weight: 600 !important;
      font-size: 1.05em !important;
    }

    .ant-picker-suffix {
      color: #818cf8 !important;
      transition: color 0.3s ease;
    }

    &:hover .ant-picker-suffix {
      color: #6366f1 !important;
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
      background: rgba(15, 23, 42, 0.6) !important;
      backdrop-filter: blur(20px) !important;
      border: 1.5px solid rgba(148, 163, 184, 0.2) !important;
      border-radius: 16px !important;
      padding: 0.625rem 1.25rem !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: 
        0 8px 24px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.05) !important;
      min-height: 48px !important;

      .ant-select-selection-item {
        color: #e0e7ff !important;
        font-weight: 600 !important;
        line-height: 36px !important;
        font-size: 1.05em !important;
      }

      .ant-select-selection-placeholder {
        color: #94a3b8 !important;
        line-height: 36px !important;
      }

      &:hover {
        border-color: rgba(99, 102, 241, 0.5) !important;
        box-shadow: 
          0 12px 32px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(99, 102, 241, 0.2),
          0 0 40px rgba(99, 102, 241, 0.2) !important;
        transform: translateY(-3px);
        background: rgba(15, 23, 42, 0.7) !important;
      }
    }

    &.ant-select-focused .ant-select-selector {
      border-color: #6366f1 !important;
      box-shadow: 
        0 0 0 4px rgba(99, 102, 241, 0.2),
        0 0 60px rgba(99, 102, 241, 0.3) !important;
      background: rgba(15, 23, 42, 0.8) !important;
      animation: ${glow} 2s ease-in-out infinite;
    }

    .ant-select-arrow {
      color: #818cf8 !important;
      transition: color 0.3s ease, transform 0.3s ease;
    }

    &:hover .ant-select-arrow {
      color: #6366f1 !important;
      transform: translateY(2px);
    }
  }

  @media (max-width: 768px) {
    .ant-select {
      width: 160px !important;
    }
  }
`;

export const LoadingText = styled.div`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
`;

export const HomeButton = styled(Button)`
  height: 56px !important;
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  padding: 0 2.5rem !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
  border: none !important;
  box-shadow: 
    0 8px 24px rgba(239, 68, 68, 0.4), 
    0 0 0 1px rgba(255, 255, 255, 0.1) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  letter-spacing: 0.02em !important;
  text-transform: uppercase !important;

  &:hover {
    transform: translateY(-4px) scale(1.05) !important;
    box-shadow: 
      0 12px 40px rgba(239, 68, 68, 0.6), 
      0 0 60px rgba(239, 68, 68, 0.3) !important;
    background: linear-gradient(135deg, #f87171 0%, #ef4444 100%) !important;
  }

  &:active {
    transform: translateY(-2px) scale(1.02) !important;
  }
`;