export default function EventCard({ item }) {

	return (

		<div className="event-card">

			<a href={item.url} target="_blank">
				<img className="event-image" src={item.image} alt={item.title} />
			</a>

			<h3 className="event-title">{item.title}</h3>

			<p className="event-price">{item.price}</p>

			<p className="event-desc">{item.desc}</p>

			<div className="event-meta">
				<span className="event-date">{item.formatted}</span>
				<span className="event-place">{item.place}</span>
			</div>

			<div className="chips">
				{item.categories.map((cat, i) => (
					<span key={i} className="chip">{cat}</span>
				))}
			</div>

		</div>
	);
}
