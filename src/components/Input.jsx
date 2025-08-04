const Input = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <p>{label}</p>
      <input {...props} className={`bg-white rounded-md border text-gray-600 py-1 px-2`} />
    </div>
  )
}

export default Input