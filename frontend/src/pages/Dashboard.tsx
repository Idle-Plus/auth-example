import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

interface upgrades {
	inventory: number;
	house: number;
}

interface Stats {
	skills: {
		attack: number;
		strength: number;
		defence: number;
		archery: number;
		magic: number;
		health: number;
	};
	achievements: Array<{
		id: number;
		name: string;
		completed: boolean;
	}>;
}

const Dashboard = () => {
	const { user, profile, logout } = useAuth();
	const [upgrades, setUpgrades] = useState<upgrades | null>(null);
	const [stats, setStats] = useState<Stats | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Redirect to log in if not authenticated
		if (!user) {
			navigate('/login');
			return;
		}

		// Fetch additional data
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const [upgradesData, statsData] = await Promise.all([
					userAPI.getUpgrades(),
					userAPI.getStats()
				]);

				setUpgrades(upgradesData);
				setStats(statsData);
			} catch {
				// Handle error silently
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [user, navigate]);

	const handleLogout = async () => {
		await logout();
	};

	if (!profile) {
		return <div className="loading">Loading user data...</div>;
	}

	return (
		<div className="dashboard-container">
			<header className="dashboard-header">
				<h1>Welcome, {user?.name}!</h1>
				<button onClick={handleLogout} className="logout-button">Logout</button>
			</header>

			<div className="dashboard-content">
				<div className="user-info-card">
					<h2>User Information</h2>
					<p>Last login: {new Date(profile.lastLogin).toLocaleString()}</p>
					<p>Total visits: {profile.visits}</p>
					<p>Reputation: {profile.reputation}</p>
					<p>Karma: {profile.karma}</p>
				</div>

				{isLoading ? (
					<div className="loading">Loading game data...</div>
				) : (
					<>
						{upgrades && (
							<div className="upgrades-card">
								<h2>Upgrades</h2>
								<div className="upgrades-grid">
									<div className="upgrade-item">
										<span className="upgrade-label">Inventory:</span>
										<span className="upgrade-value">{upgrades.inventory}</span>
									</div>
									<div className="upgrade-item">
										<span className="upgrade-label">House:</span>
										<span className="upgrade-value">{upgrades.house}</span>
									</div>
								</div>
							</div>
						)}

						{stats && (
							<>
								<div className="stats-card">
									<h2>Character Stats</h2>
									<div className="stats-grid">
										<div className="stat-item">
											<span className="stat-label">Attack:</span>
											<span className="stat-value">{stats.skills.attack}</span>
										</div>
										<div className="stat-item">
											<span className="stat-label">Strength:</span>
											<span className="stat-value">{stats.skills.strength}</span>
										</div>
										<div className="stat-item">
											<span className="stat-label">Defence:</span>
											<span className="stat-value">{stats.skills.defence}</span>
										</div>
										<div className="stat-item">
											<span className="stat-label">Archery:</span>
											<span className="stat-value">{stats.skills.archery}</span>
										</div>
										<div className="stat-item">
											<span className="stat-label">Magic:</span>
											<span className="stat-value">{stats.skills.magic}</span>
										</div>
										<div className="stat-item">
											<span className="stat-label">Health:</span>
											<span className="stat-value">{stats.skills.health}</span>
										</div>
									</div>
								</div>

								<div className="achievements-card">
									<h2>Achievements</h2>
									<ul className="achievements-list">
										{stats.achievements.map((achievement) => (
											<li 
												key={achievement.id} 
												className={`achievement-item ${achievement.completed ? 'completed' : 'incomplete'}`}
											>
												{achievement.name}
												{achievement.completed && <span className="completed-badge">✓</span>}
											</li>
										))}
									</ul>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
