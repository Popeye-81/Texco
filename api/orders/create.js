let orders = [];

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { createdBy, role, products, totalValue } = req.body;

  const newOrder = {
    id: Date.now(),
    createdBy,
    role,
    products,
    totalValue,
    status: "PENDING_APPROVAL",
    createdAt: new Date(),
  };

  orders.push(newOrder);

  return res.status(200).json({
    message: "Order created successfully",
    order: newOrder,
  });
}