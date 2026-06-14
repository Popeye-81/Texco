export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { products } = req.body;

    console.log("Received products:", products?.length);

    return res.status(200).json({
      message: "Upload successful",
      count: products?.length || 0,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}