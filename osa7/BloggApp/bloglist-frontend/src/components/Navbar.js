import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    AppBar,
    Toolbar,
    Container,
    Box,
    Menu,
    MenuItem,
    Typography,
    Button,
    Link as MaterialLink,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

/**
 * Navbar component.
 */
const Navbar = ({ handleLogout }) => {
    const reduxUser = useSelector((state) => state.user);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Collapsed menu items */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <MaterialLink component={Link} to="/">
                                    Home
                                </MaterialLink>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <MaterialLink component={Link} to="/users">
                                    Users
                                </MaterialLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/* Normal navigation links */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <MaterialLink
                            sx={{ my: 2, color: "white", marginRight: "20px" }}
                            component={Link}
                            to="/"
                        >
                            <Typography textAlign="center">Home</Typography>
                        </MaterialLink>
                        <MaterialLink
                            sx={{ my: 2, color: "white", marginRight: "20px" }}
                            component={Link}
                            to="/users"
                        >
                            <Typography textAlign="center">Users</Typography>
                        </MaterialLink>
                    </Box>
                    {/* Logout option */}
                    <Box>
                        <Typography
                            style={{
                                display: "inline-block",
                                marginRight: "10px",
                            }}
                        >
                            {reduxUser.name} logged in <br></br>
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                        >
                            logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
