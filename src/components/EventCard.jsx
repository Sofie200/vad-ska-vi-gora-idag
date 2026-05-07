export default function EventCard({ item }) {

	const renderPrice = (price) => {
	if (!price) return "-";                 // null, undefined, tom sträng
	if (price === "Gratis") return "Gratis";
	if (price === "-") return "-";

	// Om priset består av $-tecken → visa mynt
	if (/^\$+$/.test(price)) {
		return "🪙".repeat(price.length);
	}

	return price; // fallback
	};

	return (

		<div className="event-card">

			<a href={item.url} target="_blank">
				<img className="event-image" src={item.image} alt={item.title} />
			</a>

			<h3 className="event-title">{item.title}</h3>

			<div className="event-meta">
				<span className="event-date">{item.formatted}</span>
				<p className="event-price">
				{item.price === "Gratis" ? (
					<span className="event-free">
					{"Gratis"}
					</span>
				) : item.price === "-" ? (
					"-"
				) : (
					<span className="price-icons">
					{"🪙".repeat(item.price.length)}
					</span>
				)}
				</p>
			</div>

			<p className="event-desc">{item.desc}</p>


			<p className="event-place">
				<span className="event-place-text">{item.place}</span>
			</p>

			<div className="chips">
				{item.categories.map((cat, i) => (
					<span key={i} className="chip">{cat}</span>
				))}
			</div>

		</div>
	);
}
