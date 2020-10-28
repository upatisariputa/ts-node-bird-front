import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons";

import { RootState } from "../reducers";

import PostImages from "../components/PostImages";
import CommentForm from "../components/CommentForm";
import PostCardContents from "../components/PostCardContents";
import { postProps } from "../@types";

const PostCard = ({ post }: { post: postProps }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpend, setCommentFormOpend] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
  }, []);

  const id = useSelector((state: RootState) => state.user.me?.id);

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images.length > 0 && <PostImages Images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onToggleLike} /> : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>Edit</Button>
                    <Button type="dashed">Delete</Button>
                  </>
                ) : (
                  <Button>report</Button>
                )}
              </Button.Group>
            }>
            <EllipsisOutlined />
          </Popover>,
        ]}>
        <Card.Meta avatar={<Avatar>{post.User.nickname}</Avatar>} title={post.User.nickname} description={<PostCardContents postData={post.content} />} />
      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Commnets.length} of comments`}
            itemLayout="horizontal"
            dataSource={post.Commnets}
            renderItem={(item: postProps) => (
              <li>
                <Comment author={item.User.nickname} avatar={<Avatar>{item.User.nickname[0]}</Avatar>} content={item.content} />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
