import "./index.css";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import RenderFailureView from "../../FailureView";

const apiResponseStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

const BookItemDetails = () => {
  const [apiResponse, setApiResponse] = useState(apiResponseStatus.initial);
  const [bookDetails, setBookDetails] = useState({});

  const { id } = useParams();

  const getBookDetails = async () => {
    setApiResponse(apiResponseStatus.inProgress);

    // const url = `http://localhost:5000/book/${id}`;
    const url = `https://nowfloatsbackend-i28c.onrender.com/book/${id}`;
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
        setBookDetails(data.bookDetails);
      } else {
        setApiResponse(apiResponseStatus.failure);
      }
    } catch (error) {
      setApiResponse(apiResponseStatus.failure);
    }
  };

  useEffect(() => {
    getBookDetails();
  }, []);

  const renderSuccessView = () => {
    const { author, country, imageLink, language, pages, title } = bookDetails;
    return (
      <div className=" d-flex flex-column flex-md-row p-4 min-vh-100 ">
        <div className="col-12  col-md-5 mr-3 align-self-center h-100">
          <img className="w-100 h-100" src={imageLink} alt={title} />
        </div>
        <div>
          <p className="h2  mt-3 mb-md-4">{title}</p>
          <p className="h5">
            Author :<span className="h4 ml-4 m-0 text-secondary">{author}</span>
          </p>
          <p className="h5 m-0 mb-3">
            Country :
            <span className="h4 ml-4 m-0 text-secondary">{country}</span>
          </p>
          <p className="h5">
            Language :<span className="ml-4 h4 text-secondary">{language}</span>
          </p>
          <p className="h5">
            Pages : <span className="h4 ml-4 text-secondary">{pages}</span>
          </p>
          <p className="h5 text-secondary description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    );
  };

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
        return <RenderFailureView failure={getBookDetails} />;
      case apiResponseStatus.inProgress:
        return renderInProgressView();
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="booksListContainer  mb-3">{renderDesicionMaking()}</div>
    </div>
  );
};

export default BookItemDetails;
