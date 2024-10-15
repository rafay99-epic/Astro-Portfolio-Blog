const ProfileImage = ({ picture }) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="animate-random-blob"></div>
      <img
        src={picture}
        alt="Profile Image"
        className="relative z-10 w-[26rem] h-[26rem] rounded-full object-cover shadow-2xl"
      />
    </div>
  );
};

export default ProfileImage;
