import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import axios from 'axios'
import ResultPage from './pages/result/ResultPage'
import HomePage from './pages/home/HomePage'
import QuestionPage from './pages/question/QuestionPage'
import './App.css'

interface ApiData {
  soal: string;
  jawaban: string;
}

function App() {
  const [apiData, setApiData] = useState<ApiData>({
    jawaban: "Tunggu....",
    soal: "Tunggu sebentar....",
  })
  const getApiData = async () => {
    const response = await axios.get("https://zelapioffciall.koyeb.app/games/tekateki")
    setApiData(response.data.result)
  }
  const [value, setValue] = useState<string>("")
  const [wasWinning, setWasWinning] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const navigate = useNavigate()

  function checkAnswer() {
    if (value.trim() === "") {
      return
    }

    if (value.trim().toLowerCase() === apiData?.jawaban.toLowerCase()) {
      setWasWinning(true)
      setScore((previous) => previous + 1)
      setValue("")
      navigate("/result")
    } else {
      setWasWinning(false)
      setValue("")
      navigate("/result")
    }
  }

  useEffect(() => {
    const fetchApiData = async () => {
      await getApiData()
    }

    fetchApiData()
  }, [])

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/question' element={<QuestionPage apiData={apiData} value={value} setValue={setValue} checkAnswer={checkAnswer} setWasWinning={setWasWinning} />} />
      <Route path='/result' element={<ResultPage getApiData={getApiData} setApiData={setApiData} wasWinning={wasWinning} score={score} apiData={apiData} />} />
    </Routes>
  )
}

export default App
