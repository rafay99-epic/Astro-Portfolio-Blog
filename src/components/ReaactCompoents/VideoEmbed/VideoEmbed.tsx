const VideoEmbed = ({ src, title, width = "100%", height = "400px" }) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg  bg-gray-dark"
      style={{
        paddingBottom: "56.25%",
        height: 0,
      }}
    >
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
        style={{
          width: width,
          height: height,
        }}
      />
    </div>
  );
};

export default VideoEmbed;
