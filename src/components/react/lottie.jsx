import Lottie from "react-lottie";

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  width = "100%",
  height = "100%",
}) => {
  const defaultOptions = {
    loop,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} />;
};

export default LottieAnimation;
