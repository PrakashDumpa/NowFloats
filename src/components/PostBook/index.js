import "./index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Loader from "react-loader-spinner";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";

const apiResponseStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

const PostBook = () => {
  const [apiResponse, setApiResponse] = useState(apiResponseStatus.initial);
  const [bookTitle, setBookTitile] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [language, setLanguage] = useState("");
  const [image, setImage] = useState();
  const [inputImage, setInputImage] = useState();

  const [open, setOpen] = useState(false);

  const onClickAddButton = async (event) => {
    event.preventDefault();

    if (image === undefined) {
      return;
    }

    setApiResponse(apiResponseStatus.inProgress);
    setOpen(true);

    // const url = "http://localhost:5000/book/upload";
    const url = "https://nowfloatsbackend-i28c.onrender.com/book/upload";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: authorName,
        title: bookTitle,
        imageLink: inputImage,
        country: countryName,
        language,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        setApiResponse(apiResponseStatus.success);
      } else {
        setApiResponse(apiResponseStatus.failure);
      }
      setAuthorName("");
      setBookTitile("");
      setCountryName("");
      setInputImage();
      setLanguage("");
      setImage();
    } catch (error) {
      setApiResponse(apiResponseStatus.failure);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    setImage(file);
    const decodedFile = await convertToBase64(file);
    setInputImage(decodedFile);
  };

  const renderSuccessView = () => (
    <div className="dialogParent p-5">
      <p className="text-info h4">Book Successfully UpLoaded</p>
    </div>
  );

  const renderFailureView = () => (
    <p className="text-danger h4">Book is not UpLoaded</p>
  );

  const renderInProgressView = () => (
    <div className="d-flex justify-content-center align-items-center loadingContainer">
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={50}
        width={50}
        className="loadingContainer"
      />
    </div>
  );

  const renderUIBasedOnApi = () => {
    switch (apiResponse) {
      case apiResponseStatus.success:
        return renderSuccessView();
      case apiResponseStatus.inProgress:
        return renderInProgressView();
      case apiResponseStatus.failure:
        return renderFailureView();
      default:
        return <></>;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderModal = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        {renderUIBasedOnApi()}
      </Dialog>
    );
  };

  const renderFileName = () => {
    if (image.name.length > 40) {
      return (
        <div className="w-100">
          <p>{image.name.slice(0, 40)}...</p>
        </div>
      );
    }
    return <p> {image.name}</p>;
  };

  const UploadButtons = () => (
    <>
      <Stack direction="row" alignItems="center" spacing={2} className="mt-3">
        <Button variant="contained" component="label">
          Upload
          <input accept="image/*" hidden type="file" onChange={uploadImage} />
        </Button>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input accept="image/*" hidden type="file" onChange={uploadImage} />
          <PhotoCamera />
        </IconButton>
      </Stack>
      {image !== undefined && renderFileName()}
    </>
  );

  return (
    <div className="addBookContainer w-100 d-flex justify-content-center align-items-center mb-4 p-3 p-md-0">
      <form
        className="col-12 col-md-4 addBook_form_container pt-md-3 pb-md-4 pl-md-5 pr-md-5 p-3"
        onSubmit={onClickAddButton}
      >
        <h1 className="text-center">Add Book</h1>

        <TextField
          id="outlined-basic1"
          label="Book Title"
          variant="outlined"
          className="w-100 mt-3"
          required
          onChange={(event) => setBookTitile(event.target.value)}
          value={bookTitle}
        />

        <TextField
          id="outlined-basic2"
          label="Author Name"
          variant="outlined"
          required
          className="w-100 mt-3"
          onChange={(event) => setAuthorName(event.target.value)}
          value={authorName}
        />

        <TextField
          id="outlined-basic3"
          label="Country"
          variant="outlined"
          className="w-100 mt-3"
          required
          onChange={(event) => setCountryName(event.target.value)}
          value={countryName}
        />

        <TextField
          id="outlined-basic4"
          label="Language"
          variant="outlined"
          required
          className="w-100 mt-3"
          onChange={(event) => setLanguage(event.target.value)}
          value={language}
        />

        {UploadButtons()}
        <div className=" d-flex justify-content-end">
          <Button
            variant="contained"
            type="submit"
            className="mt-2 pr-5 pl-5 bg-success"
          >
            Add
          </Button>
        </div>
      </form>
      {renderModal()}
    </div>
  );
};

export default PostBook;
