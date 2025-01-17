import React,{useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import {Modal,Fade,Backdrop,Button,Box, Grid, Typography,Link} from '@mui/material';
// import Authcomponent from './AuthComponent';
import { SportsEsports } from '@material-ui/icons';
import ApplicantComponent from "./applicant/ApplicantComponent";
import useApplicant from '../hooks/useApplicant';
import { useSnackbar } from "notistack";
import useAuth from "../hooks/useAuth";
import NoUserResumeUpload from './applicant/NoUserResumeUpload';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const GeneralModal = ({job,fullWidth=false}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [postulated, setPostulated] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [select, setSelect] = React.useState('auth');
  const [modalPostulated, setModalPostulated] = React.useState(false);
  const {createApplicant} = useApplicant();
  const { enqueueSnackbar } = useSnackbar();
  const [login, setLogin] = React.useState(false);
  const {user}=useAuth();

  const handleOpen = () => {
    if(user && user._id){
      setSelect('resume');
    }else{
      setSelect('noUser');
    }
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(user && user.name){
      setOpen(false);
    }
    else{
      setPostulated(false);
    }
    handlePostulated();
  },[user,job]);


const handlePostulated = ()=>{
  var found = false;
  if(user && user._id){
    job.applicants.forEach(item=>{
      if(item._id === user._id){

        found = true;
      }

    });
  }
  setPostulated(found);
  setDisabled(found);
};


  useEffect(()=>{
    if(modalPostulated){
      setPostulated(true);
    setDisabled(true);
    }
  },[modalPostulated]);

  const handleResume = ()=>{
    if(job && user){
      createApplicant({user:user._id,job:job});
      setPostulated(true);
      setDisabled(true);
      enqueueSnackbar('Postulado correctamente', {
        variant: 'success'
      });
    }
    // create applicant job + user con resume
  };

  return (
    <>
 
      {(postulated)?<Button disabled={disabled} variant="contained" color="primary">Postulado</Button>: (user && user.resume)?
      <Button fullWidth={fullWidth} disabled={disabled} variant="contained" color="primary" onClick={handleResume}>Aplicar</Button> :
      <>
      <Grid container>
       
        {
          user && !user._id &&
          <>
          <Grid item xs={12} >
            <Button fullWidth={fullWidth} variant="contained" color='primary' onClick={()=>{handleOpen();setLogin(true);}}>
            Aplicar
            </Button>
          </Grid>
         {/* {fullWidth &&
          <Grid item xs={12} style={{textAlign: 'center'}}>
          <Typography 
            style={{ cursor: 'pointer'}}
            onClick={()=>{handleOpen();setLogin(false)}}
            variant='body1'
            color='textSecondary'
          >
            ¿No tienes cuenta?
            {' '}
            <Link>Registrate!</Link>
          </Typography>
        </Grid>} */}
          </>
       }
       {
         user && user.role && 
          <Grid item xs={12} >
            <Button fullWidth={fullWidth} disabled={disabled} variant="contained" color="primary" onClick={()=>{handleOpen(); setLogin(false)}}>
              Aplicar
            </Button>
          </Grid>
       }

      </Grid>
      
        
      </>
      }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box>
            {select==='resume'? 
            <ApplicantComponent setModalPostulated={setModalPostulated} job={job} setOpen={setOpen}/>
            :
            <NoUserResumeUpload {...{setModalPostulated,job,setOpen}} />
            }          
          </Box>
          
        </Fade>
      </Modal>
    </>
  );
}


export default GeneralModal;

