import { Router } from "express";
import { database } from "../database/SimpleDatabase";

const router = Router();

// Get user profile information
router.get("/profile", (req, res) => {
	const session = req.session;
	const user = session.user!!;

	let userData = database.getUser(user.name);
	if (!userData) {
		console.error(`/api/user/profile: user data not found for user ${user.name}.`)
		return res.status(404)
			.json({ message: "User data not found" });
	}
	
	res.json(userData);
});

// Get user game statistics
router.get("/stats", (req, res) => {
	const session = req.session;
	const user = session.user!!;

	let userData = database.getUser(user.name);
	if (!userData) {
		console.error(`/api/user/stats: user data not found for user ${user.name}.`)
		return res.status(404)
			.json({ message: "User data not found" });
	}
	
	res.json({
		skills: userData.skills,
		achievements: userData.achievements
	});
});

// Get user upgrades
router.get("/upgrades", (req, res) => {
	const session = req.session;
	const user = session.user!!;

	let userData = database.getUser(user.name);
	if (!userData) {
		console.error(`/api/user/upgrades: user data not found for user ${user.name}.`)
		return res.status(404)
			.json({ message: "User data not found" });
	}
	
	res.json(userData.upgrades);
});

export const userRoutes = router;