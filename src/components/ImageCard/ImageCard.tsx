import css from "./ImageCard.module.css";
import { ImageCardProps } from "../../types/types";

const ImageCard = ({ photo, openModal, isLast, bottomRef }: ImageCardProps) => {
  return (
    <div className={css.blokimg} onClick={() => openModal(photo)}>
      <img
        ref={isLast ? bottomRef : null}
        src={`${photo.urls.raw}&w=400&h=300&fit=clamp&fm=webp`}
        srcSet={`${photo.urls.raw}&w=400&h=300&fit=clamp&fm=webp 1x, ${photo.urls.raw}&w=400&h=300&dpr=2&fit=clamp&fm=webp 2x`}
        alt={photo.alt_description}
        className={css.img}
        onLoad={() => {
          if (isLast && bottomRef?.current) {
            window.scrollBy({
              top: window.innerHeight * 0.6,
              behavior: "smooth",
            });
          }
        }}
      />
    </div>
  );
}

export default ImageCard;