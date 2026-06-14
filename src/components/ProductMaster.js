import React, { useState } from "react";
import * as XLSX from "xlsx";

const ProductMaster = () => {
  const [products, setProducts] = useState([]);
  const [fileName, setFileName] = useState("");

  // Handle Excel Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file?.name || "");

    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryStr = evt.target.result;

      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assuming first sheet contains product data
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      setProducts(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  // Placeholder: Save to backend
  const handleSave = async () => {
    try {
      const res = await fetch("/api/product-master/bulk-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      if (res.ok) {
        alert("Products uploaded successfully!");
      } else {
        alert("Upload failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Master</h2>

      {/* Upload Section */}
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {fileName && <p>Uploaded File: {fileName}</p>}

      {/* Table */}
      {products.length > 0 && (
        <div style={{ marginTop: "20px", overflowX: "auto" }}>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                {Object.keys(products[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {products.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Actions */}
      {products.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSave}>Save to Backend</button>
        </div>
      )}
    </div>
  );
};

export default ProductMaster;