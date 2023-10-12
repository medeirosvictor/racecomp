

const Modal = ({ children, title }) => {
  return (
    <>
      <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>
        Open Modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-3/5 w-120 flex flex-col">
          <h3 className="font-bold text-lg">{title}</h3>
          <form method="dialog" className="flex flex-row justify-center content-center items-center self-center">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div className="w-full mb-3 content-center justify-center">
              {children}
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Modal;