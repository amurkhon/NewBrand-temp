import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function HomeNavbar() {
    const authMember = false;
    return <div className="home-navbar">
        <Stack className={"navbar-container"}>
            <Stack className="navbar-block">
                <Container className={"menu"}>
                    <Box>
                        <NavLink to="/">
                            <img className={"brand-logo"} src="/icons/brand.svg.svg" />
                        </NavLink>
                    </Box>
                    <Stack className={"links"}>
                        <Box className={"hover-line"}>
                            <NavLink activeClassName={"underline"} to="/">Home</NavLink>
                        </Box>
                        <Box className={"hover-line"}>
                            <NavLink activeClassName={"underline"} to="/products">Products</NavLink>
                        </Box>
                        {authMember ? (
                            <Box className={"hover-line"}>
                                <NavLink activeClassName={"underline"} to="/orders">Orders</NavLink>
                            </Box>
                        ): null}
                        {authMember ? (
                            <Box className={"hover-line"}>
                                <NavLink activeClassName={"underline"} to="/member-page">My Page</NavLink>
                            </Box>
                        ): null}
                        <Box className={"hover-line"}>
                            <NavLink activeClassName={"underline"} to="/help">Help</NavLink>
                        </Box>

                        {/*BASKET*/}

                        {!authMember ? (
                            <Box>
                                <Button variant="contained" className={"login-button"}>LOGIN</Button>
                            </Box>
                        ) : (
                            <img 
                                className={"user-avatar"}
                                src={"/icons/default-user.svg"}
                                aria-haspopup = {"true"}
                            />
                        )}
                    </Stack>
                </Container>
            </Stack>
            <Stack className={"header-frame"}>
                <Stack className={"detail"}>
                    <Box className={"head-main-text"}>Designed For Your Uniqueness</Box>
                    <Box className={"wel-text"}>The Choice, not just a choice!</Box>
                    <Box className={"service-text"}>24 hours service</Box>
                    <Box className={"signup"}>
                        {!authMember ? (
                            <Button 
                                variant={"contained"} 
                                className={"signup-button"}
                            >
                                SIGN UP
                            </Button>
                        ) : null}
                    </Box>
                </Stack>
                <Stack className={"logo-frame"}>
                    <div className={"logo-img"}></div>
                </Stack>
            </Stack>
        </Stack>
    </div>;
}