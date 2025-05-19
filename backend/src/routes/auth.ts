import { Router } from "express";
import { verifyToken } from "../authentication";
import { JwtPayload } from "jsonwebtoken";
import { database } from "../database/SimpleDatabase";

const router = Router();

// Login endpoint
router.use("/login", (req, res) => {
	const { token } = req.body;

	// Clear the user data in case the login fails.
	const session = req.session;
	session.user = undefined;

	if (!token) {
		return res.status(400)
			.json({ message: "Token is required" });
	}

	// Verify the token.
	let payload: JwtPayload;
	try {
		payload = verifyToken(token);
	} catch (error) {
		return res.status(401)
			.json({ message: "Invalid token" });
	}

	// Extract the username from the token, which is stored in the
	// "sub" property.
	const username = payload.sub;
	if (!username) {
		console.warn("Failed to handle login request: no username set.");
		return res.status(401)
			.json({ message: "Invalid token" });
	}

	const user = { name: username };
	const profile = database.getUser(username) ?? database.createUser(username);

	// Set the session and return the user data.
	session.user = user;

	res.json({
		user: { name: user.name },
		profile: profile
	});
});

// Logout endpoint
router.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500)
				.json({ message: "Failed to logout" });
		}
		res.clearCookie("connect.sid");
		res.json({ message: "Logged out successfully" });
	});
});

router.get("/me", (req, res) => {
	const session = req.session;
	const user = session.user;

	if (!user) {
		return res.status(401)
			.json({ message: "Unauthorized" });
	}

	const profile = database.getUser(user.name);
	if (!profile) {
		// Should technically never happen, but just in case.
		console.error("/api/auth/me: user data not found for user ", user.name, ".");
		return res.status(404)
			.json({ message: "User not found" });
	}

	profile.lastLogin = new Date().toISOString();
	profile.visits = profile.visits + 1;

	return res.json({
		user: { name: user.name },
		profile: { ...profile }
	});
})

export const authRoutes = router;