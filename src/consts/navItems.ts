import BugReportIcon from '@mui/icons-material/BugReport';
import InputIcon from '@mui/icons-material/Input';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { SteamIcon } from './icons';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedIcon from '@mui/icons-material/Feed';
export interface NavItemType {
    id: number,
    route : string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    label: string
}

export interface AuthenticatedNavItemType {
    authenticated: NavItemType,
    notAuthenticated : NavItemType
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

export const MainNavItems : Array<AuthenticatedNavItemType> = [
    {
        authenticated: {
            id: 0,
            route: "/",
            icon: BugReportIcon,
            label: "Reports",
        },
        notAuthenticated: {
            id: 0,
            route: "/",
            icon: BugReportIcon,
            label: "Reports",
        }    
    },
    {
        authenticated: {
            id: 1,
            route: '/logout',
            icon: LogoutIcon,
            label: "Logout"
        },
        notAuthenticated: {
            id: 1,
            route: '/login',
            icon: InputIcon,
            label: "Login"
        }    
    }
]