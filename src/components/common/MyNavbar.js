import React from "react";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

const MyNavbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar>
        <Container>
          <Link to={"/"}>
            <Image src={LogoImg} style={{ height: "40px" }} />
          </Link>

          <Button
            variant='success'
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Button>

          <Button
            variant='success'
            onClick={() => {
              navigate("/join");
            }}
          >
            회원가입
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;