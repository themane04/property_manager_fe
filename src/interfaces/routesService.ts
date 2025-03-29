import {FaBuilding, FaFileContract, FaHome, FaMoneyBillWave, FaStar, FaTools, FaUsers} from "react-icons/fa";
import {RoutesProps} from "./commonInterfaces.ts";

export const routes: RoutesProps[] = [
    {
        label: 'Tenants',
        path: '/tenants',
        icon: FaUsers,
        color: 'blue',
    },
    {
        label: 'Properties',
        path: '/properties',
        icon: FaBuilding,
        color: 'green',
    },
    {
        label: 'Features',
        path: '/features',
        icon: FaStar,
        color: 'orange',
    },
    {
        label: 'Rental Units',
        path: '/rental-units',
        icon: FaHome,
        color: 'teal',
    },
    {
        label: 'Rental Contracts',
        path: '/rental-contracts',
        icon: FaFileContract,
        color: 'purple',
    },
    {
        label: 'Payments',
        path: '/payments',
        icon: FaMoneyBillWave,
        color: 'pink',
    },
    {
        label: 'Maintenance Requests',
        path: '/maintenance-requests',
        icon: FaTools,
        color: 'red',
    },
]