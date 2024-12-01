import { PageHeaderProps } from '@ant-design/pro-components';
import { TabPaneProps } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';

interface AppPageProps {
  header: PageHeaderProps | undefined;
  setHeader: React.Dispatch<React.SetStateAction<PageHeaderProps | undefined>>;
  tabList: TabPaneProps[] | undefined;
  setTabList: React.Dispatch<React.SetStateAction<TabPaneProps[] | undefined>>;
  footer: ReactNode[] | undefined;
  setFooter: React.Dispatch<React.SetStateAction<ReactNode[] | undefined>>;
}
const AppPageContext = createContext<AppPageProps>(null!);

interface AppPageProviderProps {
  children: ReactNode;
}
const AppPageProvider: React.FC<AppPageProviderProps> = ({ children }) => {
  let [header, setHeader] = useState<PageHeaderProps>();
  let [tabList, setTabList] = useState<TabPaneProps[]>();
  let [footer, setFooter] = useState<React.ReactNode[]>();

  return (
    <AppPageContext.Provider
      value={{ header, setHeader, tabList, setTabList, footer, setFooter }}
    >
      {children}
    </AppPageContext.Provider>
  );
};
const useAppPageContext = () => {
  return useContext(AppPageContext);
};
export { AppPageContext, AppPageProvider, useAppPageContext };
