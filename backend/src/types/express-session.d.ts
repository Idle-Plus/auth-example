import "express-session";
import { UserSession } from "./dataTypes";

declare module "express-session" {
	interface SessionData {
		/**
		 * When specified, the user has been authenticated and is logged in.
		 */
		user?: UserSession;
	}
}