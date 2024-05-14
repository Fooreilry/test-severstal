import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import { useResetFormOnCloseModal } from "./useResetFormOnCloseModal";
import { getData } from "../../lib/utils/getData";
import dayjs from "dayjs";

type CreateOrderFieldType = Omit<Order, "id" | "quantity">;

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  addOrder: (order: Order) => void;
}


const statuses = getData.getOrderStatuses();
const products = getData.getProducts();

export const ModalOrderCreateForm = ({ open, onClose, addOrder }: ModalFormProps) => {
  const [form] = Form.useForm();
    
  useResetFormOnCloseModal({
    form,
    open,
  });

  const onOk = () => {
    form.submit();
  };

  const onFinish: FormProps<CreateOrderFieldType>["onFinish"] = (values: CreateOrderFieldType) => {
    const phone = "+7" + values.phone_number;
    const quantity = values.products.length;
    const orderDate = dayjs(values.order_date).format("YYYY-MM-DD HH:mm:ss");
    const expireDate = dayjs(values.expire_date).format("YYYY-MM-DD HH:mm:ss");
    const orderData: Order = {
      ...values,
      phone_number: phone,
      id: Date.now(),
      quantity,
      order_date: orderDate,
      expire_date: expireDate,
    };

    addOrder(orderData);
    onClose()
  };

  return (
    <Modal
      title="Создание нового заказа"
      open={open}
      onOk={onOk}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Создать
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="orderCreate"
        onFinish={onFinish}
      >
        <Form.Item<CreateOrderFieldType>
          name="order_id"
          label="Номер заказа"
          rules={[
            { required: true, message: "Поле не заполнено" },
          ]}
        >
          <Input addonBefore="№" placeholder="001" maxLength={3} />
        </Form.Item>
        <Form.Item<CreateOrderFieldType>
          name="products"
          label="Список товаров"
          rules={[
            { required: true, message: "Поле не заполнено" },
          ]}
        >
          <Select mode="multiple" placeholder="Товары" maxTagCount="responsive">
            {products &&
              products.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<CreateOrderFieldType>
              name="order_date"
              label="Дата оформления"
              rules={[
                { required: true, message: "Поле не заполнено" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      value &&
                      getFieldValue("expirationDate") &&
                      value > getFieldValue("expirationDate")
                    ) {
                      return Promise.reject(
                        new Error(
                          "Дата оформления не может быть позже даты хранения"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Выберите дату"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<CreateOrderFieldType>
              name="expire_date"
              label="Хранение до"
              rules={[
                { required: true, message: "Поле не заполнено" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      value &&
                      getFieldValue("orderDate") &&
                      value < getFieldValue("orderDate")
                    ) {
                      return Promise.reject(
                        new Error(
                          "Хранение до не может быть раньше даты оформления"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Выберите дату"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<CreateOrderFieldType>
          name="status_id"
          label="Статус заказа"
          rules={[
            { required: true, message: "Поле не заполнено" },
          ]}
        >
          <Select placeholder="Статус заказа">
            {
              statuses.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item<CreateOrderFieldType>
          name="customer_name"
          label="ФИО клиента"
          rules={[
            { required: true, message: "Поле не заполнено" },
          ]}
        >
          <Input placeholder="Иванов Иван Иванович" />
        </Form.Item>
        <Form.Item<CreateOrderFieldType>
          name="phone_number"
          label="Номер телефона"
          rules={[
            { required: true, message: "Поле не заполнено" },
          ]}
        >
          <Input
            addonBefore="+7"
            placeholder="Номер телефона без +7"
            maxLength={10}
          />
        </Form.Item>
        <Form.Item<CreateOrderFieldType>
          name="total_cost"
          label="Стоимость"
          rules={[
            { required: true, message: "Поле не заполнено" },
          ]}
        >
          <Input addonAfter="₽" placeholder="100" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
