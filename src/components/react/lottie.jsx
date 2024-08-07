import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/rafay_animation.json";

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} />;
};

export default LottieAnimation;
