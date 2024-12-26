import React, { useState, useEffect } from "react";
import SportswearService from "../../service/SportswearService";

function Recommendations({ sportswearId }) {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Hàm lấy danh sách gợi ý từ API Python
  const fetchRecommendations = async () => {
    try {
      console.log("Fetching recommendations for productId:", sportswearId);
      const recommendedIds = await SportswearService.getRecommendations(
        sportswearId,
        6
      );

      if (Array.isArray(recommendedIds)) {
        const recommendedIdsList = recommendedIds.map((item) => item.id);
        fetchRecommendedProducts(recommendedIdsList);
      } else {
        console.error("Received data is not an array:", recommendedIds);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Hàm lấy thông tin chi tiết các sản phẩm gợi ý từ backend
  const fetchRecommendedProducts = async (recommendedIdsList) => {
    try {
      const recommendedProductsArray = [];
      for (let i = 0; i < recommendedIdsList.length; i++) {
        const productId = recommendedIdsList[i];
        const response = await SportswearService.getSportswearByID(
          localStorage.getItem("token"),
          productId
        );

        if (response) {
          recommendedProductsArray.push(response);
        }
      }
      setRecommendedProducts(recommendedProductsArray);
    } catch (error) {
      console.error("Error fetching recommended products:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [sportswearId]);

  // Render danh sách sản phẩm gợi ý
  return (
    <div className="related-products mt-5">
      <h3 className="mb-4">Sản phẩm liên quan</h3>
      <div className="row">
        {recommendedProducts.map((product, index) => (
          <div key={index} className="col-md-3 col-6 mb-4">
            <div className="product-card">
              <img
                src={product.main_image}
                alt={product.name}
                className="img-fluid rounded mb-2"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <h6>{product.name}</h6>
              <p>{product.price_vnd} VND</p>
              <a
                href={`/home/detail/${product.id}`}
                className="btn btn-primary btn-sm"
              >
                Xem chi tiết
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
