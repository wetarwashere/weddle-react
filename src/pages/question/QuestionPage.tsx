import React, { useRef, type Dispatch, type SetStateAction } from 'react'
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

function QuestionPage({ apiData, value, setValue, checkAnswer }: QuestionPageProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const navigate = useNavigate()

  function surrender() {
    navigate("/result")
  }

  function inputKeyHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return

    if (buttonRef.current?.textContent === "Nyerah") {
      surrender()
    } else {
      checkAnswer()
    }
  }

  function submitHandler() {
    if (buttonRef.current?.textContent === "Nyerah") {
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
        <button className='web-button' ref={buttonRef} onClick={submitHandler}>{value.trim() === "" ? "Nyerah" : "Jawab"}</button>
      </div>
    </div >
  )
}

export default QuestionPage
