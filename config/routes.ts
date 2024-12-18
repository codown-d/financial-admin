import { role_type } from "@/constants";

const routes = [
  {
    path: '',
    redirect: '/customer',
  },
  {
    name: 'login',
    title: '登录',
    path: '/login',
    component: './Login',
    layout: false,
    hideInMenu: true,
  },
  {
    name: '客户管理',
    title: '客户管理',
    icon: 'user',
    path: '/customer',
    hideInBreadcrumb: true,
    // flatMenu:true,
    // redirect: '/customer/customer-list',
    // component: './Home',
    // meta: { customParam: 'customValue' },
    component: '@/layouts/TzPageContainer',
    routes: [
      {
        path: '',
        redirect: '/customer/customer-list',
      },
      {
        name: '客户列表',
        title: '客户列表',
        path: '/customer/customer-list',
        key:'customerList',
        component: './CustomerList',
      },
      {
        name: '金融机构列表',
        title: '金融机构列表',
        path: '/customer/financial-list',
        component: './FinancialList',
        key:'financialList',
      },
      {
        name: '政府部门列表',
        title: '政府部门列表',
        path: '/customer/government-list',
        component: './GovernmentList',
        key:'governmentList',
      },
    ],
  },
  {
    name: '',
    title: '',
    path: '',
    component: '@/layouts/TzPageSubContainer',
    hideInMenu: true,
    routes: [
      {
        name: '详情',
        title: '详情',
        path: '/customer/customer-list/customer-info',
        component: './CustomerInfo',
        breadcrumb: [
          { title: '客户列表', path: '/customer/customer-list' },
          { title: '客户详情' },
        ],
      },
      {
        name: '详情',
        title: '详情',
        path: '/customer/financial-list/info',
        component: './FinancialList/Info',
        breadcrumb: [
          { title: '金融机构', path: '/customer/financial-list' },
          { title: '金融机构详情' },
        ],
      },
      {
        name: '详情',
        title: '详情',
        path: '/customer/financial-list/user-info',
        component: './FinancialList/UserInfo',
        breadcrumb: [
          { title: '金融机构', path: '/customer/financial-list' },
          { title: '金融机构详情', },
          { title: '账号详情', },
        ],
      },

      {
        name: '详情',
        title: '详情',
        path: '/customer/government-list/info',
        component: './GovernmentList/Info',
        breadcrumb: [
          { title: '政府部门', path: '/customer/government-list' },
          { title: '政府部门详情' },
        ],
      },
      {
        name: '详情',
        title: '详情',
        path: '/customer/government-list/user-info',
        component: './GovernmentList/UserInfo',
        breadcrumb: [
          { title: '政府部门', path: '/customer/government-list' },
          { title: '政府部门详情', },
          { title: '账号详情', },
        ],
      },
      {
        name: '政策详情',
        title: '政策详情',
        path: '/policy/list/policy-info',
        component: './PolicyList/PolicyInfo',
        breadcrumb: [
          { title: '政策列表', path: '/policy/list' },
          { title: '政策详情' },
        ],
      },
      {
        name: '银行贷款产品详情',
        title: '银行贷款产品详情',
        path: '/product/bank/info',
        component: './ProductBank/BankInfo',
        breadcrumb: [
          { title: '银行贷款产品', path: '/product/bank' },
          { title: '银行贷款产品详情' },
        ],
      },
      {
        name: '小额贷款产品详情',
        title: '小额贷款产品详情',
        path: '/product/microloan/info',
        component: './ProductMicroloan/MicroloanInfo',
        breadcrumb: [
          { title: '小额贷款产品', path: '/product/microloan' },
          { title: '小额贷款产品详情' },
        ],
      },
      
      {
        name: '融资担保产品详情',
        title: '融资担保产品详情',
        path: '/product/finance-guarantee/info',
        component: './ProductFinanceGuarantee/FinanceGuaranteeInfo',
        breadcrumb: [
          { title: '融资担保产品', path: '/product/finance-guarantee' },
          { title: '融资担保产品详情' },
        ],
      },
      {
        name: '应急转贷产品详情',
        title: '应急转贷产品详情',
        path: '/product/emergency/info',
        component: './ProductEmergency/EmergencyInfo',
        breadcrumb: [
          { title: '应急转贷产品', path: '/product/emergency' },
          { title: '应急转贷产品详情' },
        ],
      },
      {
        name: '保函产品详情',
        title: '保函产品详情',
        path: '/product/guarantee/info',
        component: './ProductGuarantee/GuaranteeInfo',
        breadcrumb: [
          { title: '保函产品', path: '/product/guarantee' },
          { title: '保函产品详情' },
        ],
      },
      {
        name: '保险产品详情',
        title: '保险产品详情',
        path: '/product/insurance/info',
        component: './ProductInsurance/InsuranceInfo',
        breadcrumb: [
          { title: '保险产品', path: '/product/insurance' },
          { title: '保险产品详情' },
        ],
      },
      {
        name: '基金产品详情',
        title: '基金产品详情',
        path: '/product/fund/info',
        component: './ProductFund/FundInfo',
        breadcrumb: [
          { title: '基金产品', path: '/product/fund' },
          { title: '基金产品详情' },
        ],
      },
    ],
  },

  {
    name: '融资项目管理',
    title: '融资项目管理',
    path: '/finance',
    component: '@/layouts/TzPageContainer',
    icon: 'rzxm',
    hideInBreadcrumb: true,
    routes: [
      {
        path: '',
        redirect: 'finance-management',
      },
      {
        name: '一键融资管理',
        title: '一键融资管理',
        path: 'finance-management',
        key:'financeManagement',
        component: './FinanceManagement',
      },
      {
        name: '产品申请管理',
        title: '产品申请管理',
        path: 'product-management',
        key:'productManagement',
        component: './ProductManagement',
      },
    ],
  },
  {
    name: '产品管理',
    title: '产品管理',
    path: '/product',
    component: '@/layouts/TzPageContainer',
    icon: 'cpgl',
    hideInBreadcrumb: true,
    access: 'admin',
    routes: [
      {
        path: '',
        redirect: 'bank',
      },
      {
        name: '银行贷款产品',
        title: '银行贷款产品',
        path: 'bank',
        key:'productBank',
        component: './ProductBank',
      },
      {
        name: '小额贷款产品',
        title: '小额贷款产品',
        path: 'microloan',
        key:'productMicroloan',
        component: './ProductMicroloan',
      },

      {
        name: '融资担保产品',
        title: '融资担保产品',
        path: 'finance-guarantee',
        key:'productFinanceGuarantee',
        component: './ProductFinanceGuarantee',
      },
      {
        name: '应急转贷产品',
        title: '应急转贷产品',
        path: 'emergency',
        key:'productEmergency',
        component: './ProductEmergency',
      },
      {
        name: '保函产品',
        title: '保函产品',
        path: 'guarantee',
        key:'productGuarantee',
        component: './ProductGuarantee',
      },
      {
        name: '保险产品',
        title: '保险产品',
        path: 'insurance',
        key:'productInsurance',
        component: './ProductInsurance',
      },
      {
        name: '基金产品',
        title: '基金产品',
        path: 'fund',
        key:'productFund',
        component: './ProductFund',
      },
    ],
  },
  {
    name: '政策管理',
    title: '政策管理',
    path: '/policy',
    component: '@/layouts/TzPageContainer',
    icon: 'zcgl',
    hideInBreadcrumb: true,
    access: 'admin',
    routes: [
      {
        path: '',
        redirect: 'list',
      },
      {
        name: '政策列表',
        title: '政策列表',
        path: 'list',
        key:'policyList',
        component: './PolicyList',
      },
    ],
  },
  {
    name: '权限管理',
    title: '权限管理',
    path: '/permission',
    component: '@/layouts/TzPageContainer',
    icon: 'qxgl',
    hideInBreadcrumb: true,
    access: 'admin',
    routes: [
      {
        path: '',
        redirect: 'config',
      },
      {
        name: '权限配置',
        title: '权限配置',
        path: 'config',
        key:'permissionConfig',
        component: './PermissionConfig',
      },
    ],
  },
];
export default routes;
