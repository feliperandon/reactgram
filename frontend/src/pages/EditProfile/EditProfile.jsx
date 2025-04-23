import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill user data form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // Update image state
    setProfileImage(image);
  };

  return (
    <div className="bg-black border border-[#363636] py-6 px-8 max-w-[40%] my-8 mx-auto text-center">
      <h2 className="text-center text-[2.1em] mt-0 font-bold">
        Edite seus dados
      </h2>
      <p className="text-[#CCC]">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {(user.profileImage || previewImage) && (
        <img
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          className="w-36 h-36 rounded-full m-auto my-5 object-cover object-center"
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
          className="px-2.5 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          disabled
          value={email || ""}
          className="px-2.5 py-2"
        />
        <label>
          <span>Imagem do Perfil:</span>
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
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
            className="px-2.5 py-2"
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            className="px-2.5 py-2"
          />
        </label>
        <input type="submit" value="Atualizar" className="px-2.5 py-2 mt-5" />
      </form>
    </div>
  );
};

export default EditProfile;
