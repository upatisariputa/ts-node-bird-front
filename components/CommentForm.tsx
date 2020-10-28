import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import { postProps } from "../@types";
import { RootState } from "../reducers";

const CommentForm = ({ post }: { post: postProps }) => {
  const [commentText, setCommentText] = useState("");

  const onSubmitComment = useCallback(() => {
    console.log(commentText);
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <Button style={{ position: "absolute", right: 0, bottom: -40 }} type="primary" htmlType="submit">
          Twit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
