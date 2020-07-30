// libraries
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="page-footer">
    <Link className="logo logo--light" to="/">WTW</Link>

    <div className="copyright">© 2020 What to watch Ltd.</div>
  </footer>
);

export default Footer;
