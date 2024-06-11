import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, message, Upload, List, Row, Col, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../../config';
import { Mycontext } from '../../../App';
import './Category.css';

const { Title } = Typography;

const AddCategory = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const { url } = useContext(Mycontext);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/category/all`);
      const result = await response.json();
      if (result.success) {
        setCategories(result.categories);
      } else {
        message.error(result.error);
      }
    } catch (error) {
      message.error('Failed to fetch categories');
      console.error('Failed to fetch categories:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      if (!image) {
        message.error('Please upload a category image');
        return;
      }

      const formData = new FormData();
      formData.append('name', values.categoryName);
      formData.append("image", image);

      const response = await fetch(`${BASE_URL}/category/add`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.category) {
        message.success(result.message);
        form.resetFields();
        setImage(null);
        setCategories([...categories, result.category]);
      } else {
        message.error(result.error);
      }
    } catch (error) {
      message.error('Failed to add category');
      console.error('Failed to add category:', error);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'removed') {
      setImage(null);
      return;
    }
    const isImage = info.file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return;
    }
    setImage(info.file);
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/category/remove/${categoryId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        message.success(result.message);
        fetchAllCategories(); // Refresh the categories list
      } else {
        message.error(result.error);
      }
    } catch (error) {
      message.error('Failed to remove category');
      console.error('Failed to remove category:', error);
    }
  };

  const transformImagePath = (path) => {
    return `${url}/images/${path}`;
  };

  return (
    <div className="add-category-container">
      <Title level={2} className="title">Manage Categories</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form form={form} onFinish={onFinish} layout="vertical" className="add-category-form">
            <Form.Item
              name="categoryName"
              label="Category Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the category name!',
                },
              ]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>
            <Form.Item
              className="add-img-upload"
              name="image"
              valuePropName="file"
              getValueFromEvent={(e) => (Array.isArray(e) ? e.file : e && e.file)}
              rules={[{ required: true, message: "Please upload a category image" }]}
            >
              <Upload
                name="image"
                listType="picture"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageChange}
              >
                <Button icon={<UploadOutlined />}>
                  {image ? image.name : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Title level={4} className="list-title">Categories List</Title>
          <List
            bordered
            header={
              <div className="list-header">
                <span className="header-image">Image</span>
                <span className="header-name">Name</span>
                <span className="header-actions">Actions</span>
              </div>
            }
            dataSource={categories}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveCategory(item._id)}
                  >
                    Remove
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<img src={transformImagePath(item.image)} alt={item.name} className="category-image" />}
                  title={item.name}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddCategory;
















