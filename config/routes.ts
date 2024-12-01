import { role_type } from "@/constants";

const routes = [
  {
    path: '/',
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
        component: './CustomerList',
      },
      {
        name: '金融机构列表',
        title: '金融机构列表',
        path: '/customer/financial-list',
        component: './FinancialList',
      },
      {
        name: '政府部门列表',
        title: '政府部门列表',
        path: '/customer/government-list',
        component: './GovernmentList',
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
        path: '/customer/financial-list/financial-info',
        component: './FinanceInfo',
        breadcrumb: [
          { title: '金融机构', path: '/customer/financial-list' },
          { title: '金融机构详情' },
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
        component: './FinanceManagement',
      },
      {
        name: '产品申请管理',
        title: '产品申请管理',
        path: 'product-management',
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
    routes: [
      {
        path: '',
        redirect: 'bank',
      },
      {
        name: '银行贷款产品',
        title: '银行贷款产品',
        path: 'bank',
        component: './ProductBank',
      },
      {
        name: '小额贷款产品',
        title: '小额贷款产品',
        path: 'microloan',
        component: './ProductMicroloan',
      },

      {
        name: '融资担保产品',
        title: '融资担保产品',
        path: 'finance-guarantee',
        component: './ProductFinanceGuarantee',
      },
      {
        name: '应急转贷产品',
        title: '应急转贷产品',
        path: 'emergency',
        component: './ProductEmergency',
      },
      {
        name: '保函产品',
        title: '保函产品',
        path: 'guarantee',
        component: './ProductGuarantee',
      },
      {
        name: '保险产品',
        title: '保险产品',
        path: 'insurance',
        component: './ProductInsurance',
      },
      {
        name: '基金产品',
        title: '基金产品',
        path: 'fund',
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
    routes: [
      {
        path: '',
        redirect: 'list',
      },
      {
        name: '政策列表',
        title: '政策列表',
        path: 'list',
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
        component: './PermissionConfig',
      },
    ],
  },
];
export default routes;
