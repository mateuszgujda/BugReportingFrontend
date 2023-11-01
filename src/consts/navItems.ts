import BugReportIcon from '@mui/icons-material/BugReport';
import InputIcon from '@mui/icons-material/Input';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { SteamIcon } from './icons';
import FeedIcon from '@mui/icons-material/Feed';
interface NavItemType {
    id: number,
    route : string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    label: string
}

export const TopNavButtons: Array<NavItemType> = [
   {
    id: 0,
    route : "https://store.steampowered.com/app/1394960/Winter_Survival/",
    icon: SteamIcon,
    label: "Buy WS"
   },
   {
    id: 1,
    route: "https://store.steampowered.com/news/app/1394960",
    icon: FeedIcon,
    label: "Developer News"
   }
]

export const MainNavItems : Array<NavItemType> = [
    {
        id: 0,
        route: "/",
        icon: BugReportIcon,
        label: "Reports"
    },
    {
        id: 1,
        route: '/login',
        icon: InputIcon,
        label: "Login"
    }
]