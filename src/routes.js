import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import MyCalendar from './pages/MyCalendar';
import ProtectedRoutes from './protectedRoutes';

function Views() {
    return (
        <Routes>
            <Route path='/signin' element={<Login />} />
            <Route element={<ProtectedRoutes />}>
                {/* Private Routes is wrapped by another big Route to control routes by rule from Protected Routed Element */}
                <Route path='/' element={<MyCalendar />} />
                <Route path='*' element={<MyCalendar />} />
            </Route>
        </Routes>
    );
}

export default Views;