import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const iconLinkStyle = {
        margin: '0 10px',
        textDecoration: 'none',
        color: 'white',
        fontSize: '24px',
    };

    const copyrightStyle = {
        fontSize: '12px',
    };

    return (
        <footer style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', padding: '20px' }}>
            <div className="footer-icons">
                <Link to="https://www.instagram.com/_himanshu6386_/" style={iconLinkStyle}><i className="fab fa-instagram"></i></Link>
                <Link to="https://github.com/Himu25" style={iconLinkStyle}><i className="fab fa-github"></i></Link>
                <Link to="https://www.linkedin.com/in/himanshu-singh-47722b23a/" style={iconLinkStyle}><i className="fab fa-linkedin"></i></Link>
            </div>
            <p style={copyrightStyle}>&copy; 2023 Himanshu Singh. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
