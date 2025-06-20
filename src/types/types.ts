export interface ImgData{
    id: string | number;
    alt_description: string;
    urls: {
        small: string;
        regular: string;
        full: string;
        raw: string;
    }
}

export interface UnsplashResponse {
  results: ImgData[];
  total: number;
  total_pages: number;
}

export interface ImageGalleryProps{
    photos: ImgData[];
    openModal: (photo: ImgData) => void;
    bottomRef: React.RefObject<HTMLImageElement | null>;
}

export interface ImageCardProps{
  photo: ImgData
  openModal: (photo: ImgData) => void;
  isLast: boolean;
  bottomRef: React.RefObject<HTMLImageElement | null>;
}