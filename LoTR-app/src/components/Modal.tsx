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
    <div>
      <div className="modalBackdrop" onClick={() => setModalData(null)}></div>
      <div className="modalContainer">
        <p className="closeBtn" onClick={() => setModalData(null)}>
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
