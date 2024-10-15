const ConnectButton = () => {
  return (
    <div className="animated-text fade-slide-in social-links-container">
      <button
        className="animated-text fade-slide-in connect-button"
        onClick={() => (window.location.href = "/contact-me")}
      >
        Connect with Me
      </button>
    </div>
  );
};

export default ConnectButton;
