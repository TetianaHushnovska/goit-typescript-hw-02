import { ErrorProps } from "./ErroeMessage.types";
import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }: ErrorProps) =>{
  return (
    <div className={css.message}>
      <h1 className={css.tittle}>{message}</h1>
      <p className={css.text}>
        Please, check your search request or try again later.
      </p>
    </div>
  );
}

export default ErrorMessage;