import React, { useRef, useEffect } from 'react';
import { ButtonWrapper, CrossButtonWrapper, ModalContent, ModalHeader, ModalWrapper } from './Modal.style';
import { IModalProps } from './Modal.interface';

/**
 * Modal component that displays a dialog with a header and content.
 * It supports closing the modal by clicking outside or pressing the Escape key.
 *
 * @param onClose - Callback function to be called when the modal is closed.
 * @param header - The header text to be displayed in the modal.
 * @param children - The content to be displayed in the modal.
 */
const Modal: React.FC<IModalProps> = ({ 
  onClose,
  header,
  children
 }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeCrossButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * Retrieves focusable elements within a container and returns the current focus index.
   *
   * @param container - The container element to search for focusable elements.
   * @param currentFocus - The currently focused element.
   * @returns An object containing the focusable elements and the current focus index.
   */
  function getFocusables(container: HTMLDivElement | null, currentFocus: EventTarget | null) : any {
    // Get focusables in container
    const focusables = container?.querySelectorAll('button, [href]') as NodeListOf<HTMLElement>;
  
    // Get current focus index
    let focusIndex = 0;
    for (let i = 0; i < focusables.length; i++) {
      if (focusables[i] === currentFocus) {
        focusIndex = i;
        break;
      }
    }
  
    // Focus data
    return {
      focusables,
      focusIndex,
    };
  }
  
  useEffect(() => {
    /**
     * Handle the Escape and Tab keys.
     *
     * @param event - The keyboard event.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      const modalElement = modalRef.current;

      if (event.key === 'Tab') {
        // Get focus data
        const focusData = getFocusables(modalElement, event.target);

        // Trap focus
        if (event.shiftKey && focusData.focusIndex === 0) {
          // If shift + tab is pressed and the first focusable element is focused,
          // move focus to the last focusable element (looping)
          event.preventDefault();
          focusData.focusables[focusData.focusables.length - 1].focus();
        } else if (!event.shiftKey && focusData.focusIndex === focusData.focusables.length - 1) {
          // If tab is pressed and the last focusable element is focused,
          // move focus to the first focusable element (looping)
          event.preventDefault();
          focusData.focusables[0].focus();
        }
      }
    };

    /**
     * Handle clicks outside the modal to close it.
     *
     * @param event - The mouse event.
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add event listeners for the Escape key press and outside clicks
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listeners when the component is unmounted
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    // Focus the modal element when it's rendered
    const modalElement = modalRef.current;
    modalElement?.focus();
  }, []);

  

  return (
    <ModalWrapper 
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Modal Dialog"
    >
      <CrossButtonWrapper
        ref={closeCrossButtonRef}
        onClick={onClose}
        aria-label="Exit Modal"
      >
        &times;
      </CrossButtonWrapper>
      <ModalContent aria-label="Modal Content">
        {header && (
          <ModalHeader id="modal-header">
            {header}
          </ModalHeader>
        )}
        {children}

        <ButtonWrapper 
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close Modal"
        >
          Close
        </ButtonWrapper>
      </ModalContent>   
    </ModalWrapper>
    
  );
};

export default Modal;
