import { ModifiedCharacterDetail } from "Interfaces";
import {
  Card,
  ListItem,
  Box,
  ListItemText,
  Typography,
  Tooltip,
  Grid,
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
  secondaryList: {
    color: "#0000008a",
    fontSize: "12px",
  },
}));

interface Props {
  character: ModifiedCharacterDetail;
}

interface SecondaryListProps {
  value: string;
}

const SecondaryList: React.FC<SecondaryListProps> = ({
  value,
}: SecondaryListProps) => {
  const classes = useStyles();
  return (
    <Tooltip title={value} interactive>
      <Typography noWrap className={classes.secondaryList}>
        {value}
      </Typography>
    </Tooltip>
  );
};

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

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={6}>
          <ListItemWrapper
            primary="Created"
            secondary={formatDate(character.created)}
            avatar
          >
            <CalendarTodayIcon className={classes.icon} />
          </ListItemWrapper>
        </Grid>
        <Grid item xs={6}>
          <ListItemWrapper primary="Status" secondary={character.status} avatar>
            <LocalHospitalIcon className={classes.icon} />
          </ListItemWrapper>
        </Grid>
      </Grid>

      <Card>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ListItem>
              <ListItemText
                primary="Species"
                secondary={<SecondaryList value={character.species} />}
              />
            </ListItem>
          </Grid>

          <Grid item xs={4}>
            <ListItem>
              <ListItemText
                primary="Origin"
                secondary={<SecondaryList value={character.origin.name} />}
              />
            </ListItem>
          </Grid>

          <Grid item xs={4}>
            <ListItem>
              <ListItemText
                primary="Gender"
                secondary={<SecondaryList value={character.gender} />}
              />
            </ListItem>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CharacterDetails;
