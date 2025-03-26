const VideoEmbed = ({
  src,
  title,
  aspectRatio = "16:9",
  marginBottom = "1em",
  maxWidth = "800px",
}) => {
  const calculatePaddingBottom = () => {
    const [width, height] = aspectRatio.split(":").map(Number);
    return (height / width) * 100 + "%";
  };

  const paddingBottom = calculatePaddingBottom();

  return (
    <div className="flex justify-center" style={{ marginBottom: marginBottom }}>
      <div
        className="relative overflow-hidden rounded-lg bg-gray-dark"
        style={{
          paddingBottom: paddingBottom,
          height: 0,
          width: "100%",
          maxWidth: maxWidth,
        }}
      >
        <iframe
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default VideoEmbed;
