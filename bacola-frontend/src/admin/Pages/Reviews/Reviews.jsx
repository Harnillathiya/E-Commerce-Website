import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input } from 'antd';
import { BASE_URL } from '../../../config';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [productSearchQuery, setProductSearchQuery] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${BASE_URL}/ratings/getrating`);
                const data = await response.json();
                if (response.ok) {
                    setReviews(data.ratings);
                } else {
                    console.error('Error fetching reviews:', data.message);
                }
                console.log(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const filteredReviews = reviews.filter(
        review =>
            review.productName.toLowerCase().includes(productSearchQuery.toLowerCase()) 
    );

    return (
        <div>
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col span={12}>
                    <Input.Search
                        placeholder="Search reviews by username or product name..."
                        enterButton="Search"
                        size="large"
                        onChange={e => setProductSearchQuery(e.target.value)}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
                <Col span={8}>
                    <h3>User Name</h3>
                </Col>
                <Col span={8}>
                    <h3>Product Name</h3>
                </Col>
                <Col span={8}>
                    <h3>Rating</h3>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review, index) => (
                        <React.Fragment key={index}>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <p>{review.userName}</p>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <p>{review.productName}</p>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <p>{review.source}</p>
                                </Card>
                            </Col>
                        </React.Fragment>
                    ))
                ) : (
                    <Col span={24}>
                        <Card bordered={false}>
                            <p>No reviews found</p>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Reviews;
