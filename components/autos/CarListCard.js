import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  Box,
  FormControlLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Divider } from "@mui/material";
import Link from "next/link";
import Skeleton from "@material-ui/lab/Skeleton";
import { capitalCase } from "change-case";
import NumberFormat from "react-number-format";
import useStorage from "../../hooks/custom/useStorage";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  modelFormatting: {
    textTransform: "capitalize",
    textDecoration: "none",
  },
  modelFormattingUpper: {
    textTransform: "uppercase",
    textDecoration: "none",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },

  hover: {
    "&:hover": {
      border: "2px solid #556cd699",
    },
  },
}));

const emptyImage =
  "https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png";

const CarlistCard = ({ vehicle, setDataList }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { setItem } = useStorage();
  const handleAddFavorite = (vehicle) => {
    let data;
    if (!localStorage.getItem("favorites")) {
      data = [vehicle];
      localStorage.setItem("favorites", JSON.stringify(data));
      setIsFavorite(true);
    } else if (localStorage.getItem("favorites")) {
      data = JSON.parse(localStorage.getItem("favorites"));
      if (data.some((d) => d._id === vehicle._id)) {
        if (isFavorite) {
          const newFavorites = data.filter((d) => d._id !== vehicle._id);
          if (setDataList) {
            setDataList(newFavorites);
          }
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
          setIsFavorite(false);
          return;
        }
        return;
      }
      const newData = [...data, vehicle];
      if (newData.length > 4) {
        return enqueueSnackbar("Solo puedes tener un máximo de 4 favoritos", {
          variant: "error",
        });
      }

      localStorage.setItem("favorites", JSON.stringify(newData));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    if (vehicle && vehicle._id) {
      if (localStorage.getItem("favorites")) {
        let favs = JSON.parse(localStorage.getItem("favorites"));
        if (favs.some((d) => d._id === vehicle._id)) {
          setIsFavorite(true);
        }
      }
    }
  }, [vehicle]);

  return (
    <Link href={`/autos/${vehicle.make.name}/${vehicle.slug}`}>
      <Card id={vehicle?._id} className={(classes.root, classes.hover)}
        onClick={() => {
          console.log(vehicle._id)
          setItem('lastClickedVehicle', vehicle?._id)
        }}

      >
        {vehicle ? (
          <CardMedia
            className={classes.media}
            image={vehicle.mainImage ? vehicle.mainImage : emptyImage}
            title={`${vehicle && vehicle.model && capitalCase(vehicle.model)} ${vehicle && vehicle.year}`}
          />
        ) : (
          <Skeleton variant="rect" width="100%" height={156} />
        )}
        <CardContent>
          {vehicle ? (
            <>
              {/* <Link href={`/marcas/${vehicle && vehicle.make && vehicle.make.name}`}> */}
              {/* <a style={{ textDecoration: "none", color: "black" }}> */}
              <Typography sx={{ textTransform: "uppercase", color: "#505050" }}>
                {(vehicle && vehicle.make && vehicle.make.name).replace("-", " ")}
              </Typography>
              {/* </a> */}
              {/* </Link> */}
              <Link href={`/autos/${vehicle && vehicle.make && vehicle.make.name}/${vehicle && vehicle.slug}`}>
                <Box >
                  <a style={{ textDecoration: "none", color: "black" }}>
                    <Typography fontSize={"20px"} fontWeight={500} style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: 'calc(90%)', display: 'inline-block', textOverflow: 'ellipsis' }} >
                      {`${vehicle ? capitalCase(vehicle.model) : ''} ${vehicle.year}`}
                    </Typography>
                  </a>
                </Box>
              </Link>
              <Typography fontWeight={500} gutterBottom style={{ fontSize: 17 }}>
                Desde &nbsp;
                {vehicle.price ? (
                  <NumberFormat
                    value={vehicle.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                ) : (
                  "Precio pendiente"
                )}
              </Typography>
            </>
          ) : (
            <Box pt={0.5}>
              <Typography variant="subtitle1" component="div">
                <Skeleton />
              </Typography>
              <Typography
                variant="h6"
                className={classes.modelFormatting}
                component="div"
              >
                <Skeleton />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: 17 }}
                component="div"
              >
                <Skeleton />
              </Typography>
            </Box>
          )}
        </CardContent>
        <Divider />
        <CardActions disableSpacing>

          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteIcon style={{ color: "#888" }} />}
                checkedIcon={<FavoriteIcon style={{ color: "#c54065" }} />}
                name="checkedH"
                checked={
                  process.browser && localStorage.getItem("favorites") &&
                  JSON.parse(localStorage.getItem("favorites")).some(
                    (d) => vehicle && d._id === vehicle._id
                  )
                }
              />}
            onClick={(e) => handleAddFavorite(vehicle)}

          />
          {/* <FavoriteIcon /> */}
        </CardActions>
      </Card>
    </Link>
  );
};

export default CarlistCard;
