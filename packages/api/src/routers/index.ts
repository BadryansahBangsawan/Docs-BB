import { publicProcedure, router } from "../index";
import { adminRouter } from "./admin";
import { analyticsRouter } from "./analytics";
import { categoriesRouter } from "./categories";
import { documentsRouter } from "./documents";
import { portfolioRouter } from "./portfolio";
import { profileRouter } from "./profile-router";
import { socialLinksRouter } from "./social-links";
import { usefulLinksRouter } from "./useful-links";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	admin: adminRouter,
	documents: documentsRouter,
	categories: categoriesRouter,
	portfolio: portfolioRouter,
	profile: profileRouter,
	socialLinks: socialLinksRouter,
	usefulLinks: usefulLinksRouter,
	analytics: analyticsRouter,
});
export type AppRouter = typeof appRouter;
