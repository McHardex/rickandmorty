import { ModifiedCharacterDetail } from "Interfaces";
import {
  Card,
  ListItem,
  Box,
  ListItemText,
  Typography,
  Tooltip,
  makeStyles,
} from "@material-ui/core";

import {
  LocalHospital as LocalHospitalIcon,
  CalendarToday as CalendarTodayIcon,
} from "@material-ui/icons";
import formatDate from "utils/formatDate";
import ListItemWrapper from "Components/ListItemWrapper";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    width: "100%",
  },
  horizontalCard: {
    display: "flex",
    boxShadow: "0px 6px 12px rgb(255 255 255 / 30%)",
    alignItems: "flex-start",
  },
  avatar: {
    background: "#000",
  },
  icon: {
    color: "#fff",
  },
}));

interface Props {
  character: ModifiedCharacterDetail;
}

const CharacterDetails: React.FC<Props> = ({ character }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Box textAlign="center">
        <Tooltip title={character.name} interactive>
          <Typography color="secondary" noWrap className={classes.header}>
            {character.name}
          </Typography>
        </Tooltip>
      </Box>

      <Box display="flex" alignItems="center">
        <ListItemWrapper
          primary="Created"
          secondary={formatDate(character.created)}
          avatar
        >
          <CalendarTodayIcon className={classes.icon} />
        </ListItemWrapper>

        <ListItemWrapper primary="Status" secondary={character.status} avatar>
          <LocalHospitalIcon className={classes.icon} />
        </ListItemWrapper>
      </Box>

      <Card className={classes.horizontalCard}>
        <ListItem>
          <ListItemText primary="Species" secondary={character.species} />
        </ListItem>
        <Tooltip title={character.origin.name} interactive>
          <ListItem>
            <ListItemText
              primary="Origin"
              secondary={`${character.origin.name.slice(0, 5)}...`}
            />
          </ListItem>
        </Tooltip>
        <ListItem>
          <ListItemText primary="Gender" secondary={character.gender} />
        </ListItem>
      </Card>
    </>
  );
};

export default CharacterDetails;
