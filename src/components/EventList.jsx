import { useEffect, useState } from "react";
import { FetchAllEventsByDate } from "./FetchAllEventsByDate";
import EventCard from "./EventCard";
import DatePicker from "./DatePicker";
import CategoryPicker from "./CategoryPicker";
import FreePicker from "./FreePicker";

export default function EventList() {

	const [allItems, setAllItems] = useState([]);
	const [items, setItems] = useState([]);
	const [category, setCategory] = useState("");
	const [free, setFree] = useState(false);
	const [today, setToday] = useState(() => {
		return new Date().toISOString().split("T")[0];
	});

	const handleChange = (pick) => {
		setToday(pick);
	}

	const handleSelect = (pick) => {
		setCategory(pick);
	}

	const toggleFree = (pick) => {
		setFree(pick);
	}

	useEffect(() => {
		let filtered = allItems;

		// Filtrera kategori om vald
		if (category) {
			filtered = filtered.filter(item =>
				item.categories.includes(category)
			);
		}

		// Filtrera gratis om free === true
		if (free) {
			filtered = filtered.filter(item =>
				item.price === "Gratis"
			);
		}

		setItems(filtered);

	}, [category, free, allItems]);


	useEffect(() => {
		const load = async () => {
			const data = await FetchAllEventsByDate(today);
			setAllItems(data);
			setItems(data);
		};

		load();
	}, [today]);

	if (!items) return <p className="loading">Laddar…</p>;

	return (
		<>
			<div id='search-bar'>
				<DatePicker handleChange={handleChange} />
				<CategoryPicker handleSelect={handleSelect} />
				<FreePicker toggleFree={toggleFree} />
				<div className="app-badge">
					{items.length} förslag
				</div>
			</div>
			<div className="grid">
				{items.map((item, index) => (
					<EventCard key={index} item={item} />
				))}
			</div>
		</>
	);
}