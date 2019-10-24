import React, {Fragment} from 'react'
import Logo from '../assets/images/logo.svg'

const Header = props => {
    return (
        <Fragment>
            <div className="container">
                <nav className="navbar navbar-expand-sm ">
                    <a className="navbar-brand" href="#">
                        <img src={Logo} alt="traveo_logo" width="24"/> <span className="logo">MUDREX</span>
                    </a>
                    <ul className="navbar-nav ml-auto">
                        <li className="cursor-pointer" onClick={props.openDialog}>
                            My Portfolio
                        </li>
                    </ul>
                </nav>
            </div>
        </Fragment>
    )
}

export default Header
