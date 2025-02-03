import {useState} from 'react'
import {krwToUsd, krwToVnd, usdToKrw, usdToVnd, vndToKrw, vndToUsd} from "./exchange"
import {Col, Divider, Form, InputNumber, Layout, Row, Statistic, Table} from "antd"

const usdToVndDataSources = [10, 20, 50, 100, 200].map((it) => ({
    usd: it,
    vnd: usdToVnd(it).toLocaleString(),
}));

const krwToVndDataSources = [10000, 20000, 50000].map((it) => ({
    krw: it,
    usd: krwToUsd(it).toFixed(2),
    vnd: usdToVnd(krwToUsd(it)).toLocaleString(),
}))

function App() {
    const [form] = Form.useForm()

    const onChange = (values) => {
        if (typeof values.krw !== 'undefined') {
            const krw = values.krw
            const usd = krwToUsd(krw)
            const vnd =  usdToVnd(usd)

            form.setFieldsValue({
                usd,
                krw,
                vnd,
            })
        }

        if (typeof values.usd !== 'undefined') {
            const usd = values.usd
            const krw = usdToKrw(usd)
            const vnd =  usdToVnd(usd)

            form.setFieldsValue({
                usd,
                krw,
                vnd,
            })
        }

        if (typeof values.vnd !== 'undefined') {
            const vnd =  values.vnd
            const usd = vndToUsd(vnd)
            const krw = vndToKrw(vnd)

            form.setFieldsValue({
                usd,
                krw,
                vnd,
            })
        }
    }

    return (
        <>
            <Form form={form} layout={'vertical'} onValuesChange={onChange}>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Form.Item name={'krw'} label={'KRW'}>
                            <InputNumber controls={false}
                                         formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                         parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name={'usd'} label={'USD'}>
                            <InputNumber controls={false}
                                         formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                         parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name={'vnd'} label={'VND'}>
                            <InputNumber controls={false}
                                         formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                         parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Divider />
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Table columns={[{
                        key: 'usd',
                        dataIndex: 'usd',
                        title: 'USD'
                    }, {
                        key: 'vnd',
                        dataIndex: 'vnd',
                        title: 'USD => VND'
                    }]}
                           rowKey={'usd'}
                           pagination={false}
                           dataSource={usdToVndDataSources}/>
                </Col>
                <Col span={24}>

                    <Table columns={[{
                        key: 'krw',
                        dataIndex: 'krw',
                        title: 'KRW'
                    }, {
                        key: 'usd',
                        dataIndex: 'usd',
                        title: 'KRW => USD'
                    }, {
                        key: 'vnd',
                        dataIndex: 'vnd',
                        title: 'KRW => USD => VND'
                    }]}
                           rowKey={'krw'}
                           pagination={false}
                           dataSource={krwToVndDataSources}/>
                </Col>
            </Row>
        </>
    )
}

export default App
