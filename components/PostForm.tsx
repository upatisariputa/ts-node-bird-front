import React, { useCallback, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { RootState } from "../reducers";
import { addPost } from "../reducers/post";

interface Props {}

const PostForm = (props: Props) => {
  const { imagePaths } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="What's going on Twice!" />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>Image Upload</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          Twitling Twit
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} alt={v} style={{ width: "200px", height: "200px" }} />
            <div>
              <Button>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
