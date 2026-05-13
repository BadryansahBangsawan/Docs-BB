const PBKDF2_ITERATIONS = 100_000;

function toHex(buffer: ArrayBuffer): string {
	return Array.from(new Uint8Array(buffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

function fromHex(hex: string): Uint8Array {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = Number.parseInt(hex.slice(i, i + 2), 16);
	}
	return bytes;
}

export async function hashPassword(password: string): Promise<string> {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(password),
		"PBKDF2",
		false,
		["deriveBits"],
	);
	const hash = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
		keyMaterial,
		256,
	);
	return `${toHex(salt.buffer)}:${toHex(hash)}`;
}

export async function verifyPassword(
	password: string,
	stored: string,
): Promise<boolean> {
	const [saltHex, hashHex] = stored.split(":");
	if (!saltHex || !hashHex) return false;

	const salt = fromHex(saltHex);
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(password),
		"PBKDF2",
		false,
		["deriveBits"],
	);
	const hash = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
		keyMaterial,
		256,
	);
	return toHex(hash) === hashHex;
}

export function parseCookies(cookieHeader: string): Record<string, string> {
	const cookies: Record<string, string> = {};
	for (const pair of cookieHeader.split(";")) {
		const [key, ...rest] = pair.split("=");
		if (key) {
			cookies[key.trim()] = rest.join("=").trim();
		}
	}
	return cookies;
}

export function createSessionCookie(
	sessionId: string,
	maxAge: number,
): string {
	return `admin_session=${sessionId}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearSessionCookie(): string {
	return "admin_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0";
}
