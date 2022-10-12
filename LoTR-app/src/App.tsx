import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Searchbar from "./components/Searchbar";
import Checkboxes from "./components/Checkboxes";
import ItemsPerPage from "./components/ItemsPerPage";
import Modal from "./components/Modal";

export interface iCharacter {
  _id: string;
  name: string;
  race: string;
  gender: string;
  birth: string;
  wikiUrl: string;
}

//Used for authentication
const headers = {
  Accept: "application/json",
  Authorization: "Bearer MBI2jYjM0UW8pKOtmkwA",
};

function App() {
  const [characters, setCharacters] = useState([] as Array<iCharacter>);
  const [displayLimit, setDisplayLimit] = useState<number>(10);
  const [pages, setPages] = useState<number>(0);
  const [ascending, setAscending] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [url, setUrl] = useState<string>(
    "https://the-one-api.dev/v2/character?race="
  );
  const [page, setPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("");
  const [modalQuote, setModalQuote] = useState<string>("");

  //Optional parameter newUrl for å trådsikre handleCheckbox
  const fetchCharacters = async (newUrl: string = url) => {
    const res = await axios.get(
      `${newUrl}&limit=${displayLimit}&page=${page}&sort=name:asc`,
      {
        headers: headers,
      }
    );

    setPages(res.data.pages);
    setCharacters(res.data.docs as Array<iCharacter>);
  };

  const fetchQuote = async (id: string) => {
    const res = await axios.get(
      `https://the-one-api.dev/v2/character/${id}/quote`,
      {
        headers: headers,
      }
    );

    res.data.docs.length > 0
      ? setModalQuote(getRandom(res.data.docs).dialog)
      : setModalQuote("No quotes for this character!");
  };

  const sortByName = (chars: Array<iCharacter>) => {
    return chars.sort((a, b) =>
      ascending ? (a.name < b.name ? 1 : -1) : a.name > b.name ? 1 : -1
    );
  };

  const getRandom = (list: Array<any>) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  useEffect(() => {
    fetchCharacters();
  }, [displayLimit, page]);

  const handlePageClick = async (data: any) => {
    let currentPage = data.selected + 1; //pga array begynner på index 0
    setPage(currentPage);

    setAscending(true);
  };

  const handleSortClick = () => {
    setCharacters(sortByName(characters));
    setAscending(!ascending);
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleCheckbox = async (event: any) => {
    if (event.target.checked) {
      let newUrl = `${url}${event.target.value},`;
      setUrl(newUrl);
      await fetchCharacters(newUrl); //await muligens unødvendig? Funker uten.
    } else {
      let newUrl = url.replace(`${event.target.value},`, "");
      setUrl(newUrl);
      await fetchCharacters(newUrl);
    }
  };

  const handleNameClick = (char: iCharacter) => {
    setOpenModal(true);
    setModalName(char.name);
    fetchQuote(char._id);
  };

  return (
    <div className="App">
      <h1>Tolkien Characters</h1>

      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          modalName={modalName}
          modalQuote={modalQuote}
        />
      )}
      <div className="filtering">
        <Checkboxes handleOnClick={handleCheckbox} />
        <Searchbar handleSearchChange={handleSearchChange} />
      </div>

      <Table
        characters={characters}
        handleSortClick={handleSortClick}
        ascending={ascending}
        search={search}
        handleNameClick={handleNameClick}
      />
      <div className="page-options">
        <ItemsPerPage setDisplayLimit={setDisplayLimit} />
        <ReactPaginate
          pageCount={pages}
          onPageChange={handlePageClick}
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          marginPagesDisplayed={4}
          pageRangeDisplayed={5}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default App;
