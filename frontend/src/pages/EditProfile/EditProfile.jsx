const EditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-black border border-[#363636] py-6 px-8 max-w-[40%] my-8 mx-auto text-center">
      <h2 className="text-center text-[2.1em] mt-0 font-bold">
        Edite seus dados
      </h2>
      <p className="text-[#CCC]">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {/* image preview */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" className="px-2.5 py-2" />
        <input
          type="email"
          placeholder="Email"
          disabled
          className="px-2.5 py-2"
        />
        <label>
          <span>Imagem do Perfil:</span>
          <input
            type="file"
            className="block w-full border cursor-pointer border-gray-200 text-sm focus:z-10 focus:border-[#0094f6] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    dark:file:bg-neutral-700 dark:file:text-neutral-400"
          />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            className="px-2.5 py-2"
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            className="px-2.5 py-2"
          />
        </label>
        <input type="submit" value="Atualizar" className="px-2.5 py-2 mt-5" />
      </form>
    </div>
  );
};

export default EditProfile;
