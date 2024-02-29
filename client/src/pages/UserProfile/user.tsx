import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../models/models";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
} from "@mui/material";
import React from "react";
import { Button, Card } from "react-bootstrap";
import "./user-style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useAppSelector } from "../../redux/store";
import agent from "../../api/agent";
const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  const navigate = useNavigate();
  const selector = useAppSelector((content) => content.auth);
  const card = (
    <React.Fragment>
      <CardContent>
        <div className="lokacija">
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <LocationOnIcon />
            {user?.lokacija}
          </Typography>
        </div>
        <AccountCircleIcon sx={{ fontSize: 100 }} />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Username
        </Typography>
        <Typography variant="h4" component="div">
          {user?.username}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Email
        </Typography>
        <Typography sx={{ fontSize: 20 }} variant="body2">
          {user?.email}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Kredit
        </Typography>
        <Typography sx={{ fontSize: 20 }} variant="body2">
          {user?.tokeni}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  useEffect(() => {
    id &&
      axios
        .get(`http://localhost:5030/api/Auth/${id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.log(error));
  }, [id]);
  return (
    <div className="user-info">
      <Box sx={{ minWidth: 275 }}>
        <Card className="kartica">{card}</Card>
      </Box>
      <div className="automobili">
        {user?.cars.map((item) => (
          <div
            className="card"
            onClick={() => {
              navigate(`/shop/${item.id}`);
            }}
          >
            <Card className="kartica-user">
              <CardMedia
                component="img"
                alt="seat"
                height="230"
                image={`http://localhost:5030/api/Cars/getImage${item.slika}`}
              />
              {item.userId === selector.user?.id ? (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const id = item.id;
                    await agent.Cars.deleteCar(id);
                    await axios
                      .get(`http://localhost:5030/api/Auth/${item.userId}`)
                      .then((response) => {
                        setUser(response.data);
                      })
                      .catch((error) => console.log(error));
                  }}
                >
                  <DeleteIcon />
                </button>
              ) : (
                ""
              )}
              <CardContent>
                <h2 className="proizvodjac">
                  {item.proizvodjac + " " + item.model}
                </h2>
              </CardContent>

              <CardActions className="podaci">
                <Typography
                  className="gorivo"
                  gutterBottom
                  variant="inherit"
                  component="div"
                  fontWeight="bold"
                >
                  <LocalGasStationIcon />
                  {item.gorivo}
                </Typography>
                <Typography
                  className="cijena"
                  gutterBottom
                  variant="inherit"
                  component="div"
                  fontWeight="bold"
                >
                  <PaidIcon />
                  {item.cijena} KM
                </Typography>
                <Typography
                  className="godiste"
                  gutterBottom
                  variant="inherit"
                  component="div"
                  fontWeight="bold"
                >
                  <CalendarMonthIcon />
                  {item.godiste}
                </Typography>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserDetails;
