import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

type followList = Array<followListProps>;

interface followListProps {
  nickname: string;
}

const Profile = () => {
  const followingList: followList = [{ nickname: "upati" }, { nickname: "sitarua" }, { nickname: "ananda" }];
  const followerList: followList = [{ nickname: "upati" }, { nickname: "sitarua" }, { nickname: "ananda" }];

  return (
    <>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="following List" data={followingList} />
        <FollowList header="follower List" data={followerList} />
      </AppLayout>
    </>
  );
};
export default Profile;
