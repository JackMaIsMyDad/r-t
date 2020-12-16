import { Radio, Form, DatePicker, Button, Checkbox } from "antd";
import React, { Component } from "react";

const { RangePicker } = DatePicker;
const plainOptions = ["Apple", "Orange"];

class Portal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: []
    };
    this.indeterminate = false;
    this.checkAll = false;
  }

  onChange = (list) => {
    console.log(list);
    this.setState({ checkedList: list });
    this.indeterminate = !!list.length && list.length < plainOptions.length;
    this.checkAll = list.length === plainOptions.length;
    // this.setState({ reportType: list.target.value })
  };

  onCheckAllChange = (e) => {
    console.log(e);
    this.setState({ checkedList: e.target.checked ? [...plainOptions] : [] });
    this.indeterminate = false;
    this.checkAll = e.target.checked;
    console.log(this.checkedList);
  };

  render() {
    return (
      <div>
        <Form
          {...this.layout}
          layout="inline"
          initialValues={{ remember: true }}
        >
          <Form.Item label="报表类型" name="reportType">
            <Radio.Group>
              <Radio value={0}>日报</Radio>
              <Radio value={1} disabled={true}>
                月报
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="日期范围"
            name="searchDate"
            wrapperCol={{ span: 18 }}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item
            label="平台统计方式"
            labelCol={{ span: 10 }}
            name="statisDateDimType"
          >
            <Radio.Group>
              <Radio value={0}>按汇总</Radio>
              <Radio value={1} disabled={true}>
                按明细
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="用户来源"
            name="checkedList"
            wrapperCol={{ span: 24 }}
          >
            <Checkbox
              indeterminate={this.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.checkAll}
              style={{ marginRight: "8px" }}
            >
              全选
            </Checkbox>
            <Checkbox.Group
              options={plainOptions}
              value={this.state.checkedList}
              onChange={this.onChange}
            ></Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Portal;
