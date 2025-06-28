import type { ImageSliderProps } from "../../../../../types/image_slider";
import { ImageSliderUI } from "./components/ImageSliderUI";

const ImageSlider = (props: ImageSliderProps) => {
  return <ImageSliderUI {...props} />;
};

export default ImageSlider;
