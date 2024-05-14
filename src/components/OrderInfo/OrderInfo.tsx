import { Card, Divider, Flex, Space, Typography } from "antd";
import { phoneFormat, priceFormat } from "../../lib/utils/dataFormats";
import { CalendarTwoTone, ClockCircleTwoTone, ShoppingTwoTone } from "@ant-design/icons";
import { statusName } from "../../lib/utils/statusTag";
import { getData } from "../../lib/utils/getData";


const { Text } = Typography;

const DateAndTime = ({ date }: { date: string }): JSX.Element => {
  const [data, time] = date.split(" ");
  return (
    <Space split={<Divider type="vertical" />}>
      <Flex style={{ padding: "10px" }} gap={10}>
        <CalendarTwoTone style={{ fontSize: "20px" }} />
        <Text style={{ fontSize: "16px" }}>{data}</Text>
      </Flex>
      <Flex style={{ padding: "10px" }} gap={10}>
        <ClockCircleTwoTone style={{ fontSize: "20px" }} />
        <Text style={{ fontSize: "16px" }}>{time}</Text>
      </Flex>
    </Space>
  );
};



export const OrderInfo = ({ order }: { order: Order }) => {

  const productsList = getData.getProductsInfo(order.products);


  return (
    <Space direction="vertical">
      <Text strong style={{ fontSize: 20 }}>
        Информация о заказе:
      </Text>
      <Text style={{ fontSize: 18 }}>
        Номер заказа:{" "}
        <Text strong style={{ fontSize: 18, color: "#1890ff" }}>
          {order.order_id}
        </Text>
      </Text>
      <Flex vertical gap={10}>
        <Text style={{ fontSize: 18 }}>
          Количество товаров в заказе: {order.quantity}
        </Text>
        {productsList.map((product) => (
          <Card key={product.id}>
            <Space direction="horizontal" align="center">
              <ShoppingTwoTone style={{ fontSize: 24 }} />
              <Text strong style={{ fontSize: 16, color: "#1890ff" }}>
                {product.article}
              </Text>
              {product.name} - {priceFormat(product.price)}
            </Space>
          </Card>
        ))}
      </Flex>
      <Flex align="center">
        <Text style={{ fontSize: 18 }}>Дата создания заказа:</Text>
        {<DateAndTime date={order.order_date} />}
      </Flex>
      <Flex align="center">
        <Text style={{ fontSize: 18 }}>Дата создания заказа:</Text>
        {<DateAndTime date={order.expire_date} />}
      </Flex>
      <Text style={{ fontSize: 18 }}>
        Статус: {statusName(order.status_id)}
      </Text>
      <Text style={{ fontSize: 18 }}>
        Имя покупателя: {order.customer_name}
      </Text>
      <Text style={{ fontSize: 18 }}>
        Номер телефона: {phoneFormat(order.phone_number)}
      </Text>
      <Text style={{ fontSize: 18 }}>
        Общая стоимость: {priceFormat(order.total_cost)}
      </Text>
    </Space>
  );
}
