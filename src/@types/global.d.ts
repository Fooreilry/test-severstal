interface Order {
    id: number;
    order_id: string;
    quantity: number;
    order_date: string;
    expire_date: string;
    status_id: number;
    customer_name: string;
    phone_number: string;
    total_cost: number;
    products: number[];
}

interface Product {
    id: number;
    article: number;
    name: string;
    description: string;
    price: number;
}

interface OrderStatus {
    id: number;
    name: string;
}

interface Data {
  orders: Order[];
  products: Product[];
  order_statuses: OrderStatus[];
}