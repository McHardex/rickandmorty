import React, { useState } from "react";
import clsx from "clsx";

import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  ListItem,
  Box,
  ListItemAvatar,
  ListItemText,
  Collapse,
  IconButton,
} from "@material-ui/core";

import {
  Folder as FolderIcon,
  ExpandMore as ExpandMoreIcon,
  PersonPinCircle as PersonPinCircleIcon,
  MergeType as MergeTypeIcon,
  AspectRatio as AspectRatioIcon,
  House as HouseIcon,
} from "@material-ui/icons";
import { Location } from "Interfaces";

const useStyles = makeStyles((theme) => ({
  horizontalCard: {
    display: "flex",
    boxShadow: "0 3px 2px #eee",
    alignItems: "flex-start",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

interface Props {
  location: Location;
}

const LocationDetails: React.FC<Props> = ({ location }: Props) => {
  const classes = useStyles();
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  const handleShowLocationDetails = () => {
    setShowLocationDetails(!showLocationDetails);
  };

  return (
    <Box mt={3}>
      <Card className={classes.horizontalCard}>
        <ListItem>
          <ListItemAvatar>
            <PersonPinCircleIcon />
          </ListItemAvatar>
          <ListItemText primary="Location Details" />
        </ListItem>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: showLocationDetails,
          })}
          onClick={handleShowLocationDetails}
          aria-expanded={showLocationDetails}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Card>

      {/* details */}
      <Collapse in={showLocationDetails} timeout="auto" unmountOnExit>
        <CardContent>
          <ListItem>
            <ListItemAvatar>
              <FolderIcon />
            </ListItemAvatar>
            <ListItemText primary="Name" />
            <Typography>{location.name}</Typography>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <MergeTypeIcon />
            </ListItemAvatar>
            <ListItemText primary="Type" />
            <Typography>{location.type}</Typography>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <AspectRatioIcon />
            </ListItemAvatar>
            <ListItemText primary="Dimension" />
            <Typography>{location.dimension}</Typography>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <HouseIcon />
            </ListItemAvatar>
            <ListItemText primary="No of Residents" />
            <Typography>{location?.residents?.length || 0}</Typography>
          </ListItem>
        </CardContent>
      </Collapse>
    </Box>
  );
};

export default LocationDetails;
