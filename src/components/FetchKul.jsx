export const FetchKul = async (today) => {
  const CACHE_KEY = "";

  console.log("▶️ FetchKul start");

  try {

    const res = await fetch(`/api/kul?date=${today}&groups=0,15`);

    if (!res.ok) throw new Error("API error: " + res.status);

    const data = await res.json();

    // Normalisera varje event
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
      place: event.place?.[0] ?? "",
      price: "Gratis"
    }));

    return normalizedItems;

  } catch (err) {
    console.error("❌ FetchKul error:", err);

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) return JSON.parse(cached);

    return null;
  }
};
