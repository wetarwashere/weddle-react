import { useNavigate } from 'react-router'
import type { Dispatch, SetStateAction } from 'react'
import '../General.css'
import './ResultPage.css'

type ApiData = {
  soal: string;
  jawaban: string;
}

interface ResultPageProps {
  getApiData: () => Promise<void>;
  setApiData: Dispatch<SetStateAction<ApiData | null>>;
  wasWinning: boolean;
  score: number;
  apiData: ApiData | null
}

function ResultPage({ getApiData, setApiData, wasWinning, score, apiData }: ResultPageProps) {
  const navigate = useNavigate()

  function getBack() {
    navigate("/question")
    setApiData((previous) => {
      if (!previous) return previous

      return {
        ...previous,
        soal: "Tunggu sebentar...",
        jawaban: "Tunggu...."
      }
    })
    getApiData()
  }

  return (
    <>
      <title>Result Page</title>

      <div>
        <h1>{wasWinning ? "Jawabanmu benar, selamat" : "Jawabanmu salah, coba lagi"}</h1>
        <button onClick={getBack}>Coba lagi</button>
        <h1 className='web-score'>Score: {score}</h1>
        <h1 className='answer-text'>{!wasWinning && apiData?.jawaban}</h1>
      </div>
    </>
  )
}

export default ResultPage
