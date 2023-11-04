import { useSelector } from "react-redux";

const CommentModal = () => {
  const openModal = useSelector((state) => state.modal.modalIsOpen);
  return (
    <div>
      <h1>Comment Modal</h1>
      {openModal && <h1>Modla is Open</h1>}
    </div>
  );
};

export default CommentModal;
