const { createTheme } = require("@mui/material");

const DarkTheme = createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#A52A2A"
        },
        secondary:{
            main:"#5A20CB"
        },
        black:{
            main:"#242B2E"
        },
        background:{
            main:"#000000",
            default:"#0D0D0D",
            paper:"#0D0D0D"
        },
        textColor:{
            main:"#111111"
        }
    }
})

export default DarkTheme; 