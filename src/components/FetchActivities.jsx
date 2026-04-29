export const FetchActivities = async () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  console.log("▶️ FetchActivities start");

  try {
    const res = await fetch(
      `${url}/Activities?select=*`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      }
    );

    if (!res.ok) throw new Error("API error: " + res.status);

    const data = await res.json(); // <-- data ÄR arrayen

    // Normalisera (anpassa efter dina faktiska kolumner)
    const normalizedItems = data.map(item => ({
      id: item.id,
      title: item.title ?? "",
      desc: item.desc ?? "",
      image: item.image ?? null,
      url: item.url ?? "",
      categories: item.categories.split(', ') ?? [],
      formatted: item.formatted ?? "",
      place: item.place ?? "",
      price: item.price ?? "",
      open_mon: item.open_mon ?? "",
      open_tue: item.open_tue ?? "",
      open_wed: item.open_wed ?? "",
      open_thu: item.open_thu ?? "",
      open_fri: item.open_fri ?? "",
      open_sat: item.open_sat ?? "",
      open_sun: item.open_sun ?? "",
    }));

    console.log(normalizedItems);

    return normalizedItems;

  } catch (err) {
    console.error("❌ FetchActivities error:", err);
    return null;
  }
};