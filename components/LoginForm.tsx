import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";

import useInput from "../hooks/useInput";
import { loginAction } from "../reducers/user";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();

  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(
    (e) => {
      console.log(id, password);
      dispatch(loginAction({ id, password }));
    },
    [id, password]
  );

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required></Input>
      </div>
      <div>
        <label htmlFor="user-password">Password</label>
        <br />
        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required></Input>
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          Login
        </Button>
        <Link href="/signup">
          <a>
            <Button>Join MemberShip</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
