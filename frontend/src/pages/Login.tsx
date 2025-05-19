import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
	const [token, setToken] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!token.trim()) {
			setError('Please enter a verification token');
			return;
		}

		if (token.split(".").length !== 3 &&
			(!token.startsWith("{") || !token.endsWith("}"))) {
			setError('Invalid token format. Please check and try again.');
			return;
		}

		try {
			setIsLoading(true);
			await login(token);
			navigate('/dashboard');
		} catch {
			setError('Invalid token. Please check and try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<h1>Authentication using Idle Clans</h1>
				<p style={{textAlign: 'center'}}>
					Paste your verification token to sign in.<br />
					<small><i>(In Game, Settings &gt; Info &gt; Get verification token)</i></small>
				</p>

				{error && <div className="error-message">{error}</div>}

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="token">Verification Token:</label>
						<textarea
							id="token"
							value={token}
							onChange={(e) => setToken(e.target.value)}
							placeholder="verification token"
							rows={4}
							disabled={isLoading}
							style={{ resize: "none" }}
						/>
					</div>

					<button 
						type="submit" 
						className="login-button"
						disabled={isLoading}
					>
						{isLoading ? 'Verifying...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
