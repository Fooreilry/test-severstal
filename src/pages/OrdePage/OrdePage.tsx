import { Button, Flex, Tabs, Typography } from "antd"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { useLayoutEffect } from "react"
import { ArrowLeftOutlined} from "@ant-design/icons"
import { OrderStepProgress } from "../../components/OrderStepProgress/OrderStepProgress"
import { OrderInfo } from "../../components/OrderInfo/OrderInfo"
import { getData } from "../../lib/utils/getData"

const { Title } = Typography



export default function OrdePage() {
  const { id } = useParams()
  const [serchParams, setSerchParams] = useSearchParams()


    useLayoutEffect(() => {
      const currentTab = serchParams.get("tab");

      if (!currentTab) {
        setSerchParams({ tab: "1" }, { replace: true });
      }

    }, [serchParams]);
    

  const orderInfo = getData.getOrder(id)


  
  return (
    <main>
        <Link to="/">
          <Button
            type="link"
            size="large"
            style={{ marginTop: 30, padding: 0 }}
            icon={<ArrowLeftOutlined />}
            iconPosition="start"
          >
            Список заказов
          </Button>
        </Link>

        <Title style={{ marginTop: 20 }} level={2}>
          Заказ №{id}
        </Title>
      <section>
        {orderInfo ? (
          <Tabs
            size="large"
            activeKey={serchParams.get("tab")}
            onChange={(tabKey) => {
              setSerchParams({ tab: tabKey });
            }}
          >
            <Tabs.TabPane tab="Информация" key="1">
              <OrderInfo order={orderInfo} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="История" key="2">
              <OrderStepProgress order={orderInfo} />
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <Title style={{ margin: 0 }} level={3}>
            Информация о заказе не найдена
          </Title>
        )}
      </section>
    </main>
  );
}
