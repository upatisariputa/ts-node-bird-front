import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons";

import { RootState } from "../reducers";

import PostImages from "../components/PostImages";
import CommentForm from "../components/CommentForm";
import PostCardContents from "../components/PostCardContents";
import { postProps } from "../@types";
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST } from "../reducers/post";
import FollowButton from "./FollowButton";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const id = useSelector((state: RootState) => state.user.me?.id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images.length > 0 && <PostImages Images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onUnlike} /> : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>Edit</Button>
                    <Button danger type="primary" onClick={onRemovePost} loading={removePostLoading}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button>report</Button>
                )}
              </Button.Group>
            }>
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}>
        <Card.Meta avatar={<Avatar>{post.User.nickname.slice(0, 4)}</Avatar>} title={post.User.nickname} description={<PostCardContents postData={post.content} />} />
      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} of comments`}
            itemLayout="horizontal"
            dataSource={post.Comments}
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
