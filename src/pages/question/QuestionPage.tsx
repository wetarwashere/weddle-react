import { type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router'
import '../General.css'

type ApiData = {
  soal: string;
  jawaban: string;
}

function QuestionPage({ apiData, value, setValue, checkAnswer, setWasWinning }: { apiData: ApiData, value: string, setValue: Dispatch<SetStateAction<string>>, checkAnswer: () => void, setWasWinning: Dispatch<SetStateAction<boolean>> }) {
  const navigate = useNavigate()

  return (
    <div className='web-data'>
      <title>Question Page</title>

      <div className='input-box'>
        <h1>{apiData?.soal}</h1>
        <input className='web-input' value={value} placeholder='Masukkan tebakanmu' onChange={(event) => setValue(event.target.value)} autoFocus />
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
