import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const App = () => {
  
  return (
    <AppBar color="transparent" sx={{backdropFilter:"blur(20px)", height: "50px", textAlign: "center"}} positon="sticky">
      <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, lineHeight: "50px", mt: -1 }} >
          <Link to="/">Mars Rovers Photos</Link>
      </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default App;