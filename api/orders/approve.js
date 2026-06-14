import { verifyToken } from "../auth/verify";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const user = verifyToken(req);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Only ASM + ADMIN can approve (you can change rule later)
  const canApprove = ["ASM", "ADMIN"].includes(user.role);

  if (!canApprove) {
    return res.status(403).json({ message: "Not allowed to approve" });
  }

  const { orderId } = req.body;

  return res.status(200).json({
    message: "Order approved successfully",
    orderId,
    approvedBy: user.username,
    role: user.role,
  });
}