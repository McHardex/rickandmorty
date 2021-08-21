import {
  makeStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemTextProps,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItemPrimary: {
    color: "#9e9e9e",
  },
  listItemSecondary: {
    color: "#fff",
  },
  avatar: {
    background: "#000",
  },
}));

interface Props extends ListItemTextProps {
  children: React.ReactElement;
  avatar?: Boolean;
}

const ListItemWrapper: React.FC<Props> = ({
  primary,
  secondary,
  children,
  avatar,
}: Props) => {
  const classes = useStyles();

  return (
    <ListItem>
      {avatar ? (
        <ListItemAvatar data-testid="show-avatar">
          <Avatar className={classes.avatar}>{children}</Avatar>
        </ListItemAvatar>
      ) : (
        <ListItemAvatar data-testid="hide-avatar">{children}</ListItemAvatar>
      )}
      <ListItemText
        primary={primary}
        secondary={secondary}
        classes={{
          primary: classes.listItemPrimary,
          secondary: classes.listItemSecondary,
        }}
      />
    </ListItem>
  );
};

export default ListItemWrapper;
