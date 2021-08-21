import React, { useState } from "react";
import clsx from "clsx";

import {
  Card,
  CardContent,
  makeStyles,
  ListItem,
  Chip,
  ListItemAvatar,
  Collapse,
  IconButton,
  Badge,
  ListItemText,
} from "@material-ui/core";

import {
  ExpandMore as ExpandMoreIcon,
  FeaturedPlayList as FeaturedPlayListIcon,
} from "@material-ui/icons";

import { Episode } from "Interfaces";

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
  chip: {
    margin: theme.spacing(0.5),
  },
}));

interface Props {
  episode: Episode[];
}

const ChaptersFeatured: React.FC<Props> = ({ episode }: Props) => {
  const classes = useStyles();
  const [showChaptersFeatured, setShowChaptersFeatured] = useState(false);

  const handleShowChaptersFeatured = () => {
    setShowChaptersFeatured(!showChaptersFeatured);
  };

  return (
    <>
      <Card className={classes.horizontalCard}>
        <ListItem>
          <ListItemAvatar>
            <Badge
              badgeContent={episode.length}
              color="secondary"
              data-testid="badge"
            >
              <FeaturedPlayListIcon />
            </Badge>
          </ListItemAvatar>
          <ListItemText primary="Chapters Featured" />
        </ListItem>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: showChaptersFeatured,
          })}
          onClick={handleShowChaptersFeatured}
          aria-expanded={showChaptersFeatured}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Card>
      <Collapse in={showChaptersFeatured} timeout="auto" unmountOnExit>
        <CardContent>
          {episode.map((singleEpisode) => (
            <Chip
              key={singleEpisode.id}
              className={classes.chip}
              size="small"
              label={singleEpisode.name}
            />
          ))}
        </CardContent>
      </Collapse>
    </>
  );
};

export default ChaptersFeatured;
