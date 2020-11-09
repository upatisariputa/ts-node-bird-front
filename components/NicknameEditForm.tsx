import React, { useCallback, useEffect, useMemo } from "react";
import { Form, Input } from "antd";
import { RootState } from "../reducers";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

const NicknameEditForm = () => {
  const style = useMemo(() => ({ marginBottom: "20px", border: "1px solid #d9d9d9", padding: "20px" }), []);

  const { me, changeNicknameDone } = useSelector((state: RootState) => state.user);
  const [nickname, onChangeNickname, setNicknameText] = useInput(me?.nickname || "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  useEffect(() => {
    if (changeNicknameDone) {
      setNicknameText("");
    }
  }, [changeNicknameDone]);

  return (
    <Form style={style}>
      <Input.Search value={nickname} onChange={onChangeNickname} addonBefore="Nickname" enterButton="Edit" onSearch={onSubmit} />
    </Form>
  );
};

export default NicknameEditForm;
