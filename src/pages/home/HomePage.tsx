import { Link } from 'react-router'
import '../General.css'

function HomePage() {
  return (
    <div className='web-data'>
      <title>Home Page</title>

      <h1>Pertanyaan</h1>
      <button>
        <Link to="/question" style={{ textDecoration: "none", color: "inherit" }}>
          Mulai
        </Link>
      </button>
    </div>
  )
}

export default HomePage
