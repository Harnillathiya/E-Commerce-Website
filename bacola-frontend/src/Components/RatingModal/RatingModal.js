import React, { useState } from 'react';
import { Modal, Rate, Button, Input } from 'antd';
import './RatingModal.css';

const RatingModal = ({ isOpen, product, onClose, onRate }) => {
    const [rating, setRating] = useState(product.rating || 0);
    const [comment, setComment] = useState('');

    const handleRateChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        onRate(product._id, rating, comment);
        onClose();
    };

    return (
        <Modal
            title={`Rate ${product.name}`}
            visible={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                </Button>,
            ]}
        >
            <p>{product.description}</p>
            <Rate allowHalf value={rating} onChange={handleRateChange} />
            <Input.TextArea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Leave a comment"
                rows={4}
            />
        </Modal>
    );
};

export default RatingModal;
