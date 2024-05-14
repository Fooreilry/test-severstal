import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
    
    
  return (
    <main style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Result
          status={404}
          subTitle={404}
          title={"Страница не найдена =("}
          extra={
            <Link to="/">
              <Button type="primary">Вернуться на главную</Button>
            </Link>
          }
        />
    </main>
  );
}
