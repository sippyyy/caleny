import { Link } from 'react-router-dom'
import clsx from 'clsx'

import Views from "./routes";
import style from './App.module.scss'
import Popup from './components/Popup';

function App() {
  return (
    <>
      <Views />
      <Popup />
    </>
  )
}

export default App;