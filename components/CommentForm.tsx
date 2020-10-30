import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import { postProps } from "../@types";
import { RootState } from "../reducers";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }: { post: postProps }) => {
  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.user.me?.id);
  const { addCommentDone } = useSelector((state: RootState) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  const onSubmitComment = useCallback(() => {
    dispatch({ type: ADD_COMMENT_REQUEST, postId: post.id, userId: id });
  }, [commentText, id]);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

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
