import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./component/home"
import Summary from "./component/summary"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App