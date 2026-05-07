import { FetchActivities } from "./FetchActivities";
import { FetchKul } from "./FetchKul";
import { FetchMalmo } from "./FetchMalmo";

export async function FetchAllEventsByDate(date) {
	try {

		const [kul, malmo, activities] = await Promise.all([
			FetchKul(date),
			FetchMalmo(date),
			FetchActivities(date)
		]);

		const combined = [
			...(kul ?? []),
			...(malmo ?? []),
			...(activities ?? [])
		].sort(() => Math.random() - 0.5);

		console.log("💾 Sparar data i localStorage:", combined);
		localStorage.setItem("Items", JSON.stringify(combined));
		//console.log("💾 localStorage efter save:", localStorage.getItem("Items"));

		return combined;

	} catch (err) {
		console.error("❌ FetchAllEventsByDate error:", err);
		return [];
	}
}
