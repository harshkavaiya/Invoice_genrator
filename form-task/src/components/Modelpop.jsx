import axios from "axios";
import React from "react";

const Modelpop = ({ isOpen, onClose, productList, onRemoveRow }) => {
  if (!isOpen) return null;

  const handleRemove = (index) => {
    onRemoveRow(index);
  };

  const handleSubmit = async () => {
    const totalAmount = productList.reduce(
      (sum, item) => sum + parseFloat(item.totalAmount),
      0
    );

    const payload = {
      Customer_name: productList[0].customerName,
      total_amount: totalAmount,
      products: productList.map((item) => ({
        Product_Id: item.Product_Id,
        product_name: item.product,
        rate: item.rate,
        unit: item.unit,
        qty: item.qty,
        disc_percentage: item.discount,
        net_amount: item.netAmount,
        total_amount: item.totalAmount,
      })),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/invoice",
        payload
      );
      alert(res.data.message);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving to DB.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-6">
      <div className="w-[90%] max-w-[70%] h-[70%] p-5 flex flex-col items-center bg-white relative overflow-auto rounded-md border border-gray-400 shadow-lg ">
        {/* Table */}
        <table className="w-[90%] border-collapse mb-6">
          <thead>
            <tr className="bg-gray-300 text-sm">
              <th className="border border-black p-2">Product</th>
              <th className="border border-black p-2">Rate</th>
              <th className="border border-black p-2">Unit</th>
              <th className="border border-black p-2">Qty</th>
              <th className="border border-black p-2">Disc%</th>
              <th className="border border-black p-2">Net Amt.</th>
              <th className="border border-black p-2">Total Amt.</th>
              <th className="border border-black p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-black p-2">{item.product}</td>
                <td className="border border-black p-2">{item.rate}</td>
                <td className="border border-black p-2">{item.unit}</td>
                <td className="border border-black p-2">{item.qty}</td>
                <td className="border border-black p-2">{item.discount}%</td>
                <td className="border border-black p-2">{item.netAmount}</td>
                <td className="border border-black p-2">{item.totalAmount}</td>
                <td className="border border-black p-2">
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-600 font-bold hover:underline"
                  >
                    X REMOVE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Buttons */}
        <div className="flex justify-around w-full px-6 py-4 sticky bg-white -bottom-5 rounded-md">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black w-50 px-4 py-2 rounded font-semibold hover:bg-gray-400"
          >
            CLOSE
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#4a90e2] text-white w-50 px-6 py-2 rounded font-semibold border-2 border-[#3c7cbf] hover:bg-blue-600"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modelpop;
