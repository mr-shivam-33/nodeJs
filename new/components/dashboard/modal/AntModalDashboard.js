import React, { useEffect, useState } from "react";
import { Modal } from "antd";

function AntModalDashboard({ modalDashboard }) {
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setIsModal(modalDashboard);
  }, [modalDashboard]);

  const onCancelClick = () => {
    setIsModal(false);
  };
  // console.log(isModal, "========isModal");
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModal}
        onCancel={onCancelClick}
        footer={null}
        className="modalDashboard"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default AntModalDashboard;
