import React, { useRef } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import LogoImg from "../assets/logo.png";
import CommonLayout from "../layouts/CommonLayout";

// 회원가입
const Join = () => {
  // Array.from 한 배열을 반복으로 돌릴때 빈 ref를 할당
  const refs = useRef({
    idElement: null,
    pwElement: null,
    pw2Element: null,
    simpleDescElement: null,
  });

  const requestJoin = () => {
    const { idElement, pwElement, pw2Element, simpleDescElement } =
      refs.current;
    console.log(idElement.value);
    console.log("회원가입 요청");
  };
  //순수 리액트 훅스 x
  // const qs = useLocation();
  // console.log(qs);
  // const arr = qs.search.split("?"); // [dddd,name=1&data=a]
  // console.log("arr", arr);
  // const arr2 = arr[1].split("&"); // [name=a, data=1]
  // console.log("arr2", arr2);
  // const name = arr2[0].split("=");
  // console.log("name", name);

  // const [searchParams, setSearchParams] = useSearchParams();

  // const name = searchParams.get("name");
  // const data = searchParams.get("data");
  // console.log("name", name);
  // console.log("data", data);

  return (
    <div>
      <CommonLayout />
      <Card style={{ borderRadius: "1rem" }}>
        <Card.Body>
          <h3>
            <img src={LogoImg} style={{ height: "100px" }} />
          </h3>
          {/* 아이디, 비밀번호, 소개 */}
          <InputGroup className='mb-3'>
            <InputGroup.Text id='idAddOn'>아이디</InputGroup.Text>
            <Form.Control
              ref={(r) => (refs.current.idElement = r)}
              type='text'
              placeholder='아이디를 입력해주세요.'
            />
          </InputGroup>

          {/* DB 가로줄 row 세로줄 column */}
          <Row>
            <Col>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='pwAddOn'>비밀번호</InputGroup.Text>
                <Form.Control
                  ref={(r) => (refs.current.pwElement = r)}
                  type='password'
                  placeholder='비밀번호를 입력해주세요.'
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='pw2AddOn'>비번확인</InputGroup.Text>
                <Form.Control
                  ref={(r) => (refs.current.pw2Element = r)}
                  type='password'
                  placeholder='비밀번호를 다시 입력해주세요.'
                />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='simpleDescAddOn'>한줄소개</InputGroup.Text>
            <Form.Control
              ref={(r) => (refs.current.simpleDescElement = r)}
              type='text'
              placeholder='자신을 소개할 말을 써주세요.'
            />
          </InputGroup>
          <Button
            variant='primary'
            style={{ width: "100%" }}
            onClick={requestJoin}
          >
            회원가입
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Join;
