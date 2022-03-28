type userType = { id: string; username: string };
let users: userType[] = [];
export const userJoin = ({ id, username }: userType): boolean => {
  if (usernameAlreadyTaken(username)) {
    return false;
  }
  users.push({ id, username });
  return true;
};

const usernameAlreadyTaken = (username: string): boolean => {
  const user = users.find((user) => user.username === username);
  if (user) {
    return true;
  }

  return false;
};
export const userLeave = (id: string) => {
  users = users.filter((user) => user.id !== id);
};

export const getUser = () => {
  return users;
};
