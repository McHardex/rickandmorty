import { ModifiedCharacterDetail } from "Interfaces";
import {
  Card,
  ListItem,
  Box,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";

import {
  LocalHospital as LocalHospitalIcon,
  CalendarToday as CalendarTodayIcon,
} from "@material-ui/icons";
import formatDate from "utils/formatDate";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  horizontalCard: {
    display: "flex",
    boxShadow: "0 3px 2px #eee",
    alignItems: "flex-start",
  },
}));

interface Props {
  character: ModifiedCharacterDetail;
}

const CharacterDetails: React.FC<Props> = ({ character }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" alignItems="center">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalHospitalIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Status" secondary={character.status} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CalendarTodayIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Created Date"
            secondary={formatDate(character.created)}
          />
        </ListItem>
      </Box>

      <Card className={classes.horizontalCard}>
        <ListItem>
          <ListItemText primary="Species" secondary={character.species} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Origin"
            title={character.origin.name}
            secondary={`${character.origin.name.slice(0, 5)}...`}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Gender" secondary={character.gender} />
        </ListItem>
      </Card>
    </>
  );
};

export default CharacterDetails;
