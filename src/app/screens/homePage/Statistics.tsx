import { Box, Button, Container, Stack } from "@mui/material";

export default function Statistics() {
    return <div className={"static-frame"}>
        <Container>
            <Stack className={"info"}>
                <Stack className={"static-box"}>
                    <Box className={"static-num"}>
                        12
                    </Box>
                    <Box className={"static-text"}>
                        Buildings
                    </Box>
                </Stack>
                <Stack className={"static-box"}>
                    <Box className={"static-num"}>
                        8
                    </Box>
                    <Box className={"static-text"}>
                        Experience
                    </Box>
                </Stack>
                <Stack className={"static-box"}>
                    <Box className={"static-num"}>
                        100+
                    </Box>
                    <Box className={"static-text"}>
                        Products
                    </Box>
                </Stack>
                <Stack className={"static-box"}>
                    <Box className={"static-num"}>
                        200+
                    </Box>
                    <Box className={"static-text"}>
                        Clients
                    </Box>
                </Stack>
            </Stack>
        </Container>
    </div>;
}