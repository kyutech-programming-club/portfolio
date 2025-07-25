import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPortfolio from "./pages/EditPortfolio";
import ViewPortfolio from "./pages/ViewPortfolio";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit" element={<EditPortfolio/>}></Route>
        <Route path="/view/:id" element={<ViewPortfolio/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
