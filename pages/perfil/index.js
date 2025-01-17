import React, { useState, useEffect } from "react";
import { Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Container,
  CardContent,
  Grid,
  Avatar} from "@mui/material";
import Meta from "../../components/Meta";
import useAuth from "../../hooks/useAuth";
import Information from '../../components/profile/Information'
import PersonalInformation from '../../components/profile/PersonalInformation'
import { useRouter } from "next/router";
import {makeStyles} from '@mui/styles';
import UserMenu from '../../components/profile/UserMenu'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'inherit',
    minHeight: '100%',
    padding: theme.spacing(5),
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  gridStyle:{
    display:'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap:'1rem'
  },
  flexStyle:{

    width:'100%',
  },
  avatar:{
    width:'35%',
    height:'auto',
    margin:'0rem auto 1rem auto'
  },
  cardContent:{
    padding:'1.5rem 0rem 1.5rem 0rem'
  },
  container:{
    height: '80vh',
    display: 'flex',
    alignItems: 'center'
  },
  leftCards:{
    height:'100%',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  noPadding:{
    padding:'0!important'
  }

}));

const index = () => {
  const classes = useStyles();
  const {user} = useAuth();
  const router = useRouter();

  React.useEffect(()=>{
    if(user && user._id === undefined){
      router.push("/");
    }
  },[user]);

  if(!user || JSON.stringify(user) === '{}'){
    return null
  }  

  return (
    <>
    <Container maxWidth="lg">
      <Meta
        title="Perfil de usuario"
        description="Pagina de perfil de usuario"
      />

      <Grid container spacing={3}>
      <Grid sx={{ width: "100%"}} item xs={12} md={2} pr={2}>
          <UserMenu />
      </Grid> 

        <Grid item sm={4} xs={12} md={10}>

          <Grid pt={"1rem"} container spacing={2}>
          <Box pl={"28px"}>
            <Typography variant="h1" sx={{fontWeight: "700", fontSize: "25px",}}>
              Editar Perfil 
            </Typography>
          </Box>
            
            <Grid item md={12} xs={12}>
              <Box>
                <Information edit="true" style={{marginBottom: '1em'}}/>
              </Box> 
            </Grid>

            <Grid md={12} xs={12}>
              <PersonalInformation />
            </Grid> 

           

          </Grid>
          
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default index;
