import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {children}
        <button onClick={onClose} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

export default Modal;
