import { useEffect, useState } from "react";
import { FetchAllEventsByDate } from "./FetchAllEventsByDate";
import EventCard from "./EventCard";
import DatePicker from "./DatePicker";
import CategoryPicker from "./CategoryPicker";

export default function EventList() {

	const [allItems, setAllItems] = useState([]);
	const [items, setItems] = useState([]);
	const [category, setCategory] = useState("");
	const [today, setToday] = useState(() => {
		return new Date().toISOString().split("T")[0];
	});

	const handleChange = (pick) => {
		setToday(pick);
	}

	const handleSelect = (pick) => {
		setCategory(pick);
	}

	useEffect(() => {

		if (!category) {
			setItems(allItems); // visa allt om ingen kategori är vald
			return;
		}

		const filteredItems = allItems.filter(item => item.categories.includes(category));
		setItems(filteredItems);
	}, [category, allItems]);

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
			</div>
			<div className="grid">
				{items.map((item, index) => (
					<EventCard key={index} item={item} />
				))}
			</div>
		</>
	);
}