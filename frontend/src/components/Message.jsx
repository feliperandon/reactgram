const Message = ({ msg, type }) => {
  const baseClass =
    "rounded px-1 py-2.5 m-0 flex items-center justify-center h-[60px]";
  const typeClass =
    type === "error"
      ? "text-[#721c24] bg-[#f8d7da] border border-[#f5c6cb]"
      : "text-[#155724] bg-[#d4edda] border border-[#c3e6cb]";

  return (
    <div className={`${baseClass} ${typeClass}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
