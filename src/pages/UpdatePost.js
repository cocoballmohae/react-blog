import { Editor } from "@toast-ui/react-editor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import WriteLayout from "../layouts/WriteLayout";
import ExitImg from "../assets/exit.svg";
import AuthStore from "../stores/AuthStore";
import { customAxios } from "../utils/CustomAxios";
// 글 수정
const UpdatePost = () => {
  const [editorHeight, setEditorHeight] = useState(0);

  const refs = useRef({
    title: null,
    editor: null,
  });

  const params = useParams();
  const postIdx = params.idx;
  const authStore = AuthStore();
  const navigate = useNavigate();

  const getPost = useCallback(() => {
    if (isNaN(postIdx)) {
      alert("잘못된 접근입니다.");
      return;
    }

    customAxios
      .privateAxios({
        method: "get",
        url: `/v1/api/post/${postIdx}`,
      })
      .then((response) => {
        if (response.status === 200) {
          refs.current.title.value = response.data.content.title;
          refs.current.editor
            .getInstance()
            .setMarkdown(response.data.content.content);
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
  }, []);

  const validateFields = () => {
    const titleElement = refs.current.title.value;
    const content = refs.current.editor.getInstance().getMarkdown();

    if (titleElement === "") {
      alert("제목을 입력하세요.");
      return false;
    }

    if (content === "") {
      alert("내용을 입력하세요.");
      return false;
    }

    return true;
  };

  const updatePost = () => {
    // 밸리데이션 체크
    if (!validateFields) {
      return;
    }

    const titleElement = refs.current.title.value;
    const content = refs.current.editor.getInstance().getMarkdown();

    const markdownImageRegex = /\[.*\]\((.*)\)/gi;
    const markdownRegex = /(\*|_|#|`|~|>|!|\[|\]|\(|\)|\{|\}|\||\\)/gi;

    const summary = content
      .replace(markdownImageRegex, "")
      .replace(markdownRegex, "")
      .substring(0, 151);

    const imageList = content.match(markdownImageRegex);
    const thumbnailMarkdown = imageList != null ? imageList[0] : null;

    const thumbnail = thumbnailMarkdown
      ? thumbnailMarkdown.substring(
          thumbnailMarkdown.indexOf("](") + 2,
          thumbnailMarkdown.length - 1
        )
      : null;

    const post = {
      title: titleElement,
      thumbnail: thumbnail,
      content: content,
      summary: summary,
    };

    customAxios
      .privateAxios({
        method: "post",
        url: `/v1/api/post/update/${postIdx}`,
        data: post,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("수정에 성공했습니다.");
          navigate(`/post/${postIdx}`);
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
    refs.current.editor.getInstance().setMarkdown("");
    setEditorHeight(`${window.innerHeight - 200}px`);

    window.addEventListener("resize", () =>
      setEditorHeight(`${window.innerHeight - 200}px`)
    );
  }, []);

  useEffect(() => {
    if (authStore.loginUser === null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    getPost();
  }, [authStore, navigate]);

  return (
    <CommonLayout>
      <WriteLayout>
        <Row>
          <Col>
            <Form.Control
              ref={(r) => (refs.current.title = r)}
              className='border-0 fs-1 mt-3'
              type='text'
              placeholder='제목을 입력하세요.'
            />
          </Col>
        </Row>
        <Editor
          ref={(r) => (refs.current.editor = r)}
          previewStyle='vertical'
          initialEditType='markdown'
          height={editorHeight}
        />
        <Row className='fixed-bottom p-3 bg-white shadow-lg row'>
          <Col className='col-auto'>
            <Link to={-1}>
              <Image src={ExitImg} className='text-dark' />
              <span className='m-2'>나가기</span>
            </Link>
          </Col>
          <Col className='col-auto'>
            <Button
              variant='outline-success'
              type='button'
              onClick={updatePost}
            >
              수정하기
            </Button>
          </Col>
        </Row>
      </WriteLayout>
    </CommonLayout>
  );
};

export default UpdatePost;
