import { Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import { Link, Typography } from "@mui/joy";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveTopUsers } from "./selector";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";

import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';

/** REDUX SELECTOR **/ 
const topUsersRetriever = createSelector(retrieveTopUsers,
    (topUsers) => ({topUsers})
);

export default function ActiveUsers() {
    const { topUsers } = useSelector(topUsersRetriever);

    return (
        <div className="active-users-frame">
            <Container>
                <Stack className="active-users">
                    <Box className="title">Active Users</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            { topUsers?.length !== 0 ? (
                            topUsers?.map(function(member: Member, index){
                                const imagePath = `${serverApi}/${member?.memberImage}`
                                return (
                                    // <Card key={num} className="card">
                                    //     <CardOverflow>
                                    //         <AspectRatio ratio="1">
                                    //             <img style={{borderRadius: "50%"}} src={"/img/justin.webp"} alt="" />
                                    //         </AspectRatio>
                                    //     </CardOverflow>
                                    //     <CardOverflow variant="soft" className="name-frame">
                                    //         <Box className="user-name">Justin</Box>
                                    //     </CardOverflow>
                                    // </Card>
                                    <Card variant="plain" sx={{ width: 300, bgcolor: 'initial', p: 0 }}>
                                        <Box sx={{ position: 'relative' }}>
                                            <AspectRatio ratio="4/5">
                                            <figure>
                                                <img
                                                src={imagePath}
                                                loading="lazy"
                                                alt="Yosemite by Casey Horner"
                                                />
                                            </figure>
                                            </AspectRatio>
                                            <CardCover
                                            className="gradient-cover"
                                            sx={{
                                                '&:hover, &:focus-within': {
                                                opacity: 1,
                                                },
                                                opacity: 0,
                                                transition: '0.1s ease-in',
                                                background:
                                                'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                                            }}
                                            >
                                            {/* The first box acts as a container that inherits style from the CardCover */}
                                            <div>
                                                <Box
                                                sx={{
                                                    p: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5,
                                                    flexGrow: 1,
                                                    alignSelf: 'flex-end',
                                                }}
                                                >
                                                <Typography level="h2" noWrap sx={{ fontSize: 'lg' }}>
                                                    <Link
                                                    href="#dribbble-shot"
                                                    overlay
                                                    underline="none"
                                                    sx={{
                                                        color: '#fff',
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        display: 'block',
                                                    }}
                                                    >
                                                    {member?.memberNick}
                                                    </Link>
                                                </Typography>
                                                <IconButton
                                                    size="sm"
                                                    variant="solid"
                                                    color="neutral"
                                                    sx={{ml: 'auto', bgcolor: 'rgba(0 0 0 / 0.2)' }}
                                                >
                                                    <Favorite />
                                                </IconButton>
                                                </Box>
                                            </div>
                                            </CardCover>
                                        </Box>
                                    </Card>
                                );
                            })) : <Box className="no-data">No Active Users!</Box>}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}