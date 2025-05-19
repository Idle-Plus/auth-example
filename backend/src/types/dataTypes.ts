export interface UserSession {
	name: string;
}

export interface UserProfile {
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

	achievements: Array<{ id: number; name: string; completed: boolean; }>;
}