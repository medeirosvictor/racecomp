import { Navigate } from 'react-router-dom';
import { state$ } from '../utils/legendState'

export default function ProtectedRoute({ children }) {
    const user = state$.user.get();
    if (!user?.displayName) {
        return <Navigate to="/" />
    } else {
        return children
    }
}
