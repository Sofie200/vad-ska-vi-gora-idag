export default async function handler(req, res) {
  try {
    const { date, groups } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Missing ?date=YYYY-MM-DD" });
    }

    const groupList = groups ? groups.split(",") : [];

    const params = new URLSearchParams({
      start: 0,
      startDate: date,
      endDate: date
    });

    groupList.forEach(g => params.append("targetGroups[]", g));

    const url =
      "https://malmo.se/appresource/4.50574bcf196ed960a55408d/12.50574bcf196ed960a55409f/items?" +
      params.toString();

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({
        error: "Malmö API error",
        status: response.status,
        url
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
