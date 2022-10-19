import "./Modal.css";

export interface IModalData {
  modalName: string;
  modalQuote: string;
}
interface IOwnProps {
  modalData: IModalData;
  setModalData: React.Dispatch<any>; //Spør Andreas om type-greier her
}

function Modal({ modalData, setModalData }: IOwnProps) {
  return (
    <div className="overlay">
      <div className="modalContainer">
        <p
          className="closeBtn"
          onClick={() =>
            //Spør Andreas om disse greiene
            setModalData(null)
          }
        >
          X
        </p>

        <div className="content">
          <b>Random quote from {modalData.modalName} </b>
          <p>{modalData.modalQuote}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
