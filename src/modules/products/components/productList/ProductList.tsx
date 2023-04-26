import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../../components/modal/Modal";
import { ROUTES } from "../../../../configs/routes";
import { IProductParams } from "../../../../models/product";
import CustomNumberFormat from "../../../../components/customNumberFormat/CustomNumberFormat";

interface IProductListProps {
  productList: IProductParams[];

  onDeleteProduct: (id: number) => void;
}

interface Column {
  id:
    | "ID"
    | "Status"
    | "Date"
    | "Client"
    | "Currency"
    | "Total"
    | "Invoice"
    | "Action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "ID", label: "ID", minWidth: 50 },
  { id: "Status", label: "Status", minWidth: 120 },
  { id: "Date", label: "Date", minWidth: 100 },
  {
    id: "Client",
    label: "Client",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Currency",
    label: "Currency",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Total",
    label: "Total",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },

  {
    id: "Invoice",
    label: "Invoice #",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

const ProductList = ({ productList, onDeleteProduct }: IProductListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [id, setID] = useState<number>();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProduct = (id: number) => {
    // onDeleteProduct(id);

    setShowModal(true);

    setID(id);

    return (event: React.MouseEvent) => {
      event.preventDefault();
    };
  };

  return (
    <div className="mt-4">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className="font-semibold"
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell className="font-semibold"></TableCell>
                <TableCell className="font-semibold"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((product: any) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell style={{ width: 50 }}>{product.id}</TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: 100 }}
                      >
                        {product.status === "PENDING" && (
                          <p className="text-slate-500 font-medium">
                            {" "}
                            {product.status}
                          </p>
                        )}
                        {product.status === "FULFILLED" && (
                          <p className="text-[green] font-medium">
                            {" "}
                            {product.status}
                          </p>
                        )}
                        {product.status === "RECEIVED" && (
                          <p className="text-[blue] font-medium">
                            {" "}
                            {product.status}
                          </p>
                        )}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {/* {product.createdAt} */}
                        {moment(product.createdAt).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {product.client || "Client"}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {product.currency}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {/* {product.total} */}
                        <CustomNumberFormat
                          type="text"
                          value={product.total}
                          ousandsgroupstyle="lakh"
                          ousandseparator=","
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell style={{ width: 100 }}>
                        {product.invoice || "Invoice"}
                      </TableCell>
                      <TableCell style={{ width: 100 }}>
                        <Link to={`${ROUTES.product}/${product.id}`}>
                          <div className="p-2 cursor-pointer text-base font-semilbol">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 ml-auto cursor-pointer text-[#227b00]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell style={{ width: 100 }}>
                        <div onClick={(e) => handleDeleteProduct(product.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 m-auto text-[red] cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={productList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        onDelete={onDeleteProduct}
        showModal={showModal}
        setShowModal={setShowModal}
        id={id}
      />
    </div>
  );
};

export default ProductList;
