const Greeting = ({ name, jobTitle, position }) => {
  return (
    <div className="animated-text-container">
      <h1 className="animated-text fade-slide-in">Hi There!</h1>
      <h2 className="animated-text fade-slide-in">I'm {name}</h2>
      <p className="animated-text fade-slide-in description">
        {jobTitle} | {position}
      </p>
    </div>
  );
};

export default Greeting;
