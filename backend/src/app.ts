import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}));

app.use(session({
	secret: "some-kind-of-secret-but-ill-just-use-this",
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production", // Http / Https
		maxAge: 24 * 60 * 60 * 1000 // 24 hours
	}
}));

// Auth check
app.use("/api", (req, res, next) => {
	const session = req.session;
	const authenticated = session.user !== undefined;

	// Skip auth check for login endpoint
	if (req.path === "/auth/login") {
		return next();
	}

	if (!authenticated) {
		return res.status(401)
			.json({ message: "Unauthorized" });
	}

	next();
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start server
app.listen(PORT, () => {
	console.log(`Backend server running on port ${PORT}`);
});
