import { useEffect, useRef, useState } from "react";
import "./App.css";
import { HashLoader } from "react-spinners";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import { FetchImages } from "../../API/api";
import ImageModal from "../ImageModal/ImageModal";
import { ImgData } from "../../types/types";

const override = {
  display: "block",
  margin: "0 auto",
};

function App() {
  const [collection, setCollection] = useState<ImgData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");

  const bottomRef = useRef<HTMLImageElement>(null);

  const handleSearch = (newImages: string) => {
    setSearchValue(newImages);
    setCurrentPage(1);
    setCollection([]);
    setIsError(false);
    setErrorMessage("");
  };

  const incPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const openModal = (photo: ImgData) => {
    setModalSrc(photo.urls.raw);
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
    if (searchValue === "") {
      setCollection([]);
      return;
    };

    async function fetchDataCollection(): Promise<void> {
      try {
        setIsLoading(true);

        const data = await FetchImages(searchValue, currentPage);
        setCollection((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : "Unknown error");
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
