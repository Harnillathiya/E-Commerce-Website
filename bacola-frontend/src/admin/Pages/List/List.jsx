import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Button, Image, Space, Typography, Modal, Form, Input, InputNumber } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import "./List.css";
import { BASE_URL } from "../../../config";

const { Title } = Typography;
const { TextArea } = Input;

const List = () => {
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listProduct();
  }, []);

  const listProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/list`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setList(data.data);
        } else {
          toast.error("Error fetching product list");
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/products/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          listProduct();
        } else {
          toast.error("Error removing product");
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const updateProduct = (product) => {
    setFormData(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/products/updateProduct/${formData._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          listProduct();
          setIsModalVisible(false);
        } else {
          toast.error("Error updating product");
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image width={50} src={`http://localhost:9000/images/${text}`} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeProduct(record._id)}
          >
            Remove
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => updateProduct(record)}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="list-container">
      <Title level={2} className="table-title">All Food List</Title>
      <Table
        columns={columns}
        dataSource={list}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Update Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Price">
            <InputNumber
              name="price"
              value={formData.price}
              onChange={(value) => handleNumberChange(value, "price")}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Input
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Quantity">
            <InputNumber
              name="quantity"
              value={formData.quantity}
              onChange={(value) => handleNumberChange(value, "quantity")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default List;
