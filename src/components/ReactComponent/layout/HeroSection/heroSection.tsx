import Greeting from "@react/layout/HeroSection/Greeting";
import ConnectButton from "@react/layout/HeroSection/ConnectButton";
import ProfileImage from "@react/layout/HeroSection/ProfileImage";

const HeroSection = ({ name, jobTitle, position, picture }) => {
  return (
    <section>
      <div className="main-container">
        <div className="side-by-side-containers">
          <div className="left-container">
            <Greeting name={name} jobTitle={jobTitle} position={position} />
            <ConnectButton />
          </div>
          <div className="right-container">
            <ProfileImage picture={picture} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
