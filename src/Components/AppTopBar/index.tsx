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
        <Typography variant="h5">Rick</Typography>
        <Typography variant="h3" color="secondary">
          &nbsp;And Mor
        </Typography>
        <Typography variant="h3">ty</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
