const SubmitButton = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className='bg-green-500 mt-8 cursor-pointer mx-auto block text-white px-5 py-2 rounded-md hover:bg-green-600'>{text}</button>
  )
}

export default SubmitButton