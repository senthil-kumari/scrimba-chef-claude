import ReactDOM from "react-dom";
import "../index.css";

export const SpinnerOverlay = ({ isLoading }) => {
  if (!isLoading) return null;
  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="spinner"></div>
    </div>,
    document.body
  );
};
