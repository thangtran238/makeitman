import React, { useEffect, useState } from "react";
import LeftSidebar from "../parts/LeftSidebar";
import Header from "../parts/Header";
import axios from "axios";
import Order from "./receivers/Order";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const checkCommission = (price) => price * 0.1;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get-all-orders")
      .then((res) => {
        const data = res.data;
        setOrders(data);

        // Calculate total revenue
        const revenue = data.reduce(
          (total, order) => total + checkCommission(order.post.price),
          0
        );
        setTotalRevenue(revenue);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <LeftSidebar />
      <div className="body-wrapper">
        <Header />
        {orders && orders.length > 0 ? (
          <div className="container-fluid">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Buyer</th>
                  <th>Seller</th>
                  <th>Post Title</th>
                  <th>Price</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Commission</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <Order
                    key={order.id}
                    id={index + 1}
                    buyer={order.sender.full_name}
                    seller={order.recipient.full_name}
                    post_title={order.post.title}
                    price={order.post.price}
                    time={order.updated_at}
                    status={order.status}
                    commission={checkCommission(order.post.price)}
                  />
                ))}
              </tbody>
            </table>

            <div className="total-revenue">
              Total Revenue: ${totalRevenue}
            </div>
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}
