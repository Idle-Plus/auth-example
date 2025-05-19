import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

/**
 * The key to use for caching the user in localStorage.
 */
const USER_CACHE_KEY: string = "auth_user";

interface User {
	/**
	 * The Idle Clans username of the user.
	 */
	name: string;
}

interface UserProfile {
	lastLogin: string;
	visits: number;
	reputation: number;
	karma: number;
	upgrades: {
		inventory: number;
		house: number;
	};
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

interface AuthContextType {
	/**
	 * The currently authenticated user, or null if not authenticated.
	 */
	user: User | null;
	/**
	 * The profile associated with the currently authenticated user, or null if
	 * we're not authenticated or the profile hasn't been loaded yet.
	 */
	profile: UserProfile | null;

	/**
	 * Try to log in with the given token.
	 */
	login: (token: string) => Promise<void>;
	/**
	 * Log out the user.
	 */
	logout: () => Promise<void>;

	/**
	 * Fetchest the latest profile for the authenticated user from the
	 * backend server.
	 */
	updateProfile: () => Promise<void>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
	user: null,
	profile: null,

	login: async () => {},
	logout: async () => {},

	updateProfile: async () => {}
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUserState] = useState<User | null>(() => {
		const cachedUser = localStorage.getItem(USER_CACHE_KEY);
		return cachedUser ? JSON.parse(cachedUser) : null;
	});
	
	const [profile, setProfile] = useState<UserProfile | null>(null);
	
	// Function to update user state and localStorage
	const setUser = (user: User | null) => {
		setUserState(user);
		if (user) {
			localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
		} else {
			localStorage.removeItem(USER_CACHE_KEY);
		}
	};

	// Check if we're logged in when the page loads.
	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const profileData = await authAPI.me();

				// We're logged in.
				const user = profileData.user;
				const profile = profileData.profile;

				setUser(user);
				setProfile(profile);
			} catch {
				// We're not logged in.
				setUser(null);
				setProfile(null);
			}
		};

		// Only check if we're logged in if we have a cached user.
		if (user != null) {
			checkAuthStatus();
		}

		// Disabling lint as we only want to run once.
		// eslint-disable-next-line
	}, []);

	// Login function
	const login = async (token: string) => {
		const response = await authAPI.login(token);
		setUser(response.user);
		setProfile(response.profile);
	};

	// Logout function
	const logout = async () => {
		await authAPI.logout();
		setUser(null);
		setProfile(null);
	};

	// Update user profile function
	const updateProfile = async () => {
		const profile = await userAPI.getProfile();
		setProfile(profile);
	};

	// Provide the auth context to children components
	return (
		<AuthContext.Provider value={{
			user: user,
			profile: profile,
			login,
			logout,
			updateProfile: updateProfile
		}}>
			{children}
		</AuthContext.Provider>
	);
};
