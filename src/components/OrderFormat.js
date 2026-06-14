import { useState } from "react";

function OrderFormat() {
  const [products, setProducts] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // 🔐 TOKEN ADDED HERE
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          products,
          totalValue,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Order Created Successfully ✔");
        setProducts("");
        setTotalValue("");
      } else {
        setMessage(data.message || "Error creating order");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h2>Order Creation</h2>

      <input
        type="text"
        placeholder="Products"
        value={products}
        onChange={(e) => setProducts(e.target.value)}
      />

      <input
        type="number"
        placeholder="Total Value"
        value={totalValue}
        onChange={(e) => setTotalValue(e.target.value)}
      />

      <button onClick={handleSubmit}>Create Order</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderFormat;