import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";

import useInput from "../hooks/useInput";
import { RootState } from "../reducers";
import { postProps } from "../@types";

import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  console.log("콘텐츠폼", post);
  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state: RootState) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, userId: id, postId: post.id },
    });
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
        <Button style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }} type="primary" htmlType="submit" loading={addCommentLoading}>
          Twit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
