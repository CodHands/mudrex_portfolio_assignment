import React, {Fragment} from 'react'
import Logo from '../../assets/images/logo.svg'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
    const openDialog = () => {
        props.history.push('/portfolio')
    }
    return (
        <Fragment>
            <div className="container">
                <nav className="navbar navbar-expand-sm ">
                    <Link to="/">
                        <img src={Logo} alt="traveo_logo" width="24"/> 
                        <span className="logo">MUDREX</span>
                    </Link>
                    <ul className="navbar-nav ml-auto">
                        <li className="cursor-pointer portfolio-button" onClick={openDialog}>
                            My Portfolio
                        </li>
                    </ul>
                </nav>
            </div>
        </Fragment>
    )
}

export default withRouter(Header)
