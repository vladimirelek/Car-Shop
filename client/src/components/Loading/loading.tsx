import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
const Loading = () => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        height="100px"
        width="100px"
        position="relative"
      >
        <CircularProgress size={100} color="inherit" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
};
export default Loading;
