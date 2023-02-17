import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckUserModal from "../components/common/CheckUserModal";
import CommonLayout from "../layouts/CommonLayout";
import AuthStore from "../stores/AuthStore";

// 정보 수정
const ChangeInfo = () => {
  const [modalShow, setModalShow] = useState(true);

  const navigate = useNavigate();
  const authStore = AuthStore();

  const handleModalClose = () => {
    navigate("/my");
  };

  const modalCallback = (token) => {
    localStorage.setItem("accessToken", token.accessToken);
    authStore.setLoginUserByToken(token.accessToken);
    setModalShow(false);
  };
  if (modalShow) {
    return (
      <CheckUserModal
        modalShow={modalShow}
        modalClose={handleModalClose}
        callback={modalCallback}
      ></CheckUserModal>
    );
  }
  return <div>ChangeInfo</div>;
};

export default ChangeInfo;
