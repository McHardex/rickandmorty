import {
  CircularProgress,
  Typography,
  Backdrop,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

interface Props {
  isLoading: boolean;
  message: React.ReactNode;
}

const Loader: React.FC<Props> = ({ isLoading, message }: Props) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="secondary" />
      <Typography variant="h6">{message}</Typography>
    </Backdrop>
  );
};

export default Loader;
