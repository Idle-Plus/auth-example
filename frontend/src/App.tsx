import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';
import type { JSX } from "react";

const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route 
				path="/dashboard" 
				element={
					<AuthenticatedRoute>
						<Dashboard />
					</AuthenticatedRoute>
				} 
			/>
			<Route path="/" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

function App() {
	return (
		<Router>
			<AuthProvider>
				<div className="app-container">
					<AppRoutes />
				</div>
			</AuthProvider>
		</Router>
	);
}

export default App;
