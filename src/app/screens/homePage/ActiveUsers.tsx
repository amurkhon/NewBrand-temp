import { Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import { CardContent, Chip, Link, Typography } from "@mui/joy";

/** REDUX SELECTOR **/ 

export default function ActiveUsers() {
    const topUsers = [1,2,3,4]

    return (
        <div className="active-users-frame">
            <Container>
                <Stack className="active-users">
                    <Box className="title">Active Users</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            { topUsers.length !== 0 ? (
                            topUsers.map(function(num: number, index){
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
                                    <Card
                                        className={"card"}
                                        variant="outlined"
                                        orientation="horizontal"
                                        sx={{
                                            width: "120px",
                                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                                        }}
                                        >
                                        <AspectRatio ratio="1" sx={{ width: 90 }}>
                                            <img
                                            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                                            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                                            loading="lazy"
                                            alt=""
                                            />
                                        </AspectRatio>
                                        <CardContent>
                                            <Typography level="title-lg" id="card-description">
                                            Yosemite Park
                                            </Typography>
                                            <Typography
                                            level="body-sm"
                                            aria-describedby="card-description"
                                            sx={{ mb: 1 }}
                                            >
                                            <Link
                                                overlay
                                                underline="none"
                                                href="#interactive-card"
                                                sx={{ color: 'text.tertiary' }}
                                            >
                                                California, USA
                                            </Link>
                                            </Typography>
                                            <Chip
                                            variant="outlined"
                                            color="primary"
                                            size="sm"
                                            sx={{ pointerEvents: 'none' }}
                                            >
                                            Cool weather all day long
                                            </Chip>
                                        </CardContent>
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