const Home = ({ signOutHandle }) => {
  return (
    <div className="container">
      <h1>Successfully Login!</h1>

      <img
        src="https://i.pinimg.com/originals/5b/54/39/5b543923641d0ef1df257706e19ee255.gif"
        alt="Ship is floating"
      />

      <button onClick={() => signOutHandle()}>Sign Out</button>
    </div>
  );
};

export default Home;
