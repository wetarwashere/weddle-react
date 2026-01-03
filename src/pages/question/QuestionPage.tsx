import React, { useState, type Dispatch, type SetStateAction } from 'react'
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
  const [buttonText, setButtonText] = useState("Nyerah")
  const [inputKey, setInputKey] = useState<string | null>(null)
  const navigate = useNavigate()

  function surrender() {
    setWasWinning(false)
    navigate("/result")
  }

  function inputKeyHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    const currentKey = event.key

    setInputKey(currentKey)

    if (currentKey !== "Enter") return

    if (buttonText === "Nyerah") {
      surrender()
    } else {
      checkAnswer()
    }
  }

  function submitHandler(event: React.MouseEvent<HTMLButtonElement>) {
    const currentText = event.currentTarget.innerText

    setButtonText(currentText)

    if (buttonText === "Nyerah") {
      surrender()
    } else {
      checkAnswer()
    }
  }

  return (
    <div className='web-data'>
      <title>Question Page</title>

      <div className='input-box'>
        <h1>{apiData?.soal}</h1>
        <input className='web-input' value={value} placeholder='Masukkan tebakanmu' onChange={(event) => setValue(event.target.value)} onKeyDown={inputKeyHandler} autoFocus />
        <button className='web-button' onClick={submitHandler}>{value.trim() === "" ? "Nyerah" : "Jawab"}</button>
      </div>
    </div >
  )
}

export default QuestionPage
