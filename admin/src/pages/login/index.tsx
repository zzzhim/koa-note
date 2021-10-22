import React from 'react'
import { history } from 'umi'
import styles from './index.scss'
import { login } from "../../../api/login"
import { setToken, setUserInfo } from "../../../utils/auth"
import { Response } from "../../../types/common"
import { UserInfo } from "../../../types/login"

import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default function Page() {
  const onFinish = async (values: any) => {
    const res: Response<UserInfo> = await login({
      username: values.username,
      password: values.password,
    })

    if(res.code === 200) {
      setUserInfo(res.data)
      setToken(res.data?.token || "")
      history.push('/dashboard')
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.block}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账户!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账户" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.btn}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}
