import React, { useState } from 'react'
import { Box, Link, Typography, useTheme } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const loggedIn = JSON.parse(localStorage.getItem('authToken'))
const Navbar = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));

    const handleLogout = async () => {
        try {
            await axios.post("/api/v1/auth/logout");
            localStorage.removeItem("authToken");
            toast.success("logout successfully ");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box width={"100%"}
            backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign={"center"} sx={{ boxShadow: 3, mb: 2 }} >
            <Typography variant='h1' color={'primary'} fontWeight={'bold'}>
                A To Z AI
            </Typography>
            {
                !loggedIn && <>
                    <NavLink to='/register' p={2}>Sing Up</NavLink>
                    <NavLink to='/login' p={2}>Sing In</NavLink>
                </>
            }
            {loggedIn && <NavLink to={'/login'} onClick={handleLogout} p={2}>Log out</NavLink>}
        </Box>
    )
}

export default Navbar