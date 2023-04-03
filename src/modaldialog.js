import React, { useEffect, useRef } from "react";
import './styles.css';

const ModalDialog = ({ isOpen, onClose, children }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (isOpen) {
            ref.current?.showModal();
            document.body.classList.add("modal-open"); // prevent bg scroll
        } else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpen]);

    return (
        <dialog ref={ref} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </dialog>

    );

};

export default ModalDialog;