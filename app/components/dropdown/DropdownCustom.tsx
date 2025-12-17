import { Button, Dropdown, MenuProps, Space } from 'antd';
import { DropdownIcon } from '../icons/icons';
import { DropdownProps } from 'antd/lib';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    backgroundColor: token.colorFillAlter,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
  },
  {
    key: '2',
    label: 'Settings',
    // icon: <SettingOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: 'Logout',
    // icon: <LogoutOutlined />,
    danger: true,
  },
];

const objectStyles: DropdownProps['styles'] = {
  root: {
    backgroundColor: '#ffffff',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
  },
  item: {
    padding: '8px 12px',
    fontSize: '14px',
  },
  itemTitle: {
    fontWeight: '500',
  },
  itemIcon: {
    color: '#1890ff',
    marginRight: '8px',
  },
  itemContent: {
    backgroundColor: 'transparent',
  },
};

const functionStyles: DropdownProps['styles'] = (info) => {
  const { props } = info;
  const isClick = props.trigger?.includes('click');
  if (isClick) {
    return {
      root: {
        borderColor: '#1890ff',
        borderRadius: '8px',
      },
    } satisfies DropdownProps['styles'];
  }
  return {};
};

export default function DropdownCustom() {
  const { styles } = useStyles();

  const sharedProps: DropdownProps = {
    menu: { items },
    placement: 'bottomLeft',
    classNames: { root: styles.root },
  };
  return (
    <Dropdown {...sharedProps} styles={functionStyles} trigger={['click']}>
      <Button type="primary">
        <Space>
          Function Style
          <DropdownIcon className={''} />
        </Space>
      </Button>
    </Dropdown>
  );
}
