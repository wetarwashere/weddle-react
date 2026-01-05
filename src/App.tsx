import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import axios from 'axios'
import ResultPage from './pages/result/ResultPage'
import HomePage from './pages/home/HomePage'
import QuestionPage from './pages/question/QuestionPage'
import './App.css'

type ApiData = {
  soal: string;
  jawaban: string;
}

function App() {
  const [apiData, setApiData] = useState<ApiData | null>({
    jawaban: "Jawaban....",
    soal: "Tunggu sebentar....",
  })
  const getApiData = async (): Promise<void> => {
    const response = await axios.get("https://zelapioffciall.koyeb.app/games/tekateki")
    setApiData(response.data.result)
  }
  const [value, setValue] = useState<string>("")
  const [wasWinning, setWasWinning] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const navigate = useNavigate()

  function checkAnswer(): void {
    const inputValue: string = value.trim().toLowerCase()
    const answerData: string | null = apiData ? apiData.jawaban.trim().toLowerCase() : ""

    if (inputValue === "") {
      return
    }

    if (inputValue === answerData) {
      setWasWinning(true)
      setScore((previous) => previous + 1)
      navigate("/result")
    } else {
      setWasWinning(false)
      setScore((previous) => previous > 0 ? previous - 1 : previous)
      navigate("/result")
    }
  }

  useEffect(() => {
    const fetchApiData = async (): Promise<void> => {
      await getApiData()
    }

    fetchApiData()
  }, [])

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/question' element={<QuestionPage apiData={apiData} value={value} setValue={setValue} checkAnswer={checkAnswer} setWasWinning={setWasWinning} />} />
      <Route path='/result' element={<ResultPage getApiData={getApiData} setApiData={setApiData} setValue={setValue} wasWinning={wasWinning} score={score} apiData={apiData} />} />
    </Routes>
  )
}

export default App
