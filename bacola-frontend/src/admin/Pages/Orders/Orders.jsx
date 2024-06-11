import React, { useContext, useEffect, useState, useCallback } from "react";
import { Table, Tag, Space, Button, Select, Row, Col, DatePicker } from "antd";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";
import "./Orders.css";
import { Mycontext } from "../../../App";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { url } = useContext(Mycontext);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [counts, setCounts] = useState({
    foodProcessing: 0,
    outForDelivery: 0,
    delivered: 0,
    total: 0,
  });
  const [dateRange, setDateRange] = useState([null, null]);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/order/list`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        calculateCounts(data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOrders = useCallback((status = "all") => {
    let filtered = orders;

    if (status !== "all") {
      filtered = filtered.filter(order => order.status === status);
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = moment(dateRange[0]).startOf('day');
      const endDate = moment(dateRange[1]).endOf('day');
      filtered = filtered.filter(order => {
        const orderDate = moment(order.createdAt);
        return orderDate.isBetween(startDate, endDate);
      });
    }

    setFilteredOrders(filtered);
    calculateTotalAmount(filtered);
  }, [orders, dateRange]);

  useEffect(() => {
    filterOrders();
  }, [orders, dateRange, filterOrders]);

  const onChange = (dates, dateStrings) => {
    setDateRange(dates);
  };

  const statusHandler = async (value, orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/order/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: value,
        }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Error updating order status:", error);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/order/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: 'Food Processing',
        }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error accepting order");
      }
    } catch (error) {
      toast.error("Error accepting order");
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/order/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: 'Rejected',
        }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error rejecting order");
      }
    } catch (error) {
      toast.error("Error rejecting order");
      console.error("Error rejecting order:", error);
    }
  };

  const calculateTotalAmount = (orders) => {
    const total = orders.reduce((sum, order) => sum + order.amount, 0);
    setTotalAmount(total);
  };

  const calculateCounts = (orders) => {
    const counts = {
      foodProcessing: orders.filter(order => order.status === 'Food Processing').length,
      outForDelivery: orders.filter(order => order.status === 'Out for delivery').length,
      delivered: orders.filter(order => order.status === 'Delivered').length,
      total: orders.length,
    };
    setCounts(counts);
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: ['address', 'firstName'],
      key: 'name',
      render: (text, record) => `${record.address.firstName} ${record.address.lastName}`,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <>
          <p>{address.street}</p>
          <p>{`${address.city}, ${address.state}, ${address.country}, ${address.zipcode}`}</p>
          <p>{address.phone}</p>
        </>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <span>
          {items.map((item, index) => (
            <Tag color="blue" key={index}>
              {item.name} x {item.quantity}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'Item Image',
      dataIndex: 'items',
      key: 'itemImage',
      render: (items) => (
        <div className="items-container">
          {items.map((item, index) => (
            <img
              key={index}
              src={url + "/images/" + item.image}
              alt={item.name}
              className="item-image"
            />
          ))}
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        record.status === "awaiting approval !" ? (
          <Space>
            <Button onClick={() => handleAccept(record._id)}>Accept</Button>
            <Button onClick={() => handleReject(record._id)}>Reject</Button>
          </Space>
        ) : (
          <Select
            defaultValue={record.status}
            style={{ width: 150 }}
            onChange={(value) => statusHandler(value, record._id)}
          >
            <Option value="Food Processing">Food Processing</Option>
            <Option value="Out for delivery">Out for delivery</Option>
            <Option value="Delivered">Delivered</Option>
          </Select>
        )
      ),
    },
  ];

  return (
    <div className="order">
      <div className="range-picker-container">
        <RangePicker onChange={onChange} className="range-picker" />
      </div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Button className="orders-button" onClick={() => filterOrders("Food Processing")}>
            Food Processing ({counts.foodProcessing})
          </Button>
        </Col>
        <Col span={6}>
          <Button className="orders-button" onClick={() => filterOrders("Out for delivery")}>
            Out for delivery ({counts.outForDelivery})
          </Button>
        </Col>
        <Col span={6}>
          <Button className="orders-button" onClick={() => filterOrders("Delivered")}>
            Delivered ({counts.delivered})
          </Button>
        </Col>
        <Col span={6}>
          <Button className="orders-button" onClick={() => filterOrders("all")}>
            Total Amount: ${totalAmount}
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredOrders} rowKey="_id" className="orders-table" />
    </div>
  );
};

export default Orders;
