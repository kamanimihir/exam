
import { Route, Routes } from 'react-router-dom'
// import './App.css'
import Home from './component/Home'
import List from './component/List'

function App() {


  return (
    <>
    <div className='w-full'>
      <p className='bg-black text-white p-4'>Employee Management App</p>
    </div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/list' element={<List/>}></Route>
      </Routes>
    </>
  )
}

export default App
