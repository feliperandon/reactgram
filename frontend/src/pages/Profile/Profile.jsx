import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from "../../slices/userSlice";
import { publishPhoto, resetMessage } from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // new form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setImage(image);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photos", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="w-[50%] my-0 mx-auto">
      <div className="flex items-center flex-wrap p-4 mb-2 border-b border-[#363636]">
        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
            className="w-[100px] h-[100px] rounded-[50%] mr-8"
          />
        )}
        <div>
          <h2 className="pb-4 font-bold text-2xl">{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div ref={newPhotoForm}>
            <h3 className="font-bold mb-2">Compartilhe algum momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para foto</span>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                  placeholder="Insira um título"
                  className="px-2.5 py-2"
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input
                  type="file"
                  onChange={handleFile}
                  className="block w-full border cursor-pointer border-gray-200 text-sm focus:z-10 focus:border-[#0094f6] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white
                file:bg-gray-50 file:border-0
                file:me-4
                file:py-3 file:px-4
                dark:file:bg-[#0094f6] dark:opacity-80 dark:hover:opacity-100 dark:file:text-white"
                />
              </label>
              {!loadingPhoto && (
                <input
                  type="submit"
                  value="Postar"
                  className="px-2.5 py-2 mt-5"
                />
              )}
              {loadingPhoto && (
                <input
                  type="submit"
                  value="Aguarde..."
                  className="px-2.5 py-2 mt-5"
                  disabled
                />
              )}
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
    </div>
  );
};

export default Profile;
