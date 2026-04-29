import { useEffect, useState } from "react";
import { FetchAllEventsByDate } from "./FetchAllEventsByDate";
import EventCard from "./EventCard";
import DatePicker from "./DatePicker";

export default function EventList() {

	const [items, setItems] = useState(null);
	const [today, setToday] = useState(() => {
		return new Date().toISOString().split("T")[0];
	});

	const handleChange = (pick) => {
		setToday(pick);
	}

	useEffect(() => {
		const load = async () => {
			const data = await FetchAllEventsByDate(today);
			setItems(data);
		};

		load();
	}, [today]);

	if (!items) return <p className="loading">Laddar…</p>;

	return (
		<>
			<DatePicker handleChange={handleChange} />
			<div className="grid">
				{items.map((item, index) => (
					<EventCard key={index} item={item} />
				))}
			</div>
		</>
	);
}