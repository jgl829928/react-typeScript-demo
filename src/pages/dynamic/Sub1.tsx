import React from 'react';
import { Row, Col, Card } from 'antd';

const SmenuSub1 = () => {
    return (
        <div>
            <Row gutter={16}>
                <Col md={24}>
                    <Card title="动态路由" bordered={false}>
                        <div>动态路由1</div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SmenuSub1;
