export interface IFMenuBase {
    key: string;
    title: string;
    icon?: string;
    component?: string;
    query?: string;
    requireAuth?: string;
    route?: string;
    /** 是否登录校验，true不进行校验（访客） */
    login?: boolean;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenu[];
}

const menus: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        // 菜单相关路由
        { key: '/app/index', title: '首页', icon: 'SmileOutlined', component: 'Testpage1' },
        {
            key: '/app/project',
            title: '项目相关',
            icon: 'SmileOutlined',
            subs: [
                {
                    key: '/app/project/manage',
                    title: '项目管理',
                    component: 'ProjectManage',
                },
                {
                    key: '/app/project/dynamic',
                    title: '动态管理',
                    component: 'ProjectDynamic',
                },
            ],
        },
        {
            key: '/app/setting',
            title: '系统设置',
            icon: 'SettingOutlined',
            subs: [
                { key: '/app/setting/user', title: '用户管理', component: 'SettingUser' },
                { key: '/app/setting/sys', title: '设置', component: 'SettingSys' },
            ],
        },
        {
            key: '/app/table',
            title: '表格',
            icon: 'SmileOutlined',
            subs: [
                { key: '/app/table/basicTable', title: '基础表格', component: 'Testpage2' },
                { key: '/app/table/advancedTable', title: '高级表格', component: 'Testpage2' },
                {
                    key: '/app/table/asynchronousTable',
                    title: '异步表格',
                    component: 'Testpage2',
                },
            ],
        },
        {
            key: '/app/form',
            title: '表单',
            icon: 'SmileOutlined',
            subs: [{ key: '/app/form/basicForm', title: '基础表单', component: 'Testpage2' }],
        },
        {
            key: '/app/chart',
            title: '图表',
            icon: 'BarChartOutlined',
            subs: [
                { key: '/app/chart/echarts', title: 'echarts', component: 'Testpage2' },
                { key: '/app/chart/recharts', title: 'recharts', component: 'Testpage2' },
            ],
        },
        {
            key: '/app/auth',
            title: '权限管理',
            icon: 'SmileOutlined',
            subs: [
                { key: '/app/auth/basic', title: '基础演示', component: 'Testpage2' },
                {
                    key: '/app/auth/routerEnter',
                    title: '路由拦截',
                    component: 'Testpage2',
                    requireAuth: 'auth/testPage',
                },
            ],
        },
    ],
    others: [], // 非菜单相关路由
};

export default menus;
