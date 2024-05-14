import {  Steps, Typography } from 'antd';
import { getData } from '../../lib/utils/getData';

const statuses = getData.getOrderStatuses()

const { Text } = Typography;

const orderStatuses = statuses.map((status) => ({
  id: status.id,
  title: status.name,
}));

const findCurrntStatus = (statusId: number) => orderStatuses.find((status) => status.id === statusId)?.id;

export const OrderStepProgress = ({ order }: { order: Order }) => {
  
  const currentStatus = findCurrntStatus(order.status_id);

  if (!currentStatus) {
    return <Text style={{ fontSize: "20px" }}>Статус заказа неизвестен</Text>;
  }
  
  return   <Steps direction='vertical' current={currentStatus} items={orderStatuses} />;
}
