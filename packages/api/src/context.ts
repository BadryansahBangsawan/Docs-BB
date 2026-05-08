export async function createContext(_opts: { req: Request }) {
	return {
		auth: null,
		session: null,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
