import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Play } from 'lucide-react';

export interface TourStep {
  id?: string;
  target: string | string[];
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface TourGuideProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onDismissForever: () => void;
  onStepChange?: (stepIndex: number) => void;
}

const PADDING = 8;

const TourGuide: React.FC<TourGuideProps> = ({ steps, isOpen, onClose, onComplete, onDismissForever, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const onStepChangeRef = useRef(onStepChange);
  useEffect(() => {
    onStepChangeRef.current = onStepChange;
  }, [onStepChange]);

  const updateRect = useCallback(() => {
    if (!isOpen || !steps[currentStep]) return;
    const target = steps[currentStep].target;
    const selectors = Array.isArray(target) ? target : [target];
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let found = false;
    
    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          minX = Math.min(minX, rect.left);
          minY = Math.min(minY, rect.top);
          maxX = Math.max(maxX, rect.right);
          maxY = Math.max(maxY, rect.bottom);
          found = true;
        }
      }
    });
    
    if (found) {
      setTargetRect({
        left: minX,
        top: minY,
        right: maxX,
        bottom: maxY,
        width: maxX - minX,
        height: maxY - minY,
        x: minX,
        y: minY,
        toJSON: () => {}
      } as DOMRect);
    } else {
      setTargetRect(null);
    }
  }, [isOpen, currentStep, steps]);

  useEffect(() => {
    if (isOpen) {
      onStepChangeRef.current?.(currentStep);
      
      updateRect();
      const timer = setTimeout(updateRect, 350);
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        updateRect();
      };
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', updateRect, true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', updateRect, true);
        clearTimeout(timer);
      };
    }
  }, [isOpen, currentStep, updateRect]);

  // Reset step when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Calculate popover position
  let popoverStyle: React.CSSProperties = {};
  if (targetRect) {
    const placement = step.placement || 'right';
    const popoverWidth = 320;
    
    const isLowerHalf = targetRect.top > windowSize.height / 2;
    
    if (placement === 'right') {
      popoverStyle = {
        left: `${targetRect.right + PADDING + 8}px`,
        ...(isLowerHalf 
          ? { bottom: `${Math.max(16, windowSize.height - targetRect.bottom)}px` } 
          : { top: `${Math.max(16, targetRect.top)}px` })
      };
    } else if (placement === 'left') {
      popoverStyle = {
        left: `${targetRect.left - popoverWidth - PADDING - 8}px`,
        ...(isLowerHalf 
          ? { bottom: `${Math.max(16, windowSize.height - targetRect.bottom)}px` } 
          : { top: `${Math.max(16, targetRect.top)}px` })
      };
    } else if (placement === 'bottom') {
      popoverStyle = {
        left: `${Math.max(16, targetRect.left)}px`,
        top: `${targetRect.bottom + PADDING + 8}px`,
      };
    } else if (placement === 'top') {
      popoverStyle = {
        left: `${Math.max(16, targetRect.left)}px`,
        bottom: `${windowSize.height - targetRect.top + PADDING + 8}px`,
      };
    }
  } else {
    // Center if no target
    popoverStyle = {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto">
      {/* Overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - PADDING}
                y={targetRect.top - PADDING}
                width={targetRect.width + PADDING * 2}
                height={targetRect.height + PADDING * 2}
                fill="black"
                rx="8"
                ry="8"
                className="transition-all duration-300 ease-in-out"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.6)"
          mask="url(#tour-mask)"
          className="transition-all duration-300 ease-in-out pointer-events-auto"
          onClick={onClose}
        />
      </svg>

      {/* Popover */}
      <div
        className="absolute bg-white rounded-xl shadow-2xl w-[320px] transition-all duration-300 ease-in-out flex flex-col overflow-hidden border border-slate-100"
        style={popoverStyle}
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[15px] font-bold text-slate-800">{step.title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-2 -mt-2 rounded-md hover:bg-slate-100">
              <X size={16} />
            </button>
          </div>
          <p className="text-[13px] text-slate-600 leading-relaxed min-h-[60px]">
            {step.content}
          </p>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-4 bg-primary' : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                title="上一步"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            
            {isLastStep ? (
              <button
                onClick={onComplete}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-[12px] font-bold hover:bg-primary-hover transition-colors shadow-sm"
              >
                完成 <Check size={14} />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-[12px] font-bold hover:bg-primary-hover transition-colors shadow-sm"
              >
                下一步 <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
        
        <div className="px-5 py-2 bg-slate-100/50 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 transition-colors">
            临时跳过
          </button>
          <button onClick={onDismissForever} className="text-slate-400 hover:text-red-500 transition-colors">
            不再提醒
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourGuide;
