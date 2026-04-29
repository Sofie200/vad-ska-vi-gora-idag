export default async function handler(req, res) {
  try {
    const { date, groups } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Missing ?date=YYYY-MM-DD" });
    }

    const groupList = groups ? groups.split(",") : [];

    // Funktion för att bygga URL
    const buildUrl = (start) => {
      const params = new URLSearchParams({
        start,
        startDate: date,
        endDate: date
      });

      groupList.forEach(g => params.append("targetGroupsKIM[]", g));

      return (
        "https://malmo.se/appresource/4.366e2dfa19104f527723184/12.cc49022193d3c460671a217/items?" +
        params.toString()
      );
    };

    // 1️⃣ Hämta första sidan
    const firstUrl = buildUrl(0);
    const firstRes = await fetch(firstUrl);

    if (!firstRes.ok) {
      return res.status(500).json({
        error: "Malmö API error",
        status: firstRes.status,
        url: firstUrl
      });
    }

    const firstData = await firstRes.json();

    const totalCount = firstData.count;
    const pageSize = 9;
    const totalPages = Math.ceil(totalCount / pageSize);

    // 2️⃣ Hämta resterande sidor parallellt
    const fetches = [];

    for (let i = 1; i < totalPages; i++) {
      const start = i * pageSize;
      fetches.push(fetch(buildUrl(start)).then(r => r.json()));
    }

    const restPages = await Promise.all(fetches);

    // 3️⃣ Slå ihop alla items
    const allItems = [
      ...firstData.items,
      ...restPages.flatMap(p => p.items)
    ];

    return res.status(200).json({
      count: totalCount,
      items: allItems
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
