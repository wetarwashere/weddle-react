import { type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router'
import '../General.css'

type ApiData = {
  soal: string;
  jawaban: string;
}

interface QuestionPageProps {
  apiData: ApiData | null;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  checkAnswer: () => void;
  setWasWinning: Dispatch<SetStateAction<boolean>>;
}

function QuestionPage({ apiData, value, setValue, checkAnswer, setWasWinning }: QuestionPageProps) {
  const navigate = useNavigate()

  return (
    <div className='web-data'>
      <title>Question Page</title>

      <div className='input-box'>
        <h1>{apiData?.soal}</h1>
        <input className='web-input' value={value} placeholder='Masukkan tebakanmu' onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => event.key === "Enter" && checkAnswer()} autoFocus />
        <button className='web-button' onClick={(event) => {
          const buttonText = event.currentTarget.innerText

          if (buttonText === "Nyerah") {
            setWasWinning(false)
            navigate("/result")
          } else {
            checkAnswer()
          }
        }}>{value.trim() === "" ? "Nyerah" : "Jawab"}</button>
      </div>
    </div >
  )
}

export default QuestionPage
