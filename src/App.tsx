import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPortfolio from "./pages/EditPortfolio";
import ViewPortfolio from "./pages/ViewPortfolio";

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

export default App
