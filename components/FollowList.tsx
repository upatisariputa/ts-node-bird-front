import React, { useMemo } from "react";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";

type followList = Array<followListProps>;

interface followListProps {
  nickname: string;
}

const FollowList = ({ header, data }: { header: string; data: followList }) => {
  const listStyle = useMemo(() => ({ marginBottom: 20 }), []);
  const loadMoreStyle = useMemo(() => ({ textAlign: "center", margin: "10px 0" }), []);
  const grid = useMemo(() => ({ guttur: 4, xs: 2, md: 3 }), []);

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
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
