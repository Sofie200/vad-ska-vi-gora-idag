//import holidays from "se-bank-holidays";

export const FetchActivities = async (today) => {

    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const todayDate = new Date(today);

    const dayOfWeek = todayDate.getDay();
    const weekdayArray = ["open_sun","open_mon","open_tue","open_wed","open_thu","open_fri","open_sat"];

    console.log("▶️ FetchActivities start");

    try {
        const res = await fetch(
            `${url}/Activities?${weekdayArray[dayOfWeek]}=eq.true`,
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
        }));

        return normalizedItems;

    } catch (err) {
        console.error("❌ FetchActivities error:", err);
        return null;
    }
};