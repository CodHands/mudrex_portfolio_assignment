import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function AddCoin(props) {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {coinDetails,price, amount} = props;

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle className="dialog-header" id="responsive-dialog-title">{`Add ${coinDetails.name} (${coinDetails.symbol}) to portfolio`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <form className={classes.container} noValidate autoComplete="off">
              <div className="row">
                  <div className="col-6">
                    <TextField
                        id="standard-name"
                        label="Amount"
                        name="amount"
                        className={classes.textField}
                        onChange={props.handleChange}
                        margin="normal"
                        value={amount}
                        required
                      />
                  </div>
                  <div className="col-6">
                    <TextField
                        id="standard-name"
                        label="Buy Price"
                        className={classes.textField}
                        onChange={props.handleChange}
                        margin="normal"
                        name="price"
                        value={price}
                        required
                      />
                  </div>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" 
            className={classes.button}
            onClick={() => props.handleClose()}>
            Close
          </Button>
          <Button variant="contained" 
                onClick={() => props.handleSubmit()} color="primary"
                disabled={!price || !amount} 
                className={classes.button} autoFocus>
            Add to Portfolio
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCoin;

