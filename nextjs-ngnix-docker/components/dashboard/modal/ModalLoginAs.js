import { Modal } from "antd";

function ModalLoginAs({ isModalLoginAs, cancelModalLoginAs }) {
  return (
    <>
      <Modal
        title="Login As"
        footer={false}
        visible={isModalLoginAs}
        onCancel={(e) => cancelModalLoginAs(e)}
        className="modalDashboard modalLoginAs"
      >
        <div>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </Modal>
    </>
  );
}

export default ModalLoginAs;
