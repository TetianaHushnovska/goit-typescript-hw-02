import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ incPage }) {
  return (
    <button onClick={incPage} className={css.btn}>
      Load more
    </button>
  );
}
