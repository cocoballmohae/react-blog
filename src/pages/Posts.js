import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardGroup, Container } from "react-bootstrap";
import MyCard from "../components/common/MyCard";
import CommonLayout from "../layouts/CommonLayout";
import { customAxios } from "../utils/CustomAxios";

// 글 목록
const Posts = () => {
  const [post, setPost] = useState([]);

  const getPost = () => {
    customAxios
      .publicAxios({
        method: "get",
        url: "/v1/api/post",
      })
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data.content);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.detail != null) {
          alert(JSON.stringify(error?.response?.data?.detail));
        } else {
          alert("알 수 없는 오류");
        }
      })
      .finally(() => {});
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <CommonLayout>
      <Container>
        <CardGroup>
          {post.map((post, index) => (
            <MyCard key={index} post={post} />
          ))}
        </CardGroup>
      </Container>
    </CommonLayout>
  );
};

export default Posts;
