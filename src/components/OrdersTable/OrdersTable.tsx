import { CloseCircleOutlined, EditOutlined, SaveOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnsType,
  TableColumnType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import React, { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { statusName } from "../../lib/utils/statusTag";
import { getData } from "../../lib/utils/getData";
import { phoneFormat, priceFormat } from "../../lib/utils/dataFormats";
import { ButtonOrderCreate } from "../ModalOrderCreateForm/ButtonOrderCreate";
import dayjs from "dayjs";
import { FilterValue } from "antd/es/table/interface";
import { EditableCell } from "./EditableCell";

export interface OrdersDataType extends Omit<Order, "id"> {
  key: React.Key;
}

const orderStatuses = getData.getOrderStatuses();
const orders = getData.getOrders().map((order) => ({
  ...order,
  key: order.order_id,
}));

const findInputType = (dataIndex: string) => {
  if (dataIndex === "expire_date") return "date";
  if (dataIndex === "status_id") return "select";
  return "text";
};

export const OrdersTable = () => {
  const [form] = Form.useForm();
  const [ordersList, setOrdersList] = useState<OrdersDataType[]>(orders);
  const [serchParams, setSerchParams] = useSearchParams();
  const [editingKey, setEditingKey] = useState("");
  const searchInput = useRef<InputRef>(null);

  const addOrder = (orderInfo: Order) => {
    const newOrder: OrdersDataType = { ...orderInfo, key: orderInfo.order_id };
    setOrdersList([...ordersList, newOrder]);
  };

  const isEditing = (record: OrdersDataType) => record.key === editingKey;

  const edit = (record: Partial<OrdersDataType>) => {
    
    
    form.setFieldsValue({
      expire_date: dayjs(record.expire_date),
      status_id: record.status_id,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as OrdersDataType;
      console.log(row);
      
      const newData = [...ordersList];
      const index = newData.findIndex((item) => key === item.key);
      
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        
        setOrdersList(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setOrdersList(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Ошибка валидации:", errInfo);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
      
    confirm();
    if (!!selectedKeys[0]) {
      serchParams.set(dataIndex, selectedKeys[0]);
    } else {
      serchParams.delete(dataIndex);
    }

    setSerchParams(serchParams);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<OrdersDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Flex align="center" gap={6}>
          <Input
            ref={searchInput}
            placeholder={`Поиск ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            style={{ display: "block", width: 250 }}
          />

          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            style={{ width: 90 }}
          >
            Поиск
          </Button>
        </Flex>
      </div>
    ),
    defaultFilteredValue: [serchParams?.get(dataIndex) || ""],
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: TableColumnsType<OrdersDataType> & { editable?: boolean } = [
    {
      title: "Номер заказа",
      dataIndex: "order_id",
      key: "order_id",
      align: "center",
      ...getColumnSearchProps("order_id"),
      render: (text) => (
        <Link to={`/order/${text}`}>
          <Button type="link">{text}</Button>
        </Link>
      ),
    },
    {
      title: "Количество товаров в заказе",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Дата заказа",
      dataIndex: "order_date",
      key: "order_date",
      align: "center",
      sorter: (a, b) =>
        new Date(a.order_date).getTime() - new Date(b.order_date).getTime(),
    },
    {
      title: "Храниен до",
      dataIndex: "expire_date",
      key: "expire_date",
      align: "center",
      editable: true,
      render: (value) => dayjs(value).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Статус заказа",
      dataIndex: "status_id",
      key: "status_id",
      align: "center",
      showSorterTooltip: { target: "sorter-icon" },
      filters: orderStatuses.map((item) => ({
        key: item.id,
        text: item.name,
        value: item.id,
      })),
      editable: true,
      defaultFilteredValue: serchParams.get("status")
        ? [...serchParams.get("status").split(",")]
        : [],
      onFilter: (value, record) => record.status_id === value,
      render: (value) => statusName(value),
    },
    {
      title: "ФИО клиента",
      dataIndex: "customer_name",
      key: "customer_name",
      align: "center",
      ...getColumnSearchProps("customer_name"),
    },
    {
      title: "Номер телефона",
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
      render: (value) => phoneFormat(value),
    },
    {
      title: "Стоимость",
      dataIndex: "total_cost",
      key: "total_cost",
      align: "center",
      render: (value) => priceFormat(value),
    },
    {
      title: <ButtonOrderCreate addOrder={addOrder} />,
      dataIndex: "edit",
      key: "edit",
      align: "center",
       render: (_: unknown, record: OrdersDataType) => {
        const editable = isEditing(record);
        
        return editable ? (
          <Flex gap={10} align="center" justify="center">
            <Button onClick={() => save(record.key)} type="text">
              <SaveOutlined style={{ fontSize: "20px" }} />
            </Button>
            <Button onClick={cancel} type="text">
              <CloseCircleOutlined style={{ fontSize: "20px" }} />
            </Button>
          </Flex>
        ) : (
          <Button
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
            type="text"
          >
            <EditOutlined style={{ fontSize: "20px" }} />
          </Button>
        );
      },
    },
  ];


  const onChange: TableProps<OrdersDataType>["onChange"] = (
    pagination: TablePaginationConfig,
    filters: Record<keyof OrdersDataType, FilterValue | null>,
  ) => {
    const currentPage = pagination.current;
    const status = filters.status_id;

    if (currentPage) serchParams.set("page", currentPage.toString());
    else serchParams.delete("page");

    if (status) serchParams.set("status", status.toString());
    else serchParams.delete("status");

    setSerchParams(serchParams);
  };

  const mergedColumns: TableProps["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: OrdersDataType) => ({
        record,
        inputType: findInputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowClassName="editable-row"
        expandable={{
          expandedRowRender: (record) => (
            <Flex vertical gap={10}>
              {getData.getProductsInfo(record.products).map((product) => (
                <Space key={product.id} split={<Divider type="vertical" />}>
                  <p>{product.article}</p>
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </Space>
              ))}
            </Flex>
          ),
        }}
        dataSource={ordersList}
        onChange={onChange}
        columns={mergedColumns}
        pagination={{
          pageSize: 5,
          current: +serchParams.get("page") || 1,
          position: ["bottomCenter"],
        }}
      />
    </Form>
  );
};
