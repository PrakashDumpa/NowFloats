import "./index.css";
import Button from "@mui/material/Button";

const RenderFailureView = (props) => {
  const onClickRetryButton = () => {
    props.failure();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center">
        <img
          className="w-50"
          src="https://img.freepik.com/free-vector/computer-repair-illustration_1284-64457.jpg?w=4096&t=st=1679889736~exp=1679890336~hmac=eecd69540d2d29119ffd2b571acedc96b5fdebfb7973792a9fa306fbf2e04f0e"
          alt="failure view"
        />
      </div>
      <h2 className="text-secondary">Oops! Something went wrong</h2>
      <Button
        variant="contained"
        type="button"
        className="mt-2 pr-5 pl-5"
        onClick={onClickRetryButton}
      >
        Retry
      </Button>
    </div>
  );
};

export default RenderFailureView;
