import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { IFMenu } from '../../routes/config';
import { SmileOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
import { useLocation } from 'react-router-dom'

type SiderMenuProps = {
    menus: IFMenu[];
};


const getIcon = (type: string) => {
    const Icons:any=Icon
    const IconCom = Icons[type]
    return IconCom?<IconCom />:<SmileOutlined/>
}

const renderMenuItem = (item: IFMenu) => {

    return (
        <Menu.Item key={item.key}>
            <Link to={(item.route || item.key) + (item.query || '')}>
                {
                    item.icon && getIcon(item.icon)
                }
                <span className="nav-text">{item.title}</span>
            </Link>
        </Menu.Item>
    )
}

const renderSubMenu = (item: IFMenu) => {
    return (
        <Menu.SubMenu
            key={item.key}
            title={
                <span>
                    {
                        item.icon && getIcon(item.icon)
                    }
                    <span className="nav-text">{item.title}</span>
                </span>
            }
        >
            {item.subs!.map((sub) => (sub.subs ? renderSubMenu(sub) : renderMenuItem(sub)))}
        </Menu.SubMenu>
    );
}



const SiderMenu = ({ menus, ...props }: SiderMenuProps) => {

    const [selectedKey, setSelectedKey] = useState<string>("")

    const menuClick = (e: any) => {
        setSelectedKey(e.key)
    }
    // 获取当前路由
    const location = useLocation();
    useEffect(() => {
        setSelectedKey(location.pathname || '/')
    }, [])

    return (
        <Menu mode="inline" theme="dark" selectedKeys={[selectedKey]} onClick={menuClick}>
            {
                menus.map((item: IFMenu, index: number) => {
                    return item.subs!
                        ? renderSubMenu(item)
                        : renderMenuItem(item)
                })
            }
        </Menu>
    )
}

export default React.memo(SiderMenu);

