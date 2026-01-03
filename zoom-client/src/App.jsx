
import {Route, Routes} from "react-router"
import LandingPage from './pages/LandingPage'
import Authentication from "./pages/Authentication"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { AuthProvider } from "./contexts/AuthContext"

const App = () => {
  return (
    <div>
        <AuthProvider>
      <Routes>

        <Route path='/' element={<LandingPage/>}/>
      <Route path="auth" element={<Authentication />}>
    <Route index  element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
      </Routes>
        </AuthProvider>
    </div>
  )
}

export default App