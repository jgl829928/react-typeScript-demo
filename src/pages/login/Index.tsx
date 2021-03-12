/**
 * Created by hao.cheng on 2017/5/7.
 */
import React from 'react';
import style from "./index.module.less"
import { Form, Input, Button } from 'antd';
import { connectAlita } from 'redux-alita';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';
import { FormInstance } from 'antd/lib/form';
import { getToken, formSubmit } from "../../axios/login"
import { IFMenu } from '../../routes/config';

type LoginProps = {
    setAlitaState: (param: any) => void;
    auth: any;
} & RouteComponentProps &
    FormProps;

class Login extends React.Component<LoginProps> {

    formRef = React.createRef<FormInstance>();
    componentDidMount() {
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });
        sessionStorage.clear();
    }
    componentDidUpdate(prevProps: LoginProps) {
        // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.token) {
            // 判断是否登陆
            history.push('/');
        }
    }
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    onFinish = async (values: any) => {
        let res = await getToken({ ...values, grant_type: 'password' });
        if (res && res.isSucceed) {
            const { setAlitaState } = this.props;
            const data: { token: string, userInfo: any, menu: IFMenu[] } = {
                token: res.data.token_type + " " + res.data.access_token,
                userInfo: res.data,
                menu: [{
                    icon: "SmileOutlined",
                    key: "/app/smenu",
                    subs:
                        [{ key: "/app/smenu/sub1", title: "动态菜单1", component: "Sub1" },
                        { key: "/app/smenu/sub2", title: "动态菜单2", component: "Sub2" }],
                    title: "动态菜单"
                }]
            }
            sessionStorage.setItem("menu", JSON.stringify(data.menu));
            sessionStorage.setItem("userInfo", JSON.stringify(data.userInfo));
            sessionStorage.setItem("token", data.token);
            setAlitaState({ data: data, stateName: 'auth' });
            this.login();
        }
    };
    login = async () => {
        let res = await formSubmit();
        if (res && res.isSucceed) {
            const { history } = this.props;
            history.push('/');
        }
    }
    render() {
        const layout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        };
        return (
            <div className={style.login_content}>
                <div className={style.login_header}>
                    <img src={require("../../style/imgs/logoo.png").default} className={style.login_header__icon} alt="" />
                    <img src={require("../../style/imgs/logo.png").default} className={style.login_header__name} alt="" />
                </div>
                <div className={style.login_form}>
                    <div className={style.form_left}>
                        <img src={require("../../style/imgs/logo-3.png").default} className={style.form_left__img} alt="" />
                    </div>
                    <div className={style.form_right}>
                        <p>管理员登录</p>
                        <Form
                            ref={this.formRef}
                            {...layout}
                            name="basic"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <p className={style.form_item__label}>账号</p>
                            <Form.Item
                                name="username"
                                className={style.form_item}
                                rules={[{ required: true, message: '请输入账号' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
                            </Form.Item>
                            <p className={style.form_item__label}>密码</p>
                            <Form.Item
                                name="password"

                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>

                            <Form.Item className={style.form_item}>
                                <Button type="primary" htmlType="submit" className={style.form_submit__btn}>
                                    登录
                                    </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className={style.login_footer}>
                    Copyright© 2018-2020 VITO.com All Rights Reserved.
                </div>
            </div>
        );
    }
}


export default connectAlita(['auth'])(Login);
