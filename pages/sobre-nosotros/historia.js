import React from 'react';
import {
    Box,
    Grid,
    Typography,
  } from "@mui/material";

export default function Historia() {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Box style={{width:"100%", padding:"10px", textAlign:"center"}}>
                <Typography variant="h2" style={{fontSize:"39px"}}>Conoce mas de nosotros</Typography>
            </Box>
        </Grid>
        <Grid item xs={12} md={6}>
            <Box style={{width:"100%", justifyContent:"center"}}>
                <iframe width="100%" height="480" src="https://www.youtube.com/embed/FdBPDICLEUE" title="¡Bienvenidos a Car One Group!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Box>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="body2" style={{fontSize:"17px"}}>Si usted está en busca de un coche usado en México, Car One tiene un gran inventario de coches usados. Además tenemos muchos SUVs y pickups de segunda mano. Si quiere encontrar un coche usado a buen precio, venga a Car One para hablar con nuestros socios de ventas. Nos gustaría ayudarle encontrar el coche que busca a un buen precio</Typography>
        </Grid>
    </Grid>
  )
}
