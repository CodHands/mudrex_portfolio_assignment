import React, {Fragment} from 'react'
import NoData from '../assets/images/nodata.png';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const NoDataFound = (props) => {

    const navigateToHome = () => {
        props.history.push('/')
    }

    return (
        <Fragment>
            <div className="text-center not-found">
                <img src={NoData} width="96" alt="no-data-image"/>
                <h3>Your Portfolio seems to be empty.</h3>
                <Button variant="contained" 
                        onClick={navigateToHome} color="primary" autoFocus>
                        Add Coin
                </Button>
            </div>
        </Fragment>
    )
}

export default withRouter(NoDataFound);
