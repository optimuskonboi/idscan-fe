import {
  Device,
  UserIcon,
  ListIcon,
  List,
  UserActive,
  QR
} from "../../../components/Icons";
export const nav = [
  {
    activeIcon:<ListIcon/>,
    icon: <List />,
    title: "Danh sách khách hàng",
    to: "/admin/customer",
  },
  {
    activeIcon:<UserActive/>,
    icon: <UserIcon />,
    title: "Danh sách tài khoản",
    to: "/admin/account",
  },
 
  {
    activeIcon:<Device/>,
    icon: <QR />,
    title: "Thiết bị",
    to: "/admin/device",
  },
 
];

