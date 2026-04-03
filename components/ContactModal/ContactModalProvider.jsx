'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ContactModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export default function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('contact-modal-open'));
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}
