import { UserProfile } from "../types/dataTypes";

// The default user data to use if none is provided.
const DEFAULT_DATA: UserProfile = {
	lastLogin: new Date().toISOString(),
	visits: 1,

	reputation: 100,
	karma: 100,

	upgrades: {
		inventory: 10,
		house: 1,
	},

	skills: {
		attack: 10,
		strength: 9001,
		defence: 15,
		archery: 12,
		magic: 18,
		health: 18
	},

	achievements: [
		{ id: 1, name: "Explored the example", completed: true },
		{ id: 2, name: "Idle Clans-er", completed: true },
		{ id: 3, name: "Use verification tokens", completed: false }
	]
};

/**
 * A simple example database, not made to actually store data.
 */
export class SimpleDatabase {

	private users: Record<string, UserProfile> = {};

	createUser(name: string, data: Partial<UserProfile> = DEFAULT_DATA): UserProfile {
		if (this.users[name]) throw new Error(`User ${name} already exists`);

		const userData = <UserProfile>{
			...DEFAULT_DATA,
			...data
		};

		this.users[name] = userData;
		return userData;
	}

	getUser(name: string): UserProfile | undefined {
		return this.users[name];
	}
}

export const database = new SimpleDatabase();