import React, { useRef, useEffect } from 'react';

// Définir l'interface pour les props
interface ModalProps {
    children: React.ReactNode; // ou JSX.Element si vous êtes certain que ce sera un seul élément JSX
    isOpen: boolean;
    handleClose: () => void;
}

function Modal({ children, isOpen, handleClose }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null); // Spécifiez que le ref est un dialog HTML

    const close = () => {
        dialogRef.current?.close();
        handleClose(); // Assurez-vous d'appeler handleClose après la fermeture
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen && !dialog?.open) {
            dialog?.showModal();
        } else if (!isOpen && dialog?.open) {
            dialog?.close();
        }
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
        >
            <button 
                type="button" 
                onClick={close} 
                title="Close modal" 
                aria-label="Close modal"
                className='btn-delete'
            >
                X
            </button>
            {children}    
        </dialog>
    );
}

export default Modal;
