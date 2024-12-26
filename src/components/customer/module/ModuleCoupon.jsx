import React, { useState } from "react";

function CouponInput({ onApplyCoupon }) {
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");

  const handleApplyCoupon = async () => {
    try {
      await onApplyCoupon(couponCode);
      setError("");
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi áp dụng mã giảm giá.");
    }
  };

  return (
    <div className="coupon-input">
      <input
        type="text"
        placeholder="Nhập mã giảm giá"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button onClick={handleApplyCoupon} className="site-btn">
        Áp dụng
      </button>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default CouponInput;
