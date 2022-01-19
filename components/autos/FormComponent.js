import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import StoreIcon from "@material-ui/icons/Store";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import { useSnackbar } from "notistack";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  Box,
  Divider,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  selectedBorder: {
    border: "1px solid #5e72e4",
  },

  unselectedBorder: {
    border: "1px solid #252525",
  },
  makesStyles:{
    color: '#363784',
    textAlign:'center',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    display:'grid'
  }
});
const timeFrames = [
  {
    id: 0,
    value: "Solo quiero información"
  },
  {
    id: 1,
    value: "1 mes o menos"
  },
  {
    id: 2,
    value: "2 meses"
  },
  {
    id: 3,
    value: "3 meses o más"
  },
]

const FormComponent = ({ vehicle }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [storeIcon, setStoreIcon] = React.useState("");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    timeFrame: "Solo quiero información",
    downPayment: 0,
    store: "",
    vehicle: vehicle._id,
    vehicleName: vehicle.model,
    make: vehicle.make._id,
    year: vehicle.year,
    source: "605b541a020c150355aac5e6",
  });

  const { name, email, phone, timeFrame, downPayment } = formData;

  const onClickStore = (store) => {
    setStoreIcon(store.dpxStore);
    setFormData({ ...formData, store: store.dpxStore });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onHandleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendLead = async (lead) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "https://dealerproxapi.com/api/v1/leads/website",
        // "http://localhost:5001/api/v1/leads/website",
        lead,
        config
      );
      handleClose()
    } catch (err) {
      console.log(err);
    }
  };

  const onHandleSubmit = async(e) => {
    e.preventDefault();

    let emailValidation = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    let phoneValidation = new RegExp(/^[0-9]{10}$/);
    let downPaymentValidation = new RegExp(/^[0-9]+$/);

    if(formData.name === '' || formData.email === '' || formData.phone === '' || storeIcon === ''){
      return enqueueSnackbar("Por favor llena todos los campos", {
        variant: "error",
      });
    }else if(!emailValidation.test(formData.email)){
      return enqueueSnackbar("Por favor utiliza un email válido", {
      variant: "error",
    });
    }else if(!phoneValidation.test(formData.phone)){
      return enqueueSnackbar("Por favor utiliza un télefono válido (10 Dpigitos)", {
        variant: "error",
      });
    }else if(!downPaymentValidation.test(formData.downPayment)){
      return enqueueSnackbar("Ingresa un enganche válido (Solo números)", {
        variant: "error",
      });
    }else{
      
      await sendLead(formData);
      return enqueueSnackbar("Se ha enviado tu información, en breve un asesor se pondrá en contacto contigo.", {
        variant: "success",
      });
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        fullWidth
        size="large"
      >
        Solicitar Cotización
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Typography
          variant="h6"
          component="p"
          id="form-dialog-title"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          Contactar un Asesor
        </Typography>
        <DialogContent>
          <Box>
            <form onSubmit={onHandleSubmit}>
              <Box
                style={{
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                  border: "1px solid #dbf2ff",
                }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  style={{ marginBottom: 10 }}
                >
                  1. Datos Personales
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={name}
                  onChange={onHandleChange}
                  style={{
                    marginBottom: 10,
                    border: "1px solid #dbf2ff",
                    borderRadius: 10,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={onHandleChange}
                  fullWidth
                  style={{
                    marginBottom: 10,
                    border: "1px solid #dbf2ff",
                    borderRadius: 10,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Télefono"
                  variant="outlined"
                  name="phone"
                  value={phone}
                  onChange={onHandleChange}
                  fullWidth
                  style={{
                    marginBottom: 10,
                    border: "1px solid #dbf2ff",
                    borderRadius: 10,
                  }}
                />
              </Box>

              <Box
                style={{
                  border: "1px solid #dbf2ff",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  style={{ marginBottom: 10 }}
                >
                  2. Selecciona la Agencia de Preferencia
                </Typography>
                <Box className={classes.makesStyles}>
                  {vehicle.availableStore &&
                    vehicle.availableStore.map((store) => (
                      <Box
                        className={
                          storeIcon === store.dpxStore
                            ? classes.selectedBorder
                            : classes.unselectedBorder
                        }
                        key={store.dpxStore}
                        style={{ marginRight: 15 }}
                        onClick={() => onClickStore(store)}
                        style={{
                          cursor: "pointer",
                          borderRadius: 10,
                          padding: 5,
                          margin: 10,
                        }}
                      >
                        <Box display="flex" justifyContent="center">
                          <StoreIcon
                            style={{ fontSize: 50 }}
                            color={
                              storeIcon === store.dpxStore ? "primary" : "inherit"
                            }
                          />
                        </Box>
                        <Box display="flex" justifyContent="center">
                          <Typography
                            variant="body2"
                            gutterBottom
                            style={{ textTransform: "capitalize" }}
                          >
                            {store.make.name} {store.name}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center">
                          {storeIcon === store.dpxStore ? (
                            <CheckBoxOutlinedIcon
                              color={
                                storeIcon === store._id ? "primary" : "inherit"
                              }
                            />
                          ) : (
                            <CheckBoxOutlineBlankOutlinedIcon
                              color={
                                storeIcon === store._id ? "primary" : "inherit"
                              }
                            />
                          )}
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
              <Box
                style={{
                  border: "1px solid #dbf2ff",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  style={{ marginBottom: 10 }}
                >
                  3. Datos de Compra
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Tiempo de compra"
                  variant="outlined"
                  name="timeFrame"
                  value={timeFrame}
                  onChange={onHandleChange}
                  fullWidth
                  select 
                  SelectProps={{ native: true }}
                  style={{
                    marginBottom: 10,
                    border: "1px solid #dbf2ff",
                    borderRadius: 10,
                  }}
                >
                {timeFrames && timeFrames.map(timeFrame => (
                      <option key={timeFrame.id} value={timeFrame.value}>
                        {timeFrame.value}
                      </option>
                    ))}
                </TextField>
                <TextField
                  id="outlined-basic"
                  label="Enganche"
                  variant="outlined"
                  name="downPayment"
                  value={downPayment}
                  onChange={onHandleChange}
                  fullWidth
                  style={{
                    marginBottom: 10,
                    border: "1px solid #dbf2ff",
                    borderRadius: 10,
                  }}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Cotizar
              </Button>
            </form>
            <Typography variant="body2" gutterBottom>
              * Nunca compartiremos tus datos con nadie más.
            </Typography>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default FormComponent;