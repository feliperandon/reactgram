import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className="flex items-center border-t border-[#363636] border-b py-3 mt-3">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill className="text-2xl cursor-pointer" />
          ) : (
            <BsHeart
              onClick={() => handleLike(photo)}
              className="text-2xl cursor-pointer"
            />
          )}
          <p className="ml-4">{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
