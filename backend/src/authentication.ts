import jwt, { Jwt, JwtPayload, VerifyOptions } from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";

// JWK public key provided by idle clans.
// Can be found at https://idleclans.com/.well-known/jwks.json
const JWK_PUBLIC_KEY = {
	"crv": "P-256",
	"key_ops": [],
	"kid": "755feb6ec1754c3a9c22ea555a1b212b",
	"kty": "EC",
	"oth": [],
	"x": "q2wnG1CtcUwB0qxXR6iaK0gR-7NiDLkfxdN0U3FjHKk",
	"x5c": [],
	"y": "k1bIBpD_vQJY-JFioM0LF01b_Y7K4NNL-ClDeYzdwuo"
};

const PUBLIC_KEY_PEM = jwkToPem(JWK_PUBLIC_KEY as jwkToPem.JWK);

/**
 * Verifies a given JSON Web Token (JWT) string and returns the decoded token
 * if valid.
 *
 * @param {string} input - The input JWT string or a JSON object containing the
 *                         token property. If provided as a JSON object, it
 *                         must include a "token" property with the JWT.
 *
 * @return {Jwt} The decoded JWT object if the token is valid.
 *
 * @throws {Error} If the token format is invalid or verification fails.
 */
export function verifyToken(input: string): JwtPayload {
	let token: string;

	// As of right now, the "Get verification token" butten returns the
	// JSON web token inside a JSON object with a "token" property.
	// This will be changed in a future update, but we'll handle both
	// formats for now.

	// JSON format:
	// { "token": "head.payload.sign", "expires": "mm/dd/yyyy hh:mm:ss" }
	// Will hopefully be changed to:
	// head.payload.sign

	try {
		input = input.trim();

		// Do a simple check to see if this is a JSON object or not.
		if (input.startsWith("{") && input.endsWith("}")) {
			const parsed = JSON.parse(input);
			token = parsed.token;
		} else {
			// If not, assume it's a regular JWT token
			token = input;
		}
	} catch (e) {
		throw new Error("Invalid token format");
	}

	// A quick check to see if the format looks valid.
	if (token.split(".").length !== 3) {
		throw new Error("Invalid token format");
	}
	
	// Verify the token using the public key provided by Idle Clans.
	let result: Jwt;
	try {
		result = jwt.verify(token, PUBLIC_KEY_PEM, {
			algorithms: [ "ES256" ],
			issuer: "https://idleclans.com",
			// The audience might be changeable by the client in the future,
			// so we'll make sure to only allow tokens created for user
			// authentication purposes.
			audience: "user-authentication",
			complete: true,
			ignoreExpiration: false, // Should be default, but we want to be explicit.
			ignoreNotBefore: false, // ^
			clockTolerance: 30,
		} as VerifyOptions & { complete: true });
	} catch (error) {
		throw new Error("Invalid token");
	}

	// Make sure the payload isn't a string.
	const payload = result.payload;
	if (typeof payload !== "object" || payload === null) {
		throw new Error("Invalid token format");
	}

	return payload as JwtPayload;
}