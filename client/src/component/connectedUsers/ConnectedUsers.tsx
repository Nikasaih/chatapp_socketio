import User from "./User";

const ConnectedUsers = (props: {
  connectedUsers: { id: string; username: string }[];
}) => {
  const { connectedUsers } = props;

  return (
    <div className="connected-users">
      <h2>Connected Users</h2>
      <ul>
        {connectedUsers.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </ul>
    </div>
  );
};

export default ConnectedUsers;
