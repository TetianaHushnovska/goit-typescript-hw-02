import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get('search') as string;

    if (searchValue.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }

    onSubmit(searchValue  .trim());
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      <form action={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <BsSearch />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="search"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default SearchBar;