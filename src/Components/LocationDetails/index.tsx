import React, { useState } from "react";
import clsx from "clsx";

import {
  Card,
  CardContent,
  makeStyles,
  ListItem,
  Box,
  ListItemAvatar,
  ListItemText,
  Collapse,
  IconButton,
} from "@material-ui/core";

import {
  PermIdentity as PermIdentityIcon,
  ExpandMore as ExpandMoreIcon,
  PersonPinCircle as PersonPinCircleIcon,
  MergeType as MergeTypeIcon,
  AspectRatio as AspectRatioIcon,
  House as HouseIcon,
} from "@material-ui/icons";
import { Location } from "Interfaces";
import ListItemWrapper from "Components/ListItemWrapper";

const useStyles = makeStyles((theme) => ({
  horizontalCard: {
    display: "flex",
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
  listItemPrimary: {
    color: "#9e9e9e",
  },
  listItemSecondary: {
    color: "#fff",
  },
  icon: {
    color: "#fff",
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
      <Collapse
        in={showLocationDetails}
        timeout="auto"
        unmountOnExit
        data-testid="collapse"
      >
        <CardContent>
          <ListItemWrapper primary="Location" secondary={location.name || "-"}>
            <PermIdentityIcon className={classes.icon} />
          </ListItemWrapper>

          <ListItemWrapper primary="Type" secondary={location.type || "-"}>
            <MergeTypeIcon className={classes.icon} />
          </ListItemWrapper>

          <ListItemWrapper
            primary="Dimension"
            secondary={location.dimension || "-"}
          >
            <AspectRatioIcon className={classes.icon} />
          </ListItemWrapper>

          <ListItemWrapper
            primary="No of Residents"
            secondary={location?.residents?.length || 0}
          >
            <HouseIcon className={classes.icon} />
          </ListItemWrapper>
        </CardContent>
      </Collapse>
    </Box>
  );
};

export default LocationDetails;
