import { db } from '$lib/db/db.server';
import { myTable } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const result = await db.select().from(myTable);
	return {
		result
	};
}) satisfies PageServerLoad;