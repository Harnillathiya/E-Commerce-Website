import React, { useContext, useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Steps, Row, Col, Radio, Space } from "antd";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { Mycontext } from "../../App";
import './Useroder.css';

const UserOrder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filterStatus, setFilterStatus] = useState(null);
    const { url } = useContext(Mycontext);
    const [position, setPosition] = useState('Delivered');

    const getStepIndex = (status) => {
        const statuses = ['Food Processing', 'Out For Delivery', 'Delivered'];
        return statuses.indexOf(status);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${BASE_URL}/order/list`);
            const data = await response.json();
            if (data.success) {
                setOrders(data.data);
            } else {
                toast.error("Error fetching orders");
                console.error("Error fetching orders:", data.message);
            }
        } catch (error) {
            toast.error("Error fetching orders");
            console.error("Error fetching orders:", error);
        }
    };

    const showModal = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const filterOrders = (status) => {
        setFilterStatus(status);
    };

    const filteredOrders = filterStatus ? orders.filter(order => order.status === filterStatus) : orders;

    const columns = [
        {
            title: "Customer Name",
            dataIndex: ["address", "firstName"],
            key: "name",
            render: (text, record) =>
                `${record.address.firstName} ${record.address.lastName}`,
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (address) => (
                <>
                    <p>{address.street}</p>
                    <p>{`${address.city}, ${address.state}, ${address.country}, ${address.zipcode}`}</p>
                    <p>{address.phone}</p>
                </>
            ),
        },
        {
            title: "Items",
            dataIndex: "items",
            key: "items",
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
            title: "Item Image",
            dataIndex: "items",
            key: "itemImage",
            render: (items) => (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {items.map((item, index) => (
                        <img
                            key={index}
                            src={url + "/images/" + item.image}
                            alt={item.name}
                            style={{ width: 50, height: 50, marginRight: 8, marginBottom: 8 }}
                        />
                    ))}
                </div>
            ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `$${amount}`,
        },
        {
            title: "Status",
            key: "status",
            render: (_, record) => (
                <Button onClick={() => showModal(record)}>Track Order</Button>
            ),
        },
    ];

    return (
        <div className="order user">
            <Space>
                <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
                    <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
                        <Col span={12}>
                            <Radio.Button className="detais_btn" value="Processing" onClick={() => filterOrders(null)}><span>Processing </span></Radio.Button>
                        </Col>
                        <Col span={12}>
                            <Radio.Button className="detais_btn" value="Delivered" onClick={() => filterOrders("Delivered")}><span>Delivered</span></Radio.Button>
                        </Col>
                    </Row>
                </Radio.Group>
            </Space>
            <Table columns={columns} dataSource={filteredOrders} rowKey="_id" />
            <Modal
                title="Order Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedOrder && (
                    <div>
                        <Steps
                            direction="vertical"
                            current={getStepIndex(selectedOrder.status)}
                            items={[
                                { title: 'Food Processing' },
                                { title: 'Out For Delivery' },
                                { title: 'Delivered' }
                            ]}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UserOrder;
