import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
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
  return (
    <CommonLayout>
      <Card className='shadow-2-strong' style={{ borderRadius: "1rem" }}>
        <Card.Body className='p-5 text-center'>
          <h2 className='mb-3'>내 정보 수정</h2>
          <div className='d-flex justify-content-center'>
            <span>
              <Image
                src={authStore.loginUser.profileImage}
                className='ratio rounded-circle'
                style={{ width: "100px", height: "100px" }}
                alt='profile'
              />
              <Form.Control
                type='file'
                accept='image/*'
                className='mb-3 mt-3'
                style={{ width: "100px" }}
              />
            </span>
          </div>
          <InputGroup className='mb-3'>
            <InputGroup.Text>아이디</InputGroup.Text>
            <Form.Control
              defaultValue={authStore.loginUser.id}
              type='text'
              disabled
            />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup className='mb-3'>
                <InputGroup.Text>비밀번호</InputGroup.Text>
                <Form.Control type='password' />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className='mb-3'>
                <InputGroup.Text>비밀번호 확인</InputGroup.Text>
                <Form.Control type='password' />
              </InputGroup>
            </Col>
          </Row>

          <InputGroup className='mb-3'>
            <InputGroup.Text>한줄소개</InputGroup.Text>
            <Form.Control
              type='text'
              defaultValue={authStore.loginUser.simpleDesc}
            />
          </InputGroup>
          <Row>
            <Col>
              <Button
                variant='outline-danger'
                type='button'
                style={{ width: "200px" }}
              >
                취소
              </Button>
            </Col>
            <Col>
              <Button
                variant='outline-success'
                type='button'
                style={{ width: "200px" }}
              >
                수정
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </CommonLayout>
  );
};

export default ChangeInfo;
