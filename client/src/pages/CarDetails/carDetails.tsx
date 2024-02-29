import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import { Car } from "../../models/models";
import axios from "axios";
import "./carDetails-style.css";
import DirectionsCarFilledSharpIcon from "@mui/icons-material/DirectionsCarFilledSharp";
import CarRepairRoundedIcon from "@mui/icons-material/CarRepairRounded";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditRoadRoundedIcon from "@mui/icons-material/EditRoadRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import FiberSmartRecordOutlinedIcon from "@mui/icons-material/FiberSmartRecordOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import WebSocket from "../../features/WebSocket/webSocket";
import DeleteIcon from "@mui/icons-material/Delete";
interface Comment {
  commentId: number;
  sentFrom: string;
  message: string;
}
const CarDeatils = () => {
  const [showWebSocket, setShowWebSocket] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [car, setCar] = useState<Car | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const selector = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams<{ id: string }>();
  const carId = id && parseInt(id, 10);
  const navigate = useNavigate();

  const getMessagee = async (sentFrom: string, message: string) => {
    await agent.Cars.addComment({ carId, sentFrom, message }).catch((error) =>
      console.log(error)
    );
    await axios
      .get(`http://localhost:5030/api/Cars/${id}`)
      .then((response) => {
        setCar(response.data);
        setUserId(response.data.userId);
      })
      .catch((error) => console.log(error));
  };

  const deleteMessage = async (commentId: number) => {
    console.log(carId, commentId);
    carId && (await agent.Cars.deleteComment(carId, commentId));
    axios
      .get(`http://localhost:5030/api/Cars/${id}`)
      .then((response) => {
        setCar(response.data);
        setUserId(response.data.userId);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:5030/api/Cars/${id}`
          );
          setCar(response.data);
          setUserId(response.data.userId);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [id]);
  const images = [`http://localhost:5030/api/Cars/getImage${car?.slika}`];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  if (!car) return <h1>not found</h1>;
  const changeFeatured = async () => {
    await agent.Cars.addFeaturedCar({ carId });
    axios
      .get(`http://localhost:5030/api/Cars/${id}`)
      .then((response) => {
        setCar(response.data);
        setUserId(response.data.userId);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="details-container">
      <div>
        <div className="carousel">
          <img
            className="detalji-slike"
            src={images[0]}
            alt={`slide ${currentIndex}`}
          />

          <div className="user-message">
            <div
              className="korisnik"
              onClick={() => {
                navigate(`/user/${userId}`);
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 100 }} />
              <h2 className="ime">{car.username}</h2>
              <Button variant="outlined" color="inherit">
                {`↓Write a comment↓`}
              </Button>
            </div>

            <WebSocket getMessage={null} getComment={getMessagee} />
          </div>
        </div>

        <div className="glavni">
          <div className="podatak">
            <div className="icon">
              <DirectionsCarFilledSharpIcon sx={{ fontSize: 30 }} />
              <h3 className="naslov-informacije">Proizvodjac</h3>
            </div>
            <div className="naslov-tekst">
              <h4>{car.proizvodjac}</h4>
            </div>
          </div>
          <div className="podatak">
            <div className="icon">
              <CarRepairRoundedIcon sx={{ fontSize: 30 }} />
              <h3 className="naslov-informacije">Model</h3>
            </div>
            <div className="naslov-tekst">
              <h4>{car.model}</h4>
            </div>
          </div>
          <div className="podatak">
            <div className="icon">
              <LocalGasStationRoundedIcon sx={{ fontSize: 30 }} />
              <h3 className="naslov-informacije">Gorivo</h3>
            </div>
            <div className="naslov-tekst">
              <h4>{car.gorivo}</h4>
            </div>
          </div>
          <div className="podatak">
            <div className="icon">
              <CalendarMonthRoundedIcon sx={{ fontSize: 30 }} />
              <h3 className="naslov-informacije">Godiste</h3>
            </div>
            <div className="naslov-tekst">
              <h4>{car.godiste}</h4>
            </div>
          </div>
          <div className="podatak">
            <div className="icon">
              <EditRoadRoundedIcon sx={{ fontSize: 30 }} />
              <h3 className="naslov-informacije">Kilometraza</h3>
            </div>
            <div className="naslov-tekst">
              <h4>{car.kilometraza}</h4>
            </div>
          </div>
          <div className="podatak">
            <div className="icon">
              <NotesRoundedIcon sx={{ fontSize: 30 }} />
              <h3 className="naslov-informacije">Kubikaza</h3>
            </div>
            <div className="naslov-tekst">
              <h4>{car.kubikaza}</h4>
            </div>
          </div>
          <div className="podatak">
            <div className="icon">
              <BoltIcon sx={{ fontSize: 30 }} />
              <h3 className="naslov-informacije">Snaga motora</h3>
            </div>
            <div className="naslov-tekst">
              <h4>{car.snagaMotora}</h4>
            </div>
          </div>
          <div className="podatak">
            <div className="icon">
              <FiberSmartRecordOutlinedIcon sx={{ fontSize: 30 }} />
              <h3 className="naslov-informacije">Broj vrata</h3>
            </div>
            <div className="naslov-tekst">
              <h4>{car.brojVrata}</h4>
            </div>
          </div>
        </div>
        {selector.user?.roles.includes("Admin") ? (
          <div className="featured">
            <button className="featuredButton" onClick={changeFeatured}>
              {car.featured ? (
                <p className="admin">Izbrisi iz izdvojenih</p>
              ) : (
                <p className="admin">Dodaj u izdvojene</p>
              )}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="komentari">
        <h1>Comments</h1>
        {car.komentari.map((item) => {
          return (
            <div className="komentar">
              <div className="podaci-komentar">
                <AccountCircleIcon sx={{ fontSize: 50 }} />
                <h1 className="sentFrom">{`${item.sentFrom}:`}</h1>
              </div>
              <div className="poruka">
                <h2 className="sentMessage">{item.message}</h2>
                <DeleteIcon
                  sx={{ fontSize: 70 }}
                  className="dugme"
                  onClick={() => {
                    console.log(selector.user?.id, userId);
                    if (
                      selector.user?.id === userId ||
                      selector.user?.username === item.sentFrom
                    ) {
                      deleteMessage(item.commentId);
                    } else {
                      toast.warn("You dont have permision to do that");
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CarDeatils;
