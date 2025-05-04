export const DEFAULT_NAME = 'Umi Max123';

export enum role_type {
  admin = 4,
  org = 2,
  normal = 1,
  gov = 3,
}
export const user_type = {
  1: {
    text: '普通用户',
  },
  2: {
    text: '机构用户',
  },
  3: {
    text: '政府部门用户',
  },
  4: {
    text: '管理员',
  },
};
export const VERIFY_TYPE = {
  1: {
    text: '用户认证',
    status: 'Error',
  },
  2: {
    text: '企业认证',
    status: 'Success',
  },
};
export const AREA_OP = [
  {
    field: 'front end',
    value: 'fe',
    language: [
      {
        field: 'Javascript',
        value: 'js',
      },
      {
        field: 'Typescript',
        value: 'ts',
      },
    ],
  },
  {
    field: 'back end',
    value: 'be',
    language: [
      {
        field: 'Java',
        value: 'java',
      },
      {
        field: 'Go',
        value: 'go',
      },
    ],
  },
];
export const VERIFY_STATUS = {
  1: {
    text: '未认证',
    status: 'Error',
    style: {
      color: '#DDDDDD',
      background: '#F6F6F6',
      border: '1px solid #DDDDDD',
      borderColor: '#DDDDDD',
    },
  },
  2: {
    text: '审核中',
    status: 'Success',
    style: {
      color: '#DDDDDD',
      background: '#F6F6F6',
      border: '1px solid #DDDDDD',
      borderColor: '#DDDDDD',
    },
  },
  3: {
    text: '已认证',
    status: 'Success',
    style: {
      color: '#FF9958',
      background: '#FFEEE3',
      border: '1px solid #FF9958',
      borderColor: '#FF9958',
    },
  },
};

export const AREA_TYPE: any = {
  1: {
    text: '国家级',
  },
  2: {
    text: '省级',
  },
  3: {
    text: '市级',
  },
  510802: {
    text: '利州区',
  },
  510811: {
    text: '昭化区',
  },
  510812: {
    text: '朝天区',
  },
  510821: {
    text: '旺苍县',
  },
  510822: {
    text: '青川县',
  },

  510823: {
    text: '剑阁县',
  },

  510824: {
    text: '苍溪县',
  },
};

export const BODY_TYPE = {
  1: {
    text: '原文',
  },

  2: {
    text: '解读',
  },
};
export const GUARANTEE_FROM = {
  1: {
    text: '电子保函',
  },

  2: {
    text: '纸质保函',
  },

  3: {
    text: '全部',
  },
};
// export const GUARANTEE_FROM_OP = {
//   1: {
//     text: '电子保函',
//   },
//   2: {
//     text: '纸质保函',
//   },
// };

export const GUARANTEE_FROM_OP = [
  {
    value: 1,
    label: '电子保函',
  },
  {
    value: 2,
    label: '纸质保函',
  },
];
export const SUB_UNIT = {
  1: {
    text: '万元',
  },
  2: {
    text: '亿元',
  },
};
export const repayment_method = {
  1: {
    text: '按周期付息,到期还本',
  },
  2: {
    text: '分期还款',
  },
  3: {
    text: '一次性还本付息',
  },
  4: {
    text: '随借随还',
  },
};
export const data_type = {
  1: {
    text: '信用',
  },
  2: {
    text: '抵质押',
  },
  3: {
    text: '保证',
  },
  4: {
    text: '组合',
  },
};
export const insurance_type = {
  1: {
    text: '财产险',
  },
  2: {
    text: '责任险',
  },
  3: {
    text: '寿险',
  },
  4: {
    text: '意外险',
  },
  5: {
    text: '保证险',
  },
  6: {
    text: '综合险',
  },
};

export const GUARANTEE_METHOD = data_type
// {
//   1: {
//     text: '履约保函',
//   },

//   2: {
//     text: '农民工工资保函',
//   },

//   3: {
//     text: '财产保全保函',
//   },

//   4: {
//     text: '通用保函',
//   },

//   // 2: {
//   //   text: '农民工工资保函',
//   // },
// };

export enum product_type {
  Bank = '1',
  Microloan = '2',
  FinanceGuarantee = '3',
  Emergency = '4',
  Guarantee = '7',
  Insurance = '6',
  Fund = '5',
}
export const purpose:any = {
  1: {
    text: '生产经营',
  },

  2: {
    text: '创业助业',
  },

  3: {
    text: '购买资产',
  },

  4: {
    text: '归还贷款',
  },
};
export const action_status = {
  1: {
    text: '已申请',
    status: 'Default',
  },
  2: {
    text: '未受理',
    status: 'Processing',
  },
  3: {
    text: '办理中',
    status: 'Success',
  },
  4: {
    text: '谢绝',
    status: 'Error',
  },
  5: {
    text: '完成',
    status: 'Success',
  },
};
export const term = {
  0: {
    text: '全部',
  },
  1: {
    text: '3个月内',
  },

  2: {
    text: '12个月内',
  },

  3: {
    text: '24个月内',
  },
  4: {
    text: '36个月内',
  },
};
export const product_type_filter = {
  1: {
    text: '银行贷款',
  },

  2: {
    text: '小额贷款',
  },

  3: {
    text: '融资担保',
  },
  4: {
    text: '应急转贷',
  },
  5: {
    text: '基金',
  },
  6: {
    text: '保险',
  },
  7: {
    text: '保函',
  },
};
export const action_status_filter = {
  1: {
    text: '已申请',
    status: 'Default',
  },
  2: {
    text: '未受理',
    status: 'Processing',
  },
  3: {
    text: '办理中',
    status: 'Success',
  },
  4: {
    text: '谢绝',
    status: 'Error',
  },
  5: {
    text: '完成',
    status: 'Success',
  },
};
export const organs_data_type = {
  1: {
    text: '银行机构',
  },
  2: {
    text: '小贷公司',
  },
  3: {
    text: '担保公司',
  },
  4: {
    text: '基金公司',
  },
  5: {
    text: '保险公司',
  },
};
export const termC = {
  1: {
    text: '天',
  },
  2: {
    text: '月',
  },
};
export const termOp = [{
    label: '天',
    value:1
  },{
    label: '月',
    value:2
  },
]
export let fileList = [
  {
    label: "企业简介",
    prop: "loan_company_profile",
    required: true,
  },
  {
    label: "公司章程",
    prop: "loan_articles",
    required: true,
  },
  {
    label: "营业执照正本",
    prop: "loan_license_original",
    required: true,
  },
  {
    label: "营业执照副本",
    prop: "loan_license_copy",
    required: true,
  },
  {
    label: "法定代表人身份证",
    prop: "loan_legal_id",
    required: true,
  },
  {
    label: "企业征信报告（近一月内）",
    prop: "loan_company_credit_report",
    required: true,
  },
  {
    label: "法定代表人征信报告（近一月内",
    prop: "loan_legal_credit_report",
    required: true,
  },
  {
    label: "经营场所权属（或租赁）证明",
    prop: "loan_address_proof",
    required: true,
  },
  {
    label: "企业到期银行贷款合同",
    prop: "loan_due_contract",
    required: true,
  },
  {
    label: "集团内部资金统借统还合同（若有）",
    prop: "loan_group_contract",
    required: false,
  },
  {
    label: "企业权力机构出具同意申请应急转贷资金的决议",
    prop: "loan_resolution",
    required: true,
  },
  {
    label: "上年度财务报表及报表附注",
    prop: "loan_report_last",
    required: true,
  },
  {
    label: "应急转贷资金申请表（模板附件1）",
    prop: "loan_form",
    required: true,
    downloadUrl: "https://admintest.gyzhjr.com/other/fj1.docx",
  },
  {
    label: "申请企业主要负责情况（模板附件2）",
    prop: "loan_leader_info",
    required: true,
    downloadUrl: "https://admintest.gyzhjr.com/other/fj2.docx",
  },
  {
    label: "申请企业主要资产况表（模板附件3）",
    prop: "loan_assets_info",
    required: true,
    downloadUrl: "https://admintest.gyzhjr.com/other/fj3.docx",
  },
  {
    label: "资料真实性承诺书（模板附件4）",
    prop: "loan_promise",
    required: true,
    downloadUrl: "https://admintest.gyzhjr.com/other/fj4.docx",
  },
  {
    label: "借款申请书(模板附件5)",
    prop: "loan_letter",
    required: true,
    downloadUrl: "https://admintest.gyzhjr.com/other/fj5.docx",
  },
];
export let guaranteeList = [
  {
    label: "担保企业简介",
    prop: "guarantee_company_profile",
    required: true,
  },
  {
    label: "担保企业章程",
    prop: "guarantee_articles",
    required: true,
  },
  {
    label: "担保企业营业执照正本",
    prop: "guarantee_license_original",
    required: true,
  },
  {
    label: "担保企业营业执照副本",
    prop: "guarantee_license_copy",
    required: true,
  },
  {
    label: "担保企业法定代表人身份证",
    prop: "guarantee_legal_id",
    required: true,
  },
  {
    label: "担保企业法定代表人简历",
    prop: "guarantee_legal_resume",
    required: true,
  },
  {
    label: "担保企业企业征信报告（近一月内）",
    prop: "guarantee_credit_report",
    required: true,
  },
];
export let enterpriseList = [
  {
    label: "企业简介",
    prop: "enterprise_profile",
    required: true,
  },
  {
    label: "公司章程",
    prop: "enterprise_articles",
    required: true,
  },
  {
    label: "营业执照",
    prop: "enterprise_business_license",
    required: true,
  },
  {
    label: "法定代表人身份证",
    prop: "enterprise_legal_id",
    required: true,
  },
  {
    label: "权利机构决议",
    prop: "enterprise_authority_resolution",
    required: true,
  },
  {
    label: "银行流水",
    prop: "enterprise_bank_statement",
    required: true,
  },
  {
    label: "财务报告",
    prop: "enterprise_financial_report",
    required: true,
  },
  {
    label: "近期企业征信报告",
    prop: "enterprise_credit_report",
    required: true,
  },
  {
    label: "近期法定代表人征信报告",
    prop: "enterprise_legal_credit",
    required: true,
  },
  {
    label: "抵押物资料",
    prop: "enterprise_collateral",
    required: false,
  },
  {
    label: "经营合同",
    prop: "enterprise_contract",
    required: true,
  },
];
export let personalList = [
  {
    label: "情况简介",
    prop: "personal_profile",
    required: true,
  },
  {
    label: "借款人身份证",
    prop: "personal_legal_id",
    required: true,
  },
  {
    label: "配偶身份证（若有）",
    prop: "personal_spouse_id",
    required: true,
  },
  {
    label: "借款人户口簿",
    prop: "personal_household_register",
    required: true,
  },
  {
    label: "配偶户口簿",
    prop: "personal_spouse_household",
    required: true,
  },
  {
    label: "结婚情况证明文件",
    prop: "personal_marriage_proof",
    required: false,
  },
  {
    label: "征信报告",
    prop: "personal_credit_report",
    required: true,
  },
  {
    label: "银行流水",
    prop: "personal_bank_statement",
    required: true,
  },
  {
    label: "抵押物资料（若有）",
    prop: "personal_collateral",
    required: false,
  },
  {
    label: "经营资料",
    prop: "personal_business_info",
    required: false,
  },
];