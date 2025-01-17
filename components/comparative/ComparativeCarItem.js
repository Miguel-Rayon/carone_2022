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
  Grid,
  Container,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Divider } from "@mui/material";
import Link from "next/link";
import Skeleton from "@material-ui/lab/Skeleton";
import { capitalCase } from "change-case";
import NumberFormat from "react-number-format";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
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

const ComparativeCarItem = ({ vehicle, setDataList, handleDeleteFav }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
          handleDeleteFav(vehicle._id)
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
    <Card className={(classes.root, classes.hover)}>
      {vehicle ? (
        <Link href={`/autos/${vehicle.make.name}/${vehicle.slug}`}>
          <a>
            <CardMedia
              className={classes.media}
              image={vehicle.mainImage ? vehicle.mainImage : emptyImage}
              title={`${capitalCase(vehicle.model)} ${vehicle.year}`}
            />
          </a>
        </Link>
      ) : (
        <Skeleton variant="rect" width="100%" height={156} />
      )}
      <CardContent>
        {vehicle ? (
          <>
            <Link href={`/marcas/${vehicle.make.name}`}>
              <a style={{ textDecoration: "none", color: "black" }}>
                <Typography
                  variant="subtitle1"
                  className={
                    (classes.modelFormatting, classes.modelFormattingUpper)
                  }
                >
                  {vehicle.make.name}{" "}
                </Typography>
              </a>
            </Link>
            <Link href={`/autos/${vehicle.make.name}/${vehicle.slug}`}>
              <a style={{ textDecoration: "none", color: "black" }}>
                <Typography variant="h6" className={classes.modelFormatting}>
                  {`${vehicle.model} ${vehicle.year}`}
                </Typography>
              </a>
            </Link>
            <Typography variant="h6" gutterBottom style={{ fontSize: 17 }}>
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
      {/* Features */}
      <Container>
        {vehicle.features &&
          vehicle.features.map((feature,i) => {
            if(i>=5)return '';
            return (
              <div  key={i}>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    fontSize: 17,
                    marginTop: 10,
                    textTransform: "capitalize",
                  }}
                >
                  {feature.title}{" "}
                </Typography>
                <Typography>{feature.description}</Typography>
              </div>
            )
          })}
      </Container>
      {/* End Features */}
      <Divider />
      <CardActions disableSpacing>
        <Tooltip title="Favorite">
          <Checkbox
            icon={<FavoriteIcon style={{ color: "#888" }} />}
            checkedIcon={<FavoriteIcon style={{ color: "#c54065" }} />}
            name="checkedH"
            checked={
              localStorage.getItem("favorites") &&
              JSON.parse(localStorage.getItem("favorites")).some(
                (d) => vehicle && d._id === vehicle._id
              )
            }
            onClick={(e) => handleAddFavorite(vehicle)}
          />
        </Tooltip>
        {/* <FavoriteIcon /> */}
      </CardActions>
    </Card>
  );
};

export default ComparativeCarItem;
