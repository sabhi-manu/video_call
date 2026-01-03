
import {Route, Routes} from "react-router"
import LandingPage from './pages/LandingPage'
import Authentication from "./pages/Authentication"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      <Route path="auth" element={<Authentication />}>
    <Route index  element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
      </Routes>
    </div>
  )
}

export default App