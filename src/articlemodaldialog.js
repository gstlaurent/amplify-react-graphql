import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Flex,
    Image,
    Text,
    Card,
} from '@aws-amplify/ui-react';
import { deleteArticle } from "./api";
import './styles.css';

const ArticleModalDialog = ({ isOpen, onClose }) => {
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
                <span>Graham says Hello!</span>
            </div>
        </dialog>

    );

};

export default ArticleModalDialog;