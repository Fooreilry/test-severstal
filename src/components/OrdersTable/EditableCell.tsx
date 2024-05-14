import { DatePicker, Form, Input, Select } from "antd";
import { getData } from "../../lib/utils/getData";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: undefined | string;
  inputType: "select" | "date" | "text";
  children: React.ReactNode;
}

const orderStatuses = getData.getOrderStatuses();

const findInputNode = (inputType: string) => {
  if (inputType === "date")
    return (
      <DatePicker
        style={{ width: 200 }}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Выберите дату"
      />
    );
  if (inputType === "select")
    return (
      <Select placeholder="Статус заказа">
        {orderStatuses.map(({ id, name }) => (
          <Select.Option key={id} value={id}>
            {name}
          </Select.Option>
        ))}
      </Select>
    );
  return <Input />;
};

export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}: EditableCellProps) => {
  const inputNode = findInputNode(inputType);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Заполните поле ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
