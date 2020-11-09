import React, { useMemo } from "react";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UN_FOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";

type followList = Array<followListProps>;

interface followListProps {
  id: number;
  nickname: string;
}

const FollowList = ({ header, data }: { header: string; data: followList }) => {
  const listStyle = useMemo(() => ({ marginBottom: 20 }), []);
  const loadMoreStyle = useMemo(() => ({ textAlign: "center", margin: "10px 0" }), []);
  const grid = useMemo(() => ({ guttur: 4, xs: 2, md: 3 }), []);
  const dispatch = useDispatch();

  const onCancel = (id) => () => {
    // 반복문 안에서는 고차 함수를 사용
    if (header === "following List") {
      dispatch({
        type: UN_FOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  console.log("팔로리스트", data);
  return (
    <List
      style={listStyle}
      grid={grid}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>Read More</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
