import { TzButton } from '@/components/TzButton';
import TzCard from '@/components/TzCard';
import TzImg from '@/components/TzImg';
import { adminPermission } from '@/services';
import {  ProCard } from '@ant-design/pro-components';
import { useAppData, useModel } from '@umijs/max';
import { message, Spin, Switch } from 'antd';
import { merge, values } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export default () => {
  let { menu } = useModel('menu');
  const AppData = useAppData();
  const { routes } = AppData;
  let [sendData, setSendData] = useState<any>({
    admin_user_permission: [],
    financial_organs_user_permission: [],
    government_department_user_permission: [],
  });
  let menuList = useMemo(() => {
    return menu
  }, [menu]);
  
  let { permissionData } = useModel('permission');
  useEffect(() => {
    let arr = values(routes).map((item:any)=>item.key)
    permissionData['admin_user_permission']=permissionData['admin_user_permission'].filter(item=>arr.includes(item))
    permissionData['financial_organs_user_permission']=permissionData['financial_organs_user_permission'].filter(item=>arr.includes(item))
    permissionData['government_department_user_permission']=permissionData['government_department_user_permission'].filter(item=>arr.includes(item))
    setSendData(merge(permissionData,{financial_organs_user_permission:['/customer/customer-list']}))
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
          extra={<TzImg className="w-[66px] mr-3" src={`/images/admin.png`} />}
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
                    <TzImg
                      className="w-[16px] mr-3"
                      src={`/images/${item.icon}-u.png`}
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
                          ite.key
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
          extra={<TzImg className="w-[66px] mr-3" src={`/images/jrjg.png`} />}
        >
          {menuList.map((item) => {
            return (
              <div key={item.path}>
                <div className="flex items-center leading-[40px] text-[#CCCCCC]">
                  <span>
                    <TzImg
                      className="w-[16px] mr-3"
                      src={`/images/${item.icon}-u.png`}
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
          extra={<TzImg className="w-[66px] mr-3" src={`/images/zfbm.png`} />}
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
                    <TzImg
                      className="w-[16px] mr-3"
                      src={`/images/${item.icon}-u.png`}
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
            adminPermission(sendData).then(res => {
              if(res.code==200){
                message.success('保存成功')
              }
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
