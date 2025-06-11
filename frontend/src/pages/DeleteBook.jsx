import { useState, useEffect } from "react";
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const navigate = useNavigate()
  const { id } = useParams();
  

  useEffect(() => {
    setLoading(true)
    axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`)
    .then(response => {
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    })
  }, [])

  const handleDeleteBook = () => {
    setLoading(true)
    axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}`)
    .then(response => {
      console.log(response)
      setLoading(false)
      navigate('/')
    })
    .catch(err => {
      setLoading(false)
      alert('error has occured please check console')
      console.log(err)
    })
  }

  return (
    <div className="p-4">
      <BackButton destination={'/'}/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <div className="flex flex-col text-xl text-gray-500">
            <h2>{title}</h2>
            <h2>{author}</h2>
            <h2>{publishYear}</h2>
        </div>
        <button 
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook
