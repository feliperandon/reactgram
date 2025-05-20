import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

// components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

// redux
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // load photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  // like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="w-[50%] my-0 mx-auto pt-8">
      <h2 className="text-center text-3xl mb-8">
        Você está buscando por: <span className="font-bold">{search}</span>
      </h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link
              to={`/photos/${photo._id}`}
              className="block max-w-[90px] text-center mt-2 mb-8 bg-[#0094f6] text-white border-none rounded-xs px-2 py-2 font-bold text-base cursor-pointer opacity-80  hover:opacity-100"
            >
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="text-center">Ainda não há fotos publicadas</h2>
      )}
    </div>
  );
};

export default Search;
