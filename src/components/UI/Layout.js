import React, {Fragment} from 'react';
import Header from './Header';

const Layout = props => {
    return (
        <Fragment>
            <Header length={props.portfolioLength}/>
            <div className="app-container pt-5">
                {props.children}
            </div>
        </Fragment>
    )
}

export default Layout
