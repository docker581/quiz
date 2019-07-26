import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import logo1 from '../../smiley.png';

class Header extends Component {
    renderLinks = (links) => {
        return (links.map((link, index) => {
            return (
                <li key={index} className="nav-item">
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        className="nav-link xlink"
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        }))
    };
    render() {
        const links = [
            {to: '/', label: 'список тестов', exact: true},
        ];
        //console.log('AUTH', this.props.isAuthenticated);
        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'создать тест', exact: false});
            links.push({to: '/logout', label: 'выйти', exact: false});
        } else {
            links.push({to: '/auth', label: 'администрирование', exact: false});
        }
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/"><img src={logo1} alt=""/></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                {this.renderLinks(links)}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;