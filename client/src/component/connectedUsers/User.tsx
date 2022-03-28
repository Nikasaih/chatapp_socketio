import { userType } from "../../App";

const User = (props: { user: userType }) => {
  const { username } = props.user;
  return (
    <li className="connected-user">
      <img src="/assets/user.png" alt="Unknown User" />
      <span>{username}</span>
    </li>
  );
};

export default User;
