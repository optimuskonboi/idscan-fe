import config from "../config/routes";
import { Login } from "../pages/Login";
// import { Register } from "../pages/Register";
// import FormCode from "../pages/Register/FormCode/FormCode";
import NotFound from "../pages/NotFound";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
// import { ForgotPassword } from "../pages/ForgotPassword";
// import Chat from "../pages/Chat/Chat";
import Customer from "../pages/Admin/Customer/Customer";
import Device from "../pages/Admin/Device/Device";
import ListCCCD from "../pages/ListCCCD/ListCCCD";
import Account from "../pages/Admin/Account/Account";


const publicRoutes = [
  { path: config.login, component: Login },
  // { path: config.register, component: Register },
  // { path: config.verify, component: FormCode },
  // { path: config.forgot, component: ForgotPassword },
  { path: config.cccd, component: ListCCCD,layout:true },
  { path: config.change, component: ChangePassword,layout:true },
  { path: config.customer, component: Customer,layout:true },
  { path: config.device, component: Device,layout:true },
  { path: config.account, component: Account,layout:true },
  { path: config.notPage, component: sessionStorage.getItem("role") === "ROLE_superadmin" ?Customer:ListCCCD,layout:true },
];
export { publicRoutes };
