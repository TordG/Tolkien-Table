import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Searchbar from "./components/Searchbar";
import Checkboxes from "./components/Checkboxes";
import ItemsPerPage from "./components/ItemsPerPage";
import Modal, { IModalData } from "./components/Modal";
import qs from "qs";
import { createBrowserHistory } from "history";
import { request } from "http";

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
  const [page, setPage] = useState<number>(1);
  const [modalData, setModalData] = useState<IModalData>(null);
  const [races, setRaces] = useState([] as Array<string>);
  const [mounted, setMounted] = useState(false);
  const baseUrl = "https://the-one-api.dev/v2/character/";
  const history = createBrowserHistory();

  //Optional parameter newUrl for å trådsikre handleCheckbox
  const fetchCharacters = async () => {
    console.log("fetch");
    const res = await axios.get(createApiUrl(), {
      headers: headers,
    });
    setPages(res.data.pages);

    setCharacters(res.data.docs as Array<iCharacter>);
  };

  const displayModal = async (char: iCharacter) => {
    const res = await axios.get(`${baseUrl}${char._id}/quote`, {
      headers: headers,
    });
    var data: IModalData = {
      ...modalData,
      modalName: char.name,
      modalQuote:
        res.data.docs.length > 0
          ? getRandom(res.data.docs)?.dialog ?? false
          : "No quotes for this character!",
    };
    setModalData(data);
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
    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams);
    console.log("filter", filtersFromParams);
    if (filtersFromParams.page) {
      setPage(Number(filtersFromParams.page));
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchCharacters();
      history.push(`?page=${page}`);
      setAscending(true);

      console.log("KJØRT!");
      console.log("Page er nå " + page);
    }
  }, [displayLimit, page, races, mounted]);

  const handlePageClick = async (data: { selected: number }) => {
    let currentPage = data.selected + 1; //pga array begynner på index 0
    setPage(currentPage);
  };

  const handleSortClick = () => {
    setCharacters(sortByName(characters));
    setAscending(!ascending);
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };
  const createApiUrl = () => {
    return `${baseUrl}?limit=${displayLimit}&page=${page}${
      races ? "&race=" + races.map((r) => r + ",") : null
    }&sort=name:asc`;
  };
  const handleCheckbox = (event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setRaces([...races, event.target.value]);
      setPage(1);
    } else {
      setRaces(races.filter((r) => r != event.target.value));
      setPage(1);
    }
  };

  return (
    <div className="App">
      <h1>Tolkien Characters</h1>

      {modalData && <Modal modalData={modalData} setModalData={setModalData} />}
      <div className="filtering">
        <Checkboxes handleOnClick={handleCheckbox} />
        <Searchbar handleSearchChange={handleSearchChange} />
      </div>

      <Table
        characters={characters}
        handleSortClick={handleSortClick}
        ascending={ascending}
        search={search}
        handleNameClick={displayModal}
      />
      <div className="page-options">
        <p>Items per page</p>
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
