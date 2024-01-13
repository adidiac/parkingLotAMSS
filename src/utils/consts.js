import { pages, userRoles } from "../utils/enums";
import Home from "../Pages/Home";
import abi from './Transactions.json';
import Parkings from "../Pages/Parkings";
import MyBookings from "../Pages/MyBookings";
import MyParkings from "../Components/MyParkings";

function getPageBasedOnUserFromLocalStorage  ()  {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        console.log(user);
        if (user.role === userRoles.NORMAL) {
            return pages.PARKING;
        }
        else if (user.role === userRoles.PARKOWNER) {
            return pages.MYPARKINGS;
        }
    }
    return pages.HOME;
}

export const pagesDictionary = {
    "HOME": (options) => <Home/>,
    "PARKING": (options) => <Parkings />,
    "BOOKING": (options) => <MyBookings />,
    "MYPARKINGS": (options) => <MyParkings />,
}

export const initialStatePage = pagesDictionary[getPageBasedOnUserFromLocalStorage()]();

export const userInitialState = null

export const contractABI=abi.abi;

export const contractAddress='0x05114C1bFff3a9Ee5d4F979A5FfEA54FAd5724fD';

export const  shopAddress="0xF3d235408900e0024882C90f3614D10D93b16fCa"

export const url="http://20.113.164.156:2000";