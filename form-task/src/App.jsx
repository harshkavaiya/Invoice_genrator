import React, { useEffect, useState } from "react";
import axios from "axios";
import Modelpop from "./components/Modelpop";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");

  const [rate, setRate] = useState("");
  const [unit, setUnit] = useState("");

  const [qty, setQty] = useState("");
  const [discount, setDiscount] = useState("");
  const [netAmount, setNetAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const selected = products.find((p) => p._id === productId);
    if (selected) {
      setRate(selected.Rate);
      setUnit(selected.Unit);
    } else {
      setRate("");
      setUnit("");
    }
  };

  useEffect(() => {
    if (rate && qty) {
      const net = rate - (rate * discount) / 100;
      const total = net * qty;
      setNetAmount(net.toFixed(2));
      setTotalAmount(total.toFixed(2));
    } else {
      setNetAmount(0);
      setTotalAmount(0);
    }
  }, [rate, qty, discount]);

  const handleRemoveRow = (index) => {
    const updatedList = [...productList];
    updatedList.splice(index, 1);
    setProductList(updatedList);
  };

  const handlersubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const selectedProduct = products.find((p) => p._id === data.productName);

    const newProduct = {
      customerName,
      Product_Id: selectedProduct?._id,
      product: selectedProduct?.Product_Name || "Unknown",
      rate,
      unit,
      qty,
      discount,
      netAmount,
      totalAmount,
    };

    setProductList([...productList, newProduct]);
    setIsModalOpen(true);

    // reset
    e.target.reset();
    setRate("");
    setUnit("");
    setQty("");
    setDiscount("");
    setNetAmount(0);
    setTotalAmount(0);
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-white">
      <Modelpop
        isOpen={isModalOpen}
        productList={productList}
        onClose={() => setIsModalOpen(false)}
        onRemoveRow={handleRemoveRow}
      />

      <h1 className="text-2xl font-bold mb-4">Invoice Form</h1>

      <form
        onSubmit={handlersubmit}
        className="w-4/5 max-w-[600px] p-8 border border-black rounded-md flex flex-col gap-4 relative pb-28 md:pb-20"
      >
        {/* Customer Name */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="cust" className="mb-1 sm:mb-0 sm:w-[40%] font-medium">
            Customer Name
          </label>
          <input
            id="cust"
            type="text"
            name="customerName"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="p-2 bg-[#9ac9e6] border-2 border-[#1c37bc] rounded text-base w-full sm:w-[60%]"
          />
        </div>

        {/* Product Name Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="product"
            className="mb-1 sm:mb-0 sm:w-[40%] font-medium"
          >
            Product Name
          </label>
          <select
            id="product"
            name="productName"
            required
            onChange={handleProductChange}
            className="p-2 bg-[#9ac9e6] border-2 border-[#1c37bc] rounded text-base w-full sm:w-[60%]"
          >
            <option value="">Select product</option>
            {products.map((prod) => (
              <option key={prod._id} value={prod._id}>
                {prod.Product_Name}
              </option>
            ))}
          </select>
        </div>

        {/* Rate */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label className="mb-1 sm:mb-0 sm:w-[40%] font-medium">Rate</label>
          <div className="p-2 bg-[#e2f5f5] border border-gray-300 rounded w-full sm:w-[60%] text-base">
            {rate || "—"}
          </div>
        </div>

        {/* Unit */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label className="mb-1 sm:mb-0 sm:w-[40%] font-medium">Unit</label>
          <div className="p-2 bg-[#e2f5f5] border border-gray-300 rounded w-full sm:w-[60%] text-base">
            {unit || "—"}
          </div>
        </div>

        {/* Qty */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="qty" className="mb-1 sm:mb-0 sm:w-[40%] font-medium">
            Qty
          </label>
          <input
            id="qty"
            type="number"
            name="qty"
            value={qty}
            onChange={(e) => setQty(parseFloat(e.target.value))}
            required
            className="p-2 bg-[#9ac9e6] border-2 border-[#1c37bc] rounded text-base w-full sm:w-[60%]"
          />
        </div>

        {/* Discount */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="discount"
            className="mb-1 sm:mb-0 sm:w-[40%] font-medium"
          >
            Discount (%)
          </label>
          <input
            id="discount"
            type="number"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
            required
            className="p-2 bg-[#9ac9e6] border-2 border-[#1c37bc] rounded text-base w-full sm:w-[60%]"
          />
        </div>

        {/* Net Amount */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label className="mb-1 sm:mb-0 sm:w-[40%] font-medium">
            Net Amount
          </label>
          <div className="p-2 bg-[#e2f5f5] border border-gray-300 rounded w-full sm:w-[60%] text-base">
            {netAmount}
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label className="mb-1 sm:mb-0 sm:w-[40%] font-medium">
            Total Amount
          </label>
          <div className="p-2 bg-[#e2f5f5] border border-gray-300 rounded w-full sm:w-[60%] text-base">
            {totalAmount}
          </div>
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="bg-[#9ac9e6] hover:bg-[#319de0] text-black text-base font-medium py-3 px-6 rounded w-96 sm:w-[55%] absolute bottom-2 right-7 border-2 border-[#1c37bc]"
        >
          + ADD
        </button>
      </form>
    </main>
  );
};

export default App;
