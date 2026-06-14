import { useState } from "react";

function OrderApproval() {
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");

  const handleApprove = async () => {
    try {
      const res = await fetch("/api/orders/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // 🔐 TOKEN ADDED HERE
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          orderId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Order Approved ✔");
        setOrderId("");
      } else {
        setMessage(data.message || "Approval failed");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h2>Order Approval</h2>

      <input
        type="text"
        placeholder="Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <button onClick={handleApprove}>Approve Order</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderApproval;