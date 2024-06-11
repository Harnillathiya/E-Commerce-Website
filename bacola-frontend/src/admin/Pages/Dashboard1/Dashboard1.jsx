import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Modal, Table, message } from 'antd';
import { BASE_URL } from '../../../config';
import './Dashboard1.css';

const { Header, Content } = Layout;

const Dashboard1 = () => {
  const [stats, setStats] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/alluser`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      message.error('Failed to fetch data');
    }
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Products',
      dataIndex: 'productCount',
      key: 'productCount',
    },
  ];

  return (
    <Layout>
      <Header style={{ color: 'white' }}>Dashboard</Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="User Count" className="items-card">
              {stats.userCount}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Admin Count" className="items-card">
              {stats.adminCount}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Items Count" onClick={handleModal} className="items-card">
              {stats.itemsCount}
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Orders Count" className="items-card">
              {stats.ordersCount}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Amount" className="items-card">
            ${stats.totalAmount}
            </Card>
          </Col>
        </Row>
        <Modal
          title="Category Details"
          visible={modalVisible}
          onCancel={handleModal}
          footer={null}
          className="custom-modal"
        >
          <Table
            dataSource={stats.categories}
            columns={columns}
            pagination={false}
            className="modal-table"
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default Dashboard1;
