import {

  mdiMonitor,
  mdiTable,
  mdiViewList,

} from "@mdi/js";
import { MenuAsideItem } from "../../_interfaces";

const menuAside: MenuAsideItem[] = [
  {
    href: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    href: "/dashboard/senderNames",
    label: "Sender Names",
    icon: mdiTable,
  },
  {
    href: "/dashboard/sentMessages",
    label: "Sent Messages",
    icon: mdiViewList,
  },
  
  {
    label: "Send SMS",
    icon: mdiViewList,
    menu: [
      {
        label: "Quick SMS",
        href: "/dashboard/quickSMS"
      },
      {
        label: "File 2 SMS",
      },
    ],
  },

];

export default menuAside;
