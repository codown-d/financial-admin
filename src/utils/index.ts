import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import { debounce, isArray, keyBy, keys } from 'lodash';

export function buildTree(
  data: { id: any; parentId: any;[x: string]: any }[],
  defaultProps?: {
    children: string;
    parentKey: string;
  },
) {
  let key = defaultProps?.children || 'children';
  let parentKey = defaultProps?.parentKey || null;
  // 创建一个 Map，用来存储 id => 对象 映射
  const map = keyBy(data, 'id');

  // 将每个节点连接到其父节点
  return data
    .filter((item) => {
      // 找到所有没有父节点的节点（根节点）
      if (item.parentId === parentKey) {
        
        return true;
      }
      // 如果有父节点，则将当前节点添加到父节点的 children 数组中
      const parent = map[item.parentId];
      if (parent) {
        parent[key] = parent[key] || [];
        parent[key].push(item);
      }
      return false;
    })
    .map((item) => {
      // 返回根节点（没有父节点的）
      return map[item.id];
    })
    .filter(Boolean); // 过滤掉 undefined 的节点（没有父节点的子节点）
}

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userName: '管理员12323',
        name: 'John Doe',
        role: 'admin',
      });
    }, time);
  });
};

export const handleJump = (url: string) => {
  // 使用 useNavigate 进行跳转
  const navigate = useNavigate();
  navigate(url);
};
interface DataProps {
  value: string;
  label: string;
  children?: DataProps[];
}
export const findParentIds = (
  data: DataProps,
  targetId: string,
  key = 'value',
  path: any[] = [],
): any[] => {
  const dataArray = Object.values(data);
  for (const item of dataArray) {
    const newPath = [...path, item[key]];
    if (item[key] == targetId) {
      return newPath; // 找到目标 ID，返回路径
    }
    if (item.children) {
      const result = findParentIds(item.children, targetId, key, newPath);
      if (result) return result; // 找到父路径返回
    }
  }
  return [];
};
export const showError = debounce((opt) => {
  message.error(opt);
}, 300);

export const refreshPageUrl = (key: string, value: any) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
};

export function urlToBase64(url: string, callback: (arg: string) => void) {
  if(!url)return;
  console.log(url)
  const img = new Image();
  img.crossOrigin = "Anonymous"; // 如果图片是跨域的，需要设置这个属性

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const base64 = canvas.toDataURL("image/png");
    callback(base64);
  };

  img.onerror = function () {
    callback(url)
    console.error("图片加载失败");
  };
  img.src = url.replace('http://219.151.185.167:3900',API_BASE_URL);
}
export const formatOption=(Object:{
  [x:string]:{text:string}
})=>{
  return keys(Object).map(item=>({ label: Object[item].text, value: Number(item) }))
}
export const formatKey=(object:any,keyList:string[])=>{
  return {
    ...object,
    ...keyList.reduce((acc:any, key) => {
      if(isArray(object[key])){
         acc[key]=object[key]
      }else{
        acc[key]=object[key]+''
      }
      return acc
    },{})
  }
}
export const handleRes=(res: { code: number; })=>{

  if(res.code==200){
    message.success('提交成功'); 
  }
}