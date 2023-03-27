import "./index.css";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import BookItem from "../BookItem";
import RenderFailureView from "../../FailureView";
import Button from "@mui/material/Button";

const apiResponseStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

const Home = () => {
  const [apiResponse, setApiResponse] = useState(apiResponseStatus.initial);
  const [booksList, setBooksList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getResultList = async () => {
    setApiResponse(apiResponseStatus.inProgress);
    const url = "http://localhost:5000/";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        setApiResponse(apiResponseStatus.success);
        setBooksList(data.result);
      } else {
        setApiResponse(apiResponseStatus.failure);
      }
    } catch (error) {
      setApiResponse(apiResponseStatus.failure);
    }
  };
  useEffect(() => {
    getResultList();
  }, []);

  const onClickReSearchButton = () => {
    setSearchInput("");
  };

  const notMatchView = () => (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center">
        <img
          className="w-50"
          src="https://img.freepik.com/free-vector/marketers-with-magnifier-research-marketing-opportunities-chart-marketing-research-marketing-analysis-market-opportunities-problems-concept_335657-821.jpg?size=626&ext=jpg&uid=R96247835&ga=GA1.2.2024764164.1678773257&semt=ais"
          alt="no match"
        />
      </div>
      <h2 className="text-secondary">Oops! Something went wrong</h2>
      <Button
        variant="contained"
        type="button"
        className="mt-2 pr-5 pl-5"
        onClick={onClickReSearchButton}
      >
        Retry
      </Button>
    </div>
  );

  const renderSuccessView = () => (
    <ul className="list-unstyled cardsList_container ">
      {booksList.map((each) => (
        <BookItem key={each._id} bookInfo={each} />
      ))}
    </ul>
  );

  const renderInProgressView = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  );

  const renderDesicionMaking = () => {
    switch (apiResponse) {
      case apiResponseStatus.success:
        return renderSuccessView();
      case apiResponseStatus.failure:
        return <RenderFailureView failure={getResultList} />;
      case apiResponseStatus.inProgress:
        return renderInProgressView();
      default:
        return null;
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <h3>All Available Books</h3>
        <nav className="navbar navbar-light col-12 col-md-3 m-0 mb-3 mb-md-0">
          <form className="w-100">
            <div className="input-group">
              <input
                type="search"
                className="form-control p-3"
                placeholder="Search"
                onChange={(event) => setSearchInput(event.target.value)}
                value={searchInput}
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
              </div>
            </div>
          </form>
        </nav>
      </div>
      <div className="booksListContainer  mb-3">{renderDesicionMaking()}</div>
    </div>
  );
};

export default Home;
