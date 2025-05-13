import { useEffect, useRef, useState } from "react";
import "./App.css";
import { HashLoader } from "react-spinners";
import Modal from "react-modal";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

import { FetchImages } from "./API/api";
import ImageModal from "./components/ImageModal/ImageModal";

const override = {
  display: "block",
  margin: "0 auto",
};

function App() {
  const [collection, setCollection] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const handleSearch = (newImages) => {
    setSearchValue(newImages);
    setCurrentPage(1);
    setCollection([]);
    setIsError(false);
    setErrorMessage(null);
  };

  const incPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const bottomRef = useRef(null);

  function openModal(photo) {
    setModalSrc(photo.urls);
    setModalAlt(photo.alt_description);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalAlt("");
    setModalSrc("");
  }

  useEffect(() => {
    if (currentPage > 1) {
      window.scrollBy({
        top: window.innerHeight * 0.6,
        behavior: "smooth",
      });
    }
  }, [collection, currentPage]);

  useEffect(() => {
    if (searchValue === "") return;

    async function fetchDataCollection() {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage(null);

        const collection = await FetchImages(searchValue, currentPage);
        setCollection((prev) => [...prev, ...collection.data.results]);
        setTotalPages(collection.data.total_pages);
      } catch (error) {
        setIsError(true);
        setErrorMessage(
          error.response?.statusText ||
            error.message ||
            "Something went wrong. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchDataCollection();
  }, [searchValue, currentPage]);

  const isCollection = collection.length > 0;
  const valueOfSearch = searchValue.trim() !== "";
  const lastPage = currentPage === totalPages;

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isCollection && (
        <ImageGallery
          photos={collection}
          openModal={openModal}
          bottomRef={bottomRef}
        />
      )}
      {isLoading && <HashLoader color="white" cssOverride={override} />}
      {!isCollection && !isLoading && valueOfSearch && !isError && (
        <ErrorMessage message="😕 No results found for your request." />
      )}
      {isError && !isLoading && <ErrorMessage message={errorMessage} />}
      {!isLoading && !lastPage && isCollection && (
        <>
          <LoadMoreBtn incPage={incPage} />
          <div ref={bottomRef}></div>
        </>
      )}
      <ImageModal
        modalIsOpen={isModalOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </div>
  );
}

export default App;
