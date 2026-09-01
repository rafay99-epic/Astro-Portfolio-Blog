import { domAnimation, LazyMotion } from "framer-motion";
import type { ImageSliderProps } from "types/image_slider";
import { ImageSliderUI } from "./components/ImageSliderUI";

const ImageSlider = (props: ImageSliderProps) => {
	return (
		<LazyMotion features={domAnimation}>
			<ImageSliderUI {...props} />
		</LazyMotion>
	);
};

export default ImageSlider;
