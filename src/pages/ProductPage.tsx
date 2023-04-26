import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../configs/routes";
import { IProductParams } from "../models/product";
import ProductList from "../modules/products/components/productList/ProductList";
import {
  deleteProduct,
  filterProduct,
  getAllProduct,
} from "../modules/products/redux/ProductSlice";
import SignInPage from "./SignInPage";
import { FitlerProduct } from "../modules/products/components/filterProduct/FilterProduct";

const ProductPage = () => {
  const authToken = sessionStorage.getItem("access_token");
  const dispatch = useDispatch<any>();

  const productList = useSelector((state: any) => state.product.productList);

  const filterProducts = useSelector(
    (state: any) => state.product.filterProduct
  );


  const [filter, setFilter] = useState({
    status: "",
    client: "",
    from: "",
    to: "",
    invoice: "",
  });
  const [filteredProducts, setFilteredProducts] = useState(productList);

  // call all product
  useEffect(() => {
    (async () => {
      const resultAction = await dispatch(getAllProduct());
      unwrapResult(resultAction);

      setFilteredProducts(resultAction.payload);
    })();
  }, [dispatch]);

  // delete product
  const handleDeleteProduct = async (id: number) => {
    dispatch(deleteProduct(id));

    const newFilteredNames = filteredProducts.filter(
      (product: IProductParams) => product.id !== id
    );

    setFilteredProducts(newFilteredNames);
  };

  // select status
  const handleSelectStatus = (status: string) => {
    setFilter({ ...filter, status: status });
  };

  // select client
  const handleSelectClient = (client: string) => {
    console.log(client);

    setFilter({ ...filter, client: client });
  };

  // click apply filter
  const handleFilter = () => {
    if (!filter) return;
    console.log(123);

    dispatch(filterProduct(filter));
  };
  useEffect(() => {
    setFilteredProducts(filterProducts);
  }, [filterProducts]);

  // click clear filter
  const handleClearFilter = () => {
    setFilteredProducts(productList);
  };

  if (!authToken)
    return authToken ? <SignInPage /> : <Navigate to={ROUTES.login} />;

  return (
    <div>
      <h1 className="text-3xl mb-10">Product</h1>
      <FitlerProduct
        handleSelectClient={handleSelectClient}
        handleSelectStatus={handleSelectStatus}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
      />
      <ProductList
        onDeleteProduct={handleDeleteProduct}
        productList={filteredProducts}
      />
    </div>
  );
};

export default ProductPage;
