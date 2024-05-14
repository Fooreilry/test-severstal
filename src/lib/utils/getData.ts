import data from "../constants/data.json";

class GetData {
  private dataInfo;

  constructor(dataInfo: Data) {
    this.dataInfo = dataInfo;
  }

  public getProducts = (): Product[] => this.dataInfo.products;
  public getOrders = (): Order[] => this.dataInfo.orders;
  public getOrderStatuses = (): OrderStatus[] => this.dataInfo.order_statuses;
  public getOrder = (id?: string): Order | undefined =>
    this.dataInfo.orders.find((order) => order.order_id === id);
  public getProductsInfo = (productsArticle: number[]): Product[] =>
    this.dataInfo.products.filter((product) =>
      productsArticle.includes(product.article)
    );
}

export const getData = new GetData(data)