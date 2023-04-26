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

type Props = {};

const ProductDetailPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
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
    const fetchProduct = async () => {
      const resultAction = await dispatch(getDetailProduct(id));
      unwrapResult(resultAction);

      setTotal(resultAction.payload.total);
    };

    fetchProduct();
  }, [id]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    setTotal(value);
  };

  const handleChange = () => {
    setShowSelect(true);
  };

  const handleSelectChange = (event: any) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleUpdateProduct = (e: any) => {
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

    dispatch(updateProduct(newValues));

    navigate(ROUTES.product);
  };

  return (
    <form onSubmit={handleUpdateProduct}>
      <h1 className="text-3xl mb-10"> Product Detail Page</h1>
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
  );
};

export default ProductDetailPage;
