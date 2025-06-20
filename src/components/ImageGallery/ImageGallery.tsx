import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { ImageGalleryProps } from "../../types/types";

const ImageGallery = ({ photos, openModal, bottomRef }: ImageGalleryProps) => {
  return (
    <div className={css.gallery}>
      <ul className={css.list}>
        {photos.map((photo, index) => {
          const isLast = index === photos.length - 1;

          return (
            <li key={photo.id} className={css.item}>
              <ImageCard
                photo={photo}
                openModal={openModal}
                bottomRef={bottomRef}
                isLast={isLast}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ImageGallery;