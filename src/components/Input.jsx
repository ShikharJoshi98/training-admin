const Input = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-white">{label}</p>
      <input {...props} className={`bg-black/40 rounded-md border text-white/80 py-1 px-2`} />
    </div>
  )
}

export default Input