import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { BsPlusSquare } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import { BsXSquare } from "react-icons/bs";
function MyCard({ movie, postMovie, endpoint, deleteMovie }) {
  return (
    <Box width="300px" height="320px" className="fade-in">
      <Card sx={{ width: 300, height: "100%", position: "relative" }}>
        <CardMedia
          image={movie.imageURL}
          title={movie.name}
          component="img"
          height={150}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {movie.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.year} - {movie.category}
          </Typography>
          <CardActions
            sx={{ position: "absolute", left: "0px", bottom: "0px" }}
          >
            {endpoint === "/list" ? (
              <Tooltip title="Pridėti">
                <Button onClick={() => postMovie(movie)}>
                  <BsPlusSquare size={30} style={{color: "green"}}/>
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Ištrinti">
                <Button onClick={() => deleteMovie(movie)}>
                  <BsXSquare size={30} style={{color: "red"}}/>
                </Button>
              </Tooltip>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MyCard;
