import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Upload, Select, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Mycontext } from "../../../App";
import { BASE_URL } from "../../../config";
import "./Add.css";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Add = ({ url }) => {
  const { setIsHeaderShow } = useContext(Mycontext);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsHeaderShow(false);
    fetchCategories();
  }, [setIsHeaderShow]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/category/all`);
      const result = await response.json();
      if (result.success) {
        setCategories(result.categories);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("Error fetching categories");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
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

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", Number(values.price));
    formData.append("category", values.category);
    formData.append("image", image);
    formData.append("quantity", Number(values.quantity));

    try {
      const response = await fetch(`${BASE_URL}/products/add`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        form.resetFields();
        setImage(null);
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("Error adding product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-container">
      <Title level={2}>Add Product</Title>
      <Form
        form={form}
        className="add-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          className="add-img-upload"
          name="image"
          valuePropName="file"
          getValueFromEvent={(e) => (Array.isArray(e) ? e.file : e && e.file)}
          rules={[{ required: true, message: "Please upload a product image" }]}
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
        {image && (
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              style={{ maxWidth: '100%' }}
            />
          </div>
        )}
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input the product name" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: "Please input the product description" }]}
        >
          <TextArea rows={4} placeholder="Write content here" />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="category"
          rules={[{ required: true, message: "Please select a product category" }]}
        >
          <Select loading={loading}>
            {categories.map(category => (
              <Option key={category._id} value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Please input the product price" }]}
        >
          <Input type="number" placeholder="$20" />
        </Form.Item>
        <Form.Item
          label="Product Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input the product quantity" }]}
        >
          <Input type="number" placeholder="1" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="add-btn">
            ADD
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Add;
