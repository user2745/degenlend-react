import React, { useState, useEffect } from "react";
import { Card, Row, Col, Skeleton } from "antd";
import metamasklogo from "../../assets/metamask-logo.jpg";
import walletconnectlogo from "../../assets/walletconnect-logo.png";

const WalletCardContent: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);

  return (
    <div>
      {isActive ? (
        <div>
          <Row>
            <Col span={6}>
              <Skeleton active style={{ width: 240, height: 130 }} />
            </Col>
            <Col span={6} offset={6}>
              <Skeleton active style={{ width: 240, height: 130 }} />
            </Col>
          </Row>
        </div>
      ) : (
        <div>
          <Row>
            <Col span={6}>
              <Card
                bordered={true}
                hoverable
                style={{ width: 240, height: 130 }}
                cover={<img alt="Metamask" src={metamasklogo}></img>}
              ></Card>
            </Col>
            <Col span={6} offset={6}>
              <Card
                bordered={true}
                hoverable
                style={{ width: 240, height: 130 }}
                cover={<img alt="WalletConnect" src={walletconnectlogo}></img>}
              ></Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default WalletCardContent;
