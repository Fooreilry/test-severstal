import { Tag } from "antd";
import { getData } from "./getData";

export const statusName = (statusId: number) =>
  statusNameTag(
    getData.getOrderStatuses().find((status) => status.id === statusId)?.name
  );
const statusNameTag = (statusName?: string) => {
  if (!statusName) return (
    <Tag style={{ fontSize: "14px" }} color="gray">
      Неизвестный статус
    </Tag>
  );
  if (statusName === "Собирается")
    return (
      <Tag style={{ fontSize: "14px" }} color="blue">
        {statusName}
      </Tag>
    );
  if (statusName === "Готов к выдаче")
    return (
      <Tag style={{ fontSize: "14px" }} color="green">
        {statusName}
      </Tag>
    );
  if (statusName === "Отменён")
    return (
      <Tag style={{ fontSize: "14px" }} color="red">
        {statusName}
      </Tag>
    );
  if (statusName === "Выдан")
    return (
      <Tag style={{ fontSize: "14px" }} color="purple">
        {statusName}
      </Tag>
    );
};
