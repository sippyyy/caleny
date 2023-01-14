import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { loginStatus } from './redux/selectors'
import Login from './pages/Login'

const ProtectedRoutes = () => {
    const status = useSelector(loginStatus)
    return status ? <Outlet /> : <Login />
}

export default ProtectedRoutes

