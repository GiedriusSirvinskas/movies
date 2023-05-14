import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  const logOut = async () => {
    await axios.get("http://localhost:3000/users/logout");
    getLoggedIn();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Paspausk
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {loggedIn ? (
          [
            <Link key="list" to="/list">
              <MenuItem onClick={handleClose}>Giedriaus Filmai</MenuItem>
            </Link>,
            <Link key="my-movies" to="/movies">
              <MenuItem onClick={handleClose}>Tavo filmai</MenuItem>
            </Link>,
            <MenuItem
              key="logout"
              onClick={() => {
                handleClose(), logOut();
              }}
            >
              Atsijungti
            </MenuItem>,
          ]
        ) : (
          <Link to="/login">
            <MenuItem onClick={handleClose}>Prisijunk pls</MenuItem>
          </Link>
        )}
      </Menu>
    </div>
  );
}
export default BasicMenu;
