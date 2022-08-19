import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductsAPI, removeProductAPI } from "services/api";
import { RemoveModal } from "../components/productlist/RemoveModal";

const ProductsList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const onModalConfirm = (product) => {
    removeProductAPI(product.id)
      .then(() => {
        setSelectedProduct(null);
        getAllProductsAPI()
          .then((res) => setProducts(res.data));
      });
  };

  useEffect(() => {
    getAllProductsAPI()
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            {products.length === 0
              ? (<p>محصولی یافت نشد!</p>)
              : (
                <table className="table table-sm table-striped align-middle">
                  <thead>
                    <tr>
                      <th scope="col">نام محصول</th>
                      <th scope="col">قیمت</th>
                      <th scope="col">دسته‌بندی</th>
                      <th scope="col">توضیحات</th>
                      <th scope="col" > حذف و ویرایش </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.description}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => setSelectedProduct(product)}
                            >
                              حذف
                            </button>
                            <Link
                              to={`/products/edit/${product.id}`}
                              type="button"
                              className="btn btn-sm btn-outline-info"
                            >
                              ویرایش
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <RemoveModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={() => onModalConfirm(selectedProduct)}
        />
      )}
    </>
  );
};

export default ProductsList;