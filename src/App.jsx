import {useState} from 'react'
import {krwToUsd, krwToVnd, usdToKwr, usdToVnd} from "./exchange"
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
    const [vnd, setVnd] = useState({usd: 0, krw: 0})

    const onChange = (values) => {
        if (typeof values.krw !== 'undefined') {
            const krw = values.krw
            const usd = krwToUsd(krw)

            form.setFieldValue('usd', usd)
            setVnd({usd: usdToVnd(usd), krw: krwToVnd(krw)})
        }

        if (typeof values.usd !== 'undefined') {
            const usd = values.usd
            const krw = usdToKwr(usd)

            form.setFieldValue('krw', krw)
            setVnd({usd: usdToVnd(usd), krw: krwToVnd(krw)})
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
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Statistic title="KRW => VND" value={vnd.krw}/>
                    </Col>
                    <Col>
                        <Statistic title="USD => VND" value={vnd.usd}/>
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
