import "./Modal.css";

interface IOwnProps {
  setOpenModal: (boolean: boolean) => void;
  modalName: string;
  modalQuote: string;
}

function Modal({ setOpenModal, modalName, modalQuote }: IOwnProps) {
  return (
    <div className="overlay">
      <div className="modalContainer">
        <p className="closeBtn" onClick={() => setOpenModal(false)}>
          {" "}
          X{" "}
        </p>

        <div className="content">
          <b>Random quote from {modalName} </b>
          <p>{modalQuote}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
