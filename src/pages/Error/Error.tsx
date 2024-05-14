import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <main style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Result
        status={error.status}
        subTitle={error.status}
        title={error.statusText}
        extra={
          <Link to="/">
            <Button type="primary">Вернуться на главную</Button>
          </Link>
        }
      />
    </main>
  );
}
