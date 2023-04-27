import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getDetailProduct,
  updateProduct,
} from "../modules/products/redux/ProductSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { useForm } from "react-hook-form";
import { Input } from "@mui/material";
import { ROUTES } from "../configs/routes";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authToken = sessionStorage.getItem("access_token");
  const { id }: any = useParams();
  const detailProduct = useSelector(
    (state: any) => state.product.detailProduct
  );

  const [editing, setEditing] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(detailProduct.status);

  const [total, setTotal] = useState(detailProduct.total);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedOption(detailProduct.status);
  }, [detailProduct.status]);

  if (!authToken) {
    toast.error("You are not logged in!!");
    return <Navigate to={ROUTES.login} />;
  }

  useEffect(() => {
    (async () => {
      const resultAction = await dispatch(getDetailProduct(id));
      unwrapResult(resultAction);

      setTotal(resultAction.payload.total);
    })();
  }, [id]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  const handleInputChange = (e: any) => {
    setTotal(e.target.value);
  };

  const handleChange = () => {
    setShowSelect(true);
  };

  const handleSelectChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const handleUpdateProduct = async (e: any) => {
    e.preventDefault();

    const newValues = {
      id: detailProduct.id,
      status: selectedOption,
      currency: detailProduct.currency,
      total: total,
      order: detailProduct.order,
      fundingMethod: detailProduct.fundingMethod,
    };

    console.log(newValues);

    await dispatch(updateProduct(newValues));
    navigate(ROUTES.product);
  };

  return (
    <div className="pt-20">
      <form onSubmit={handleUpdateProduct}>
        <h1 className="text-5xl font-semibold mb-10"> Product Detail</h1>
        <div className="mb-10">
          <p className="text-lg mb-3">ID: {detailProduct.id}</p>
          <p className="text-lg mb-3">Order: {detailProduct.order}</p>
          <div className="flex gap-2 cursor-pointer p-4">
            <h2>Status: </h2>
            {showSelect ? (
              <select className="" onChange={handleSelectChange}>
                <option value="">--Select an option--</option>
                <option value="PENDING">PENDING</option>
                <option value="FULFILLED">FULFILLED</option>
                <option value="RECEIVED">RECEIVED</option>
              </select>
            ) : (
              <p className="text-lg mb-3" onClick={handleChange}>
                {detailProduct.status}
              </p>
            )}
          </div>

          <p className="text-lg mb-3">Currency: {detailProduct.currency}</p>
          <p className="text-lg mb-3">
            Funding Method: {detailProduct.fundingMethod}
          </p>
          {/* <p className="text-lg mb-3">Total: {detailProduct.total}</p> */}
          {editing ? (
            <Input
              name="total"
              type="text"
              value={total}
              onChange={(e) => handleInputChange(e)}
              onBlur={handleInputBlur}
            />
          ) : (
            <h2
              className="mb-3 w-[200px] text-lg transition-all duration-300 cursor-pointer font-semibold hover:border-b hover:p-4  hover:border-cyan-700"
              onClick={handleEditClick}
            >
              Total: {total}
            </h2>
          )}
          <p className="text-lg mb-3">Invoice: {detailProduct.invoice || 0}</p>
        </div>
        <button
          type="submit"
          className="cursor-pointer  p-4 bg-[#0e7490] rounded-xl w-[180px] block  text-white"
        >
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default ProductDetailPage;
