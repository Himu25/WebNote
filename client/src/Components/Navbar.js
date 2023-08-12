import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '' });
    const host = 'https://webnote.onrender.com';

    async function fetchUser() {
        const response = await fetch(`${host}/api/auth/fetchUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setUser(json.user);
    }

    useEffect(() => {
        if (localStorage.getItem('isAuth')) {
            fetchUser();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        toast.error('Logged out');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f5ba13' }} id="Nav">
            <div className="container-fluid">
                <Link
                    className="navbar-brand"
                    to="/"
                    style={{ fontSize: '24px', color: 'white', fontFamily: 'McLaren, cursive' }}
                >
                    WebNote
                </Link>
                <div className="d-flex align-items-center">
                    {localStorage.getItem('isAuth') && (
                        <div className="dropdown">
                            <button
                                className="btn mx-1 profile-button"
                                type="button"
                                id="profileDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <div
                                    style={{
                                        backgroundColor: '#f5ba13',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '2px solid white'
                                    }}
                                >
                                    <i className="fa fa-user text-white" aria-hidden="true"></i>
                                </div>
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="profileDropdown"
                                style={{ minWidth: '200px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
                            >
                                <div className="dropdown-item" style={{ marginBottom: '4px' }}>
                                    <p style={{ marginBottom: '4px' }}>Name: {user.name}</p>
                                    <p style={{ marginBottom: '0' }}>Email: {user.email}</p>
                                </div>
                                <hr className="dropdown-divider" />
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="dropdown-item"
                                    style={{
                                        backgroundColor: 'grey',
                                        color: 'white',
                                        transition: 'background-color 0.3s',
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#f5ba13')}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'grey')}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
