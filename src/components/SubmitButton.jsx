const SubmitButton = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className='text-green-500 font-semibold bg-green-900/40 hover:bg-green-900/70 duration-300 mt-8 cursor-pointer mx-auto px-5 py-2 rounded-full border-2 border-green-500'>{text}</button>
  )
}

export default SubmitButton