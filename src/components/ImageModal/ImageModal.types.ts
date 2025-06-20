export interface ImageModalProps{
    modalIsOpen: boolean;
    closeModal: () => void;
    src: string;
    alt: string;
}

export interface ImageSrc{
    raw: string;
    full?: string;
}