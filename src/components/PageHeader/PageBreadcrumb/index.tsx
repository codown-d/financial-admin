import { Link } from '@umijs/max';
import { Breadcrumb, BreadcrumbProps } from 'antd';
import { useMemo } from 'react';
import './index.less';
export interface PageBreadCrumbProps extends BreadcrumbProps {}
function PageBreadCrumb(props: PageBreadCrumbProps) {
  let { items, className = '' } = props;
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-page-breadcrumb text-[20px] ${className}`,
    };
  }, [props]);
  return (
    <Breadcrumb
      {...realProps}
      items={items?.map((item: any) => ({
        title: item.path ? (
          <Link key={item.path} to={item.path} >
            {item.title}
            {/* <FormattedMessage id={item.title} defaultMessage={item.title} /> */}
            {/* {intl.formatMessage({ id: item.title })} */}
          </Link>
        ) : (
          <span >{item.title}</span>
          // <FormattedMessage id={item.title} defaultMessage={item.title} />
        ),
        key: item.title,
      }))}
    />
  );
}

export default PageBreadCrumb;
