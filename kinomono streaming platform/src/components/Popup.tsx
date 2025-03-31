import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Popup = ({ isOpen, onClose, title, children }: PopupProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="netflix-popup">
      <div 
        ref={overlayRef}
        className="netflix-popup-overlay"
        onClick={handleOverlayClick}
      />
      <div className="netflix-popup-content">
        <div className="flex items-center justify-between p-4 border-b border-netflix-gray/20">
          <h3 className="text-xl font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-netflix-gray/20 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;