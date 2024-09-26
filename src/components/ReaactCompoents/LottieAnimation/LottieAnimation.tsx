import Lottie from "react-lottie";
import type { FC } from "react";

// Define the props type
interface LottieAnimationProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  width?: string | number;
  height?: string | number;
}

const LottieAnimation: FC<LottieAnimationProps> = ({
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

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;
