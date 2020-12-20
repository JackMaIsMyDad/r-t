import { Form, DatePicker, Button, Input } from "antd";
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
          <Form.Item label="fileName" name="fileName">
            <Input placeholder="fileName" />
          </Form.Item>
          <Form.Item label="dateRange" wrapperCol={{ span: 18 }}>
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Portal;
