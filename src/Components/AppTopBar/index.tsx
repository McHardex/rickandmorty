import { Toolbar, AppBar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#3c3e43",
    color: "#fff",
  },
}));

const AppTopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h4">Rick And Morty</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
