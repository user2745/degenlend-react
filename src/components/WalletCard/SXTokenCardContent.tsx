import React, { useEffect, useState } from 'react';
import { Flex, Card, Row, Radio, Divider, Button, Col, Form, Statistic, Segmented, Input, Tooltip, Space, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/Store';
import { UnknownAction } from '@reduxjs/toolkit';
import { InfoCircleOutlined } from '@ant-design/icons';
import { address } from '../../utils/web3';
import { updateSupplyBalance } from '../../feature/dashboard/supplyBalanceSlice';
import { approveWSX, supplyWSX, withdrawWSX, updatewsxsupplyRate, updateWSXBalance } from '../../feature/slices/WSXSlice';

const SXNetworkCardContent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    //variable declarations
    let depositAmount: number = 0;
    let withdrawAmount: number = 0;
    const wsxBalance = useSelector((state: RootState) => state.WSX.wsxBalance);
    const supplyRate = useSelector((state: RootState) => state.WSX.supplyRate);;
    const supplyBalance = useSelector((state: RootState) => state.WSX.supplyBalance);
    const myWalletAddress = useSelector((state: RootState) => state.metaMask.address);
    let WSX = new Intl.NumberFormat('en-US');
    const [isLendingEnabled, setIsLendingEnabled] = useState<boolean>(false);
    const [isWithdrawalsEnabled, setIsWithdrawlsEnabled] = useState<boolean>(false);
    const [isSupply, setSupply] = useState<boolean>(true);


    // function declarations
    const enableWSXHook = () => {
        dispatch(approveWSX({ amount: 100000000000000, addressToApprove: address.testnetWSX }));
        setIsLendingEnabled(true);
    }

    const enableDegenWSXHook = () => {
        dispatch(approveWSX({ amount: 100000000000000, addressToApprove: address.degenWSX }));
        setIsWithdrawlsEnabled(true);
    }

    const depositWSXHook = () => {
        dispatch(supplyWSX(depositAmount));
    }

    const withdrawWSXHook = () => {
        dispatch(withdrawWSX(withdrawAmount));
    }

    useEffect(() => {
        dispatch(updatewsxsupplyRate());
        dispatch(updateWSXBalance());
        dispatch(updateSupplyBalance(myWalletAddress));
    })

    // content

    function Content({ isSupply }: { isSupply: boolean }) {

        if (isSupply) return (
            <div>
                {isLendingEnabled ?
                    <div>
                        <Statistic
                            title="Supply Rate"
                            value={supplyRate}
                            precision={6}
                            suffix="%"
                        />
                        <Space.Compact style={{ width: '100%' }}>
                            <InputNumber
                                style={{ width: '100%', }}
                                size="large"
                                stringMode
                                onChange={(value) => { depositAmount = value! as number }}
                                prefix={<img width="20" height="20" src='https://s2.coinmarketcap.com/static/img/coins/64x64/8377.png' alt='WSX Token'></img>}
                                placeholder="Enter an amount"
                                controls={false}
                            />
                            <Button type="primary" size='large' onClick={depositWSXHook}>Deposit</Button>
                        </Space.Compact>
                    </div>
                    : <Button type="primary" size={'large'} onClick={enableWSXHook}> Approve WSX for Deposits </Button>
                }
                <p>Currently supplying {WSX.format(supplyBalance)} degenwSX</p>
            </div>
        )
        else return (
            <div>
                <Row gutter={4}>
                    <p>To supply, withdraw, or repay your Wrapped SX, you need to enable it first</p>
                </Row>
                {isWithdrawalsEnabled ?
                    <Space.Compact style={{ width: '100%' }}>
                        <InputNumber
                            style={{ width: '100%' }}
                            stringMode
                            size="large"
                            onChange={(value) => { withdrawAmount = value! as number }}
                            prefix={<img width="20" height="20" src='https://s2.coinmarketcap.com/static/img/coins/64x64/8377.png' alt='WSX Token'></img>}
                            placeholder="Enter an amount"
                            controls={false}
                        />
                        <Button type="primary" size='large' onClick={withdrawWSXHook}>Withdraw</Button>
                    </Space.Compact>
                    : <Button type="primary" size={'large'} onClick={enableDegenWSXHook}> </Button>
                }
            </div>
        );
    }

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyItems: "center" }}>
                <Col offset={11}>
                    <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/8377.png' alt='WSX Token'></img>
                </Col>
            </div>
            <Divider> Details </Divider>
            <Flex vertical align='center'>
                <Segmented
                    defaultValue="Supply"
                    style={{ marginBottom: 8 }}
                    options={['Supply', 'Withdraw']}
                    onChange={() => { setSupply(!isSupply) }}
                />
                <Content isSupply={isSupply} />
                <p>
                    Wallet Balance: {WSX.format(wsxBalance)} wSX
                </p>
            </Flex>
        </div>
    );
}

export default SXNetworkCardContent;
