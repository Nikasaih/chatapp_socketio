const EnterUsername = (props: {
  myUsername: string;
  setMyUsername: Function;
  handleConnection: Function;
}) => {
  const { myUsername, setMyUsername, handleConnection } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleConnection();
      }}
    >
      <input
        type="text"
        value={myUsername}
        onChange={(e) => setMyUsername(e.target.value)}
        placeholder="Enter your username ..."
        required={true}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
export default EnterUsername;
