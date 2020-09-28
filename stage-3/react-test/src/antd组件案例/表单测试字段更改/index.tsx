import React, { Component } from 'react'

import { Form, Icon, Input, Button } from 'antd';
import { FormProps } from 'antd/lib/form';

interface IProps extends FormProps {}

class HorizontalLoginForm extends React.Component<IProps, {}> {
  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(this.props.form.isFieldsTouched());
    
  };

  reset = () => {
      this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div>
          <Button onClick={this.reset}>reset</Button>
          <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default class index extends Component {
    render() {
        return (
            <div>
                <WrappedHorizontalLoginForm />
            </div>
        )
    }
}
