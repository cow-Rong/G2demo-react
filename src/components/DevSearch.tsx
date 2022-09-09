import { Form, Input, Button, Checkbox, Select, DatePicker, Row, Col, Divider } from 'antd';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { SelectTagRow } from './SelectTagRow';
import styles from './style.module.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface PropsType {
    formData: Array<any>,
    onFinish: (value: any) => void,
    initialValues?: any,
    containerstyle?: any,
    handleSelectChange: (key: string, value: any) => void,
    handleTimeChange?: (value: any, dateString: [string, string]) => void,
}


export const DevSearch = (prop: PropsType) => {
    const [timeR, setTime] = useState<[moment.Moment | null, moment.Moment | null] | null>([moment().subtract(1, 'days'), moment()])
    const { formData, onFinish, initialValues, containerstyle, handleSelectChange, handleTimeChange } = prop;
    const [form] = Form.useForm();
    console.log(formData)
    const getItem = (item: any) => {
        switch (item.type) {
            case 'Input':
                return <Form.Item
                    name={item['name']}
                    label={item['label']}
                    rules={item['rules']}
                    key={item['name']}
                >
                    <Input allowClear/>
                </Form.Item>
            case 'Checkbox':
                return <Form.Item
                    name={item['name']}
                    label={item['label']}
                    rules={item['rules']}
                    key={item['name']}
                >
                    <Checkbox.Group options={item['data']}></Checkbox.Group>
                </Form.Item>
            case 'Select':
                return <Form.Item
                    name={item['name']}
                    label={item['label']}
                    rules={item['rules']}
                    key={item['name']}
                ><Select
                    defaultValue={item['data'].defaultValue}
                    allowClear
                    mode={item['data'].mode}
                >
                        {
                            item['data'].options.map((item: any) => {
                                return <Option value={item.value}>{item.label}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            case 'TimeRange':
                return <Form.Item
                    name={item['name']}
                    label={item['label']}
                    rules={item['rules']}
                    key={item['name']}
                > <RangePicker
                        format={item['data']['dateFormat']}
                    />
                </Form.Item>
            default:
                return null
        }
    }

    const getFields = (items: Array<any>) => {
        const children = [];
        for (let i = 0; i < items.length; i++) {
            children.push(
                <Col span={items[i]['span']||5}>
                {getItem(items[i])}
                </Col>
            );
        }
        return children;
    };

    return (
        <div style={containerstyle}>
            {formData.filter(item => item.type === 'SelectTag').map(row => {
                return <>
                    <SelectTagRow label={row.label} data={row.data} selectChange={(value: any) => handleSelectChange(row.name, value)}></SelectTagRow><Divider />
                </>
            })}
            <Row style={{ width: '100%',display:'flex' }}>
                {formData.filter(item => item.type === 'TimeRange').map(item => {
                    return <Col span={4}>
                        <RangePicker
                            ranges={{
                                今天: [moment().subtract(1, 'days'), moment()],
                                本周: [moment().startOf('weeks'), moment()],
                                最近七天: [moment().subtract(6, 'days'), moment()],
                                本月: [moment().startOf('month'), moment()]
                            }}
                            format={item['data']['dateFormat']}
                            value={timeR}
                            onChange={(value: any, dateString: [string, string]) => { setTime(value); handleTimeChange &&handleTimeChange(value, dateString) }}
                        />
                    </Col>
                })}
                <div style={{flex:1}}>
                    <Form autoComplete="off"
                        form={form}
                        name="advanced_search"
                        className={styles['ant-advanced-search-form']}
                        onFinish={onFinish}
                        layout={'inline'}
                        initialValues={initialValues}
                    >
                        <Row style={{ width: '100%' }}>
                            {getFields(formData.filter(data => (data.type !== 'SelectTag' && data.type !== 'TimeRange')))}
                            <Col span={2} style={{paddingLeft:'12px'}}>
                            <Form.Item
                                key={'btn'}
                            >
                                <Button type="primary" htmlType="submit" style={{ margin: '0 8px 0 0', display: 'inline-block' }}>
                                    查询
                                </Button>
                            </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Row>
        </div >
    )
}


