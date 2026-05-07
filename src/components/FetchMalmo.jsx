export const FetchMalmo = async (today) => {

  console.log("▶️ FetchMalmo start");

  try {
    const res = await fetch(`/api/malmo?date=${today}&groups=Barn och familj`);
    if (!res.ok) throw new Error("API error: " + res.status);

    const data = await res.json();

    const normalizedItems = data.items.map(event => ({
      image: event.image ?? null,
      title: event.title ?? "",
      desc: event.desc ?? "",
      url: event.url
        ? event.url.startsWith("/")
          ? `https://malmo.se${event.url}`
          : event.url
        : "",
      categories: event.categories ?? [],
      formatted: event.dates?.formatted ?? "",
      place: event.place ?? "",
      price: event.typeOfEvent === "internal" ? "Gratis" : "-"
    }));

    return normalizedItems;

  } catch (err) {
    console.error("❌ FetchMalmo error:", err);
    return null;
  }
};
