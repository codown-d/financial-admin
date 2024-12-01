import { getAppConfig } from '@/services';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface SysConfigProps {
  name: string;
  version: string;
  description: string;
}
interface AppConfigType {
  sysConfig: SysConfigProps | undefined;
}
const AppConfigContext = createContext<AppConfigType>(null!);

interface AppConfigProviderProps {
  children: ReactNode;
}
const AppConfigProvider: React.FC<AppConfigProviderProps> = ({ children }) => {
  const [sysConfig, setSysConfig] = useState<SysConfigProps>();

  let fetchPermissions = useCallback(async () => {
    const response = await getAppConfig();
    setSysConfig(response);
  }, []);
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);
  return (
    <AppConfigContext.Provider value={{ sysConfig }}>
      {children}
    </AppConfigContext.Provider>
  );
};
const useAppConfigContext = () => {
  return useContext(AppConfigContext);
};
export { AppConfigProvider, useAppConfigContext };
