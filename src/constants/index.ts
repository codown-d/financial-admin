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
export const purpose = {
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
