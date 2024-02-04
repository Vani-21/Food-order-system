import { Grid, Typography,Container,IconButton } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    // <div>
    //     <Grid className='bg-#303030 text-white text-center mt-10'
    //     container
    //     sx={{bgcolor:"#303030 ",color:"white",py:3}}>

    //         <Grid item xs={12} sm={6} md={3}>
    //             <Typography className='pb-5' variant = 'h6' >FoodieFiesta</Typography>
    //             <Button className='pb-5' variant='h6' gutterBotton >About us</Button>

    //         </Grid>

    //     </Grid>
    // </div>

    <footer style={{ backgroundColor: '#262626', color: '#fff', padding: '40px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              <p><PhoneIcon /> (123) 456-7890</p>
              <p><EmailIcon /> info@example.com</p>
            </Typography>
          </Grid>

       
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Us
            </Typography>
            <div>
              <IconButton href="#" style={{ color: '#fff' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" style={{ color: '#fff' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" style={{ color: '#fff' }}>
                <InstagramIcon />
              </IconButton>
            </div>
          </Grid>

       
          <Grid item xs={12} lg={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
           It is an online food ordering system is which will help you to browse through the menu of the restaurant and you can choose to have it delivered to your doorstep.
            </Typography>
          </Grid>

        </Grid>


        <div style={{ backgroundColor: '#262626', padding: '20px 0', textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; 2022 FoodieFiesta. All rights reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  )
}

export default Footer