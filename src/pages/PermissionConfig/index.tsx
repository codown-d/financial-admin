import { TzButton } from '@/components/TzButton';
import TzCard from '@/components/TzCard';
import { adminPermission } from '@/services';
import {  ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Spin, Switch } from 'antd';
import { keys } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export default () => {
  let { menu } = useModel('menu');
  let [sendData, setSendData] = useState<any>({
    financial_organs_user_permission: [],
    government_department_user_permission: [],
    admin_user_permission: [],
  });
  let menuList = useMemo(() => {
    console.log(menu)
    return menu.filter((item) => item.key != '/permissionConfig');
  }, [menu]);
  
  let { permissionData } = useModel('permission');
  useEffect(() => {
    setSendData(permissionData)
  },[permissionData])
  let onChange = (checked: boolean, path: string, key: string) => {
    setSendData((pre: { [x: string]: any[] }) => {
      if (checked) {
        pre[key].push(path);
      } else {
        pre[key] = pre[key].filter((item) => item != path);
      }
      return pre;
    });
  };
  if (
    sendData.financial_organs_user_permission.length == 0 &&
    sendData.government_department_user_permission.length == 0 &&
    sendData.admin_user_permission.length == 0
  ) {
    return <Spin />;
  }
  return (
    <ProCard>
      <div className="flex justify-between">
        <TzCard
          title={'管理员'}
          className="w-[380px]"
          extra={<img className="w-[66px] mr-3" src={`/admin/images/admin.png`} />}
          styles={{
            header: {
              background: 'linear-gradient( 180deg, #F3F5FF 0%, #FFFFFF 100%)',
            },
          }}
        >
          {menuList.map((item) => {
            return (
              <div key={item.path}>
                <div className="flex items-center leading-[40px] text-[#CCCCCC]">
                  <span>
                    <img
                      className="w-[16px] mr-3"
                      src={`/admin/images/${item.icon}-u.png`}
                    />
                  </span>
                  {item.name}
                </div>
                {item.routes.map((ite: any) => {
                  return (
                    <div
                      key={ite.key}
                      className="pl-7  flex justify-between leading-[40px]  items-center"
                    >
                      <span>{ite.name}</span>
                      <Switch
                        defaultChecked={sendData.admin_user_permission.includes(
                          ite.key,
                        )}
                        onChange={(checked) =>
                          onChange(checked, ite.key, 'admin_user_permission')
                        }
                        size="small"
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </TzCard>
        <TzCard
          title={'金融机构'}
          className="w-[380px]"
          styles={{
            header: {
              background: 'linear-gradient( 180deg, #F3FFFD 0%, #FFFFFF 100%)',
            },
          }}
          extra={<img className="w-[66px] mr-3" src={`/admin/images/jrjg.png`} />}
        >
          {menuList.map((item) => {
            return (
              <div key={item.path}>
                <div className="flex items-center leading-[40px] text-[#CCCCCC]">
                  <span>
                    <img
                      className="w-[16px] mr-3"
                      src={`/admin/images/${item.icon}-u.png`}
                    />
                  </span>
                  {item.name}
                </div>
                {item.routes.map((ite: any) => {
                  return (
                    <div
                      key={ite.key}
                      className="pl-7 flex justify-between items-center  leading-[40px] "
                    >
                      <span>{ite.name}</span>
                      <Switch
                        defaultChecked={sendData.financial_organs_user_permission.includes(
                          ite.key,
                        )}
                        onChange={(checked) =>
                          onChange(
                            checked,
                            ite.key,
                            'financial_organs_user_permission',
                          )
                        }
                        size="small"
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </TzCard>
        <TzCard
          title={'政府部门'}
          className="w-[380px]"
          extra={<img className="w-[66px] mr-3" src={`/admin/images/zfbm.png`} />}
          styles={{
            header: {
              background: 'linear-gradient( 180deg, #FFF8F3 0%, #FFFFFF 100%)',
            },
          }}
        >
          {menuList.map((item) => {
            return (
              <div key={item.path}>
                <div className="flex items-center leading-[40px] text-[#CCCCCC]">
                  <span>
                    <img
                      className="w-[16px] mr-3"
                      src={`/admin/images/${item.icon}-u.png`}
                    />
                  </span>
                  {item.name}
                </div>
                {item.routes.map((ite: any) => {
                  return (
                    <div
                      key={ite.key}
                      className="pl-7  flex justify-between  items-center  leading-[40px] "
                    >
                      <span>{ite.name}</span>
                      <Switch
                        defaultChecked={sendData.government_department_user_permission.includes(
                          ite.key,
                        )}
                        onChange={(checked) =>
                          onChange(
                            checked,
                            ite.key,
                            'government_department_user_permission',
                          )
                        }
                        size="small"
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </TzCard>
      </div>
      <div>
        <TzButton
          type={'primary'}
          className="mt-[60px] mr-[20px] mb-[60px]"
          onClick={() => {
            console.log(sendData)
            let obj = keys(sendData).reduce((pre: any, item) => {
              pre[item] = sendData[item].join(",")
              return pre
            }, {})
            adminPermission(sendData).then(res => {
              console.log(res);
            })
          }}
        >
          保存
        </TzButton>
        <TzButton>取消</TzButton>
      </div>
    </ProCard>
  );
};
