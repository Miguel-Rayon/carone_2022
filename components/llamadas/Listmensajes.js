import React from 'react'
import {
    Box,
    Card,
  } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
export default function Listmensajes() { 
  return (
    <Box style={{width:'100%', height:'100%', margin:"0px", padding:"0px",  display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
        <List subheader={<li />} style={{width:'100%',height:"100%", margin:"0px", padding:"0px",  display:"flex", flexDirection:"column", justifyContent:"flex-start", overflow:"auto", position:"relative"}} >
        {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
  
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                  <ListItemAvatar>
                      <Avatar alt="Mensaje" style={{backgroundColor:"#213881"}}>
                        <PersonIcon style={{color:"#ffffff"}} />
                      </Avatar>
              </ListItemAvatar>
              <ListItemText
                secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                 {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
                }
              />
              </ListItem>
            ))}
       </ul>
        </li>
      ))}
        </List>
    </Box>
  )
}
