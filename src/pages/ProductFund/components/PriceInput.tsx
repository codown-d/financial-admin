import { Form, Input, InputNumber, Select, Space } from "antd";

export function PriceInput() {
  return (
    <Space size={0}>
      <Form.Item noStyle name={'subscription_money'} >
        <InputNumber  style={{ width: 200 }} placeholder="请输入" />
      </Form.Item>
      <Form.Item noStyle name={'subscription_unit'} >
        <Select style={{ width: 80, margin: '0 8px' }}>
          <Select.Option value='1'>万元</Select.Option>
          <Select.Option value='2'>亿元</Select.Option>
        </Select>
      </Form.Item>
    </Space>
  );
}