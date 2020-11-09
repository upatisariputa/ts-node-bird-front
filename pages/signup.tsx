import { useCallback, useEffect, useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { SIGN_UP_REQUEST } from "../reducers/user";
import Router from "next/router";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (signUpDone) {
      Router.replace("/");
    }
    if (signUpError) {
      alert(signUpError);
    }
    if (me && me.id) {
      Router.replace("/");
    }
  }, [signUpDone, signUpError, me && me.id]);

  // useEffect(() => {
  //   if (me && me.id) {
  //     Router.replace("/");
  //   }
  // }, [me && me.id]);

  // useEffect(() => {
  //   if (signUpDone) {
  //     Router.replace("/");
  //   }
  // }, [signUpDone]);

  // useEffect(() => {
  //   if (signUpError) {
  //     alert(signUpError);
  //   }
  // }, [signUpError]);

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);
  const onSumbmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <div>Sign up page</div>
      <Form onFinish={onSumbmit}>
        <div>
          <label htmlFor="user-email">email</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nickname">Nickname</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">password</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-email">Password Check</label>
          <br />
          <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage style={{ color: "red" }}> 비밀번호가 일치하지 않습니다. </ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            Do you agree this?
          </Checkbox>
          {termError && <ErrorMessage style={{ color: "red" }}>Agree </ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            SignIn
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};
export default Signup;
