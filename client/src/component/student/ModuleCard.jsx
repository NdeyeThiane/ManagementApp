import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';


const ModuleCard = ({title, description}) => {
  return (
    
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component= 'img'
          height="180"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcR5U16C8yXgBpl7-Bc7Itjx3_LRl425zINA&s"
          alt="python languages logo"
        />
        <CardContent>
          <h2>{title}</h2>
          <p>{description}</p>
        </CardContent>
      </CardActionArea>
      </Card>
     

  )
}

export default ModuleCard