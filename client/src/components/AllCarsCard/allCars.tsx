import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import "./allCars-style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
interface Props {
  proizvodjac: string;
  model: string;
  slika: string;
  godiste: number;
  gorivo: string;
  cijena: number;
  username: string;
  id: number;
}

const AllCarsCards = ({
  id,
  proizvodjac,
  model,
  slika,
  cijena,
  godiste,
  gorivo,
  username,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/shop/${id}`);
      }}
    >
      <Card sx={{ maxWidth: 345, bgcolor: "text.disabled" }}>
        <CardMedia
          component="img"
          alt="seat"
          height="270"
          image={`http://localhost:5030/api/Cars/getImage${slika}`}
        />

        <CardContent>
          <h2 className="proizvodjac">{proizvodjac + " " + model}</h2>
          <div className="username">
            <AccountCircleIcon sx={{ fontSize: 30 }} />
            <h4>{username}</h4>
          </div>
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
            {gorivo}
          </Typography>
          <Typography
            className="cijena"
            gutterBottom
            variant="inherit"
            component="div"
            fontWeight="bold"
          >
            <PaidIcon />
            {cijena} KM
          </Typography>
          <Typography
            className="godiste"
            gutterBottom
            variant="inherit"
            component="div"
            fontWeight="bold"
          >
            <CalendarMonthIcon />
            {godiste}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
};
export default AllCarsCards;
