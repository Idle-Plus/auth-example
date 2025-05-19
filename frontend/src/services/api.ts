import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3001/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
});

interface UserInfo {
	name: string;
}

interface UserProfileUpgrades {
	inventory: number;
	house: number;
}

interface UserProfileSkills {
	attack: number;
	strength: number;
	defence: number;
	archery: number;
	magic: number;
	health: number;
}

type UserProfileAchievements = Array<{ id: number; name: string; completed: boolean; }>;

interface UserProfile {
	lastLogin: string;
	visits: number;
	reputation: number;
	karma: number;
	upgrades: UserProfileUpgrades;
	skills: UserProfileSkills;
	achievements: UserProfileAchievements;
}

// Authentication API calls
export const authAPI = {

	// Login with JSON web token
	login: async (token: string): Promise<{ user: UserInfo, profile: UserProfile }> => {
		const response = await api.post("/auth/login", { token });
		return response.data;
	},

	// Logout user
	logout: async () => {
		const response = await api.post("/auth/logout");
		return response.data;
	},

	// Get user information, check if we're logged in
	me: async (): Promise<{ user: UserInfo, profile: UserProfile }> => {
		const response = await api.get("/auth/me");
		return response.data;
	}
};

export const userAPI = {
	// Get user profile
	getProfile: async (): Promise<UserProfile> => {
		const response = await api.get("/user/profile");
		return response.data;
	},

	// Get user stats
	getStats: async (): Promise<{ skills: UserProfileSkills, achievements: UserProfileAchievements }>  => {
		const response = await api.get("/user/stats");
		return response.data;
	},

	// Get user upgrades
	getUpgrades: async (): Promise<UserProfileUpgrades> => {
		const response = await api.get("/user/upgrades");
		return response.data;
	}
};
