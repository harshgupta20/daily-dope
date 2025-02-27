import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Home = () => {
    const [value, setValue] = useState(0);

    const MENU = [
        {
            value: "Can Did",
            route: "/recall/candid-remind"
        },
        // {
        //     value: "Can Did",
        //     route: "/recall/candid-remind"
        // },
        // {
        //     value: "Can Did",
        //     route: "/recall/candid-remind"
        // },
        // {
        //     value: "Can Did",
        //     route: "/recall/candid-remind"
        // },
        // {
        //     value: "Can Did",
        //     route: "/recall/candid-remind"
        // },
    ]

    return (
        <div className='h-full flex flex-col justify-between bg-teal-300'>
            <div className='min-h-[80%] overflow-y-scroll'>
                <Outlet />
            </div>
            <div className='border-2 border-gray-500'>
                <Box sx={{ width: "100%" }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        {
                            MENU?.map((option, key) => {
                                return (<BottomNavigationAction key={key} label={option?.value} icon={<RestoreIcon />} />)
                            })
                        }
                    </BottomNavigation>
                </Box>
            </div>
        </div>
    );
};

export default Home;
