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
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

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

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // new form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setImage(image);
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
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

    resetComponentMessage();
  };

  // delete a photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
  };

  // show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hidden");
    editPhotoForm.current.classList.toggle("hidden");
  };

  // update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hidden")) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleCancelEdit = (e) => {
    hideOrShowForms();
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
          <div ref={editPhotoForm} className="hidden">
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Insira um novo título"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
                className="px-2.5 py-2 mt-2"
              />
              <input
                type="submit"
                value="Atualizar"
                className="px-2.5 py-2 mt-5"
              />
              <button
                onClick={handleCancelEdit}
                className="px-2.5 py-2 mb-5 bg-gray-500"
              >
                Cancelar edição
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div>
        <h2>Fotos publicadas:</h2>
        <div className="flex flex-wrap">
          {Array.isArray(photos) &&
            photos.map((photo) => (
              <div key={photo._id} className="w-[32%] m-[0.3%] mb-3">
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                    className="w-full"
                  />
                )}
                {id === userAuth._id ? (
                  <div className="flex justify-around p-2.5 mt-2">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill
                      className="cursor-pointer"
                      onClick={() => handleEdit(photo)}
                    />
                    <BsXLg
                      className="cursor-pointer"
                      onClick={() => handleDelete(photo._id)}
                    />
                  </div>
                ) : (
                  <Link to={`/photos/${photo._id}`}>Ver</Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
