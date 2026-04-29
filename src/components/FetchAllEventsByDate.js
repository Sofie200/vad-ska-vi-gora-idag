import { FetchActivities } from "./FetchActivities";
import { FetchKul } from "./FetchKul";
import { FetchMalmo } from "./FetchMalmo";
import holidays from "se-bank-holidays";

export async function FetchAllEventsByDate(date) {
	try {

		const isHoliday = holidays.isMidsummerDay(new Date(date));
		console.log(isHoliday); // true

		const [kul, malmo, activities] = await Promise.all([
			FetchKul(date),
			FetchMalmo(date),
			FetchActivities()
		]);

		const combined = [
			...(kul ?? []),
			...(malmo ?? []),
			...(activities ?? [])
		];

		console.log("💾 Sparar data i localStorage:", combined);
		localStorage.setItem("Items", JSON.stringify(combined));
		console.log("💾 localStorage efter save:", localStorage.getItem("Items"));

		return combined;

	} catch (err) {
		console.error("❌ FetchAllEventsByDate error:", err);
		return [];
	}
}
