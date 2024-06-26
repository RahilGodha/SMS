import { Icon } from "@iconify/react";
import { useRef, useState, useEffect } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

// components
import MenuPopover from "../../components/MenuPopover";
//

import { useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: "/dashboard/profile",
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: "#",
  },
  {
    linkTo: "/logout",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const {isAuthenticated } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  ////////////

  /////////////////user info stored in local host ///////
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));
  var load = localStorage.getItem("isAuthenticated");
  
  ////////// //logout user////////////////
  function logoutUser() {
    dispatch(logout());
    localStorage.clear();
    setTimeout(() => {
      console.log("inside setTimeout")
      navigate("/login")
    }, 500);
  
  }


  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar
          src="../../static/mock-images/avatars/avatar_default.jpg"
          alt="photoURL"
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {load ? (
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle1" noWrap>
              {userInfo["role"]}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "blue" }} noWrap>
              {userInfo["name"]}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {userInfo["email"]}
            </Typography>
          </Box>
        ) : (
          <Divider sx={{ my: 1 }} />
        )}

        <Divider sx={{ my: 1 }} />
        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
