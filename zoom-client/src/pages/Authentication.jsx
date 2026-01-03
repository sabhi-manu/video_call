
import { Outlet } from 'react-router'
import "../components/auth/auth.css"
const Authentication = () => {
  return (
 <div className="auth-page">
      <div className="auth-card">
        <Outlet />
      </div>
    </div>
  )
}

export default Authentication