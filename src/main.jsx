import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StarRating from './StarRating.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5}/>
    <StarRating maxRating={10}/>
    <StarRating maxRating={20}/>
  </React.StrictMode>,
)
