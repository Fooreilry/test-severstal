import { Table, TableColumnsType } from "antd";
import { getData } from "../../lib/utils/getData";
import { priceFormat } from "../../lib/utils/dataFormats";
import React from "react";

interface ProductsType extends Omit<Product, "id"> {
  key: React.Key;
}

const productList: ProductsType[] = getData.getProducts().map((product) => ({
  ...product,
  key: product.id.toString(),
}));

const columns: TableColumnsType<ProductsType> = [
  {
    title: "Артикул",
    dataIndex: "article",
    key: "article",
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    render: (value) => priceFormat(value),
  },
];
export const ProductsTable = () => {
  return (
    <Table
      dataSource={productList}
      columns={columns}
      pagination={{ pageSize: 10, position: ["bottomCenter"] }}
    />
  );
}
