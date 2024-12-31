export default (initialState: any) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const { user } = initialState || {};
  //
  // useEffect(() => {
  console.log(user,user?.user_type == 4);
  // }, [role])
  return {
    role: user?.data?.user_type== 4 ? 'admin' : 'user' ,
    canEdit: user?.data?.user_type == 4 ,
  };
};
