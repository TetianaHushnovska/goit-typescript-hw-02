import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;

    if (topic.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }

    onSubmit(topic.trim());
    form.reset();
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <BsSearch />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="topic"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
