import css from './LoadMoreBtn.module.css'

type Props = {
  incPage: () => void;
}

const LoadMoreBtn= ({ incPage }: Props) =>{
  return (
    <button onClick={incPage} className={css.btn}>
      Load more
    </button>
  );
}
export default LoadMoreBtn;