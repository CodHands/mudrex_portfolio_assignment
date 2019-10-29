import React from 'react'

//material imports
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const AddCoinForm = (props) => {
    const {price, amount} = props;

    return (
        <form className={props.classes.container} noValidate autoComplete="off">
              <div className="row">
                  <div className="col-6">
                    <TextField
                        id="standard-name"
                        label="Amount"
                        name="amount"
                        className={props.classes.textField}
                        onChange={props.handleChange}
                        margin="normal"
                        value={amount}
                        required
                      />
                  </div>
                  <div className="col-6">
                      <FormControl className={props.classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                          value="BTC"
                          disabled
                        >
                          <MenuItem value="BTC">BTC</MenuItem>
                        </Select>
                      </FormControl>
                  </div>
                  <div className="col-6">
                    <TextField
                        id="standard-name"
                        label="Buy Price"
                        className={props.classes.textField}
                        onChange={props.handleChange}
                        margin="normal"
                        name="price"
                        value={price}
                        required
                      />
                  </div>
                  <div className="col-6">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Choose Date"
                            value={props.selectedDate}
                            onChange={props.handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                  </div>
              </div>
            </form>
    )
}

export default AddCoinForm
