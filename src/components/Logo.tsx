import { Typography, Box, useTheme, SxProps } from "@mui/material";
import { LogoImage } from "../assets/images";
import { Link as RRDLink } from "react-router-dom";

interface LogoProps {
  hasTitle?: boolean;
  style?: SxProps;
}

const Logo = (props: LogoProps): JSX.Element => {
  const theme = useTheme();
  const { hasTitle = true, style } = props;
  return (
    <RRDLink
      // to="/el-descanso/"
      to="/"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Box
        display="flex"
        gap="10px"
        alignItems="center"
        borderRadius="20px"
        bgcolor={theme.palette.background.default}
        boxShadow={`7px 7px 28px ${theme.palette.divider},-7px -7px 28px ${theme.palette.background.default}`}
        width="fit-content"
        sx={{
          padding: { xs: "2px 6px", md: "4px 20px" },
          ...style,
        }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src={LogoImage}
          alt="logo"
        />
        <Typography
          variant="h4"
          component="div"
          color={theme.palette.primary.main}
          sx={{
            display: hasTitle
              ? { xs: "block", sm: "none", lg: "block" }
              : "none",
            fontSize: { xs: "1rem", md: "2rem" },
          }}
        >
          El Descanso
        </Typography>
      </Box>
    </RRDLink>
  );
};

export default Logo;
