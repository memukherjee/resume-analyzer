import { Link, useLocation } from 'react-router';

export default function Navbar() {
    const { pathname } = useLocation();
    const navLinks = [
        {
            id: 1,
            text: 'For Job Seekers',
            path: '/'
        },
        {
            id: 2,
            text: 'For Recruters',
            path: '/recruiter'
        }
    ];

    return (
        <nav className="flex justify-between items-center px-12 py-4 mb-4 shadow-xl">
            <div className="nav-logo text-2xl text-primary font-bold">
                {pathname === '/recruiter' ? 'Resume Screener' : 'Resume Analyzer'}
            </div>
            <ul className="nav-links flex justify-between items-center gap-2">
                {navLinks.map((link) => (
                    <li
                        key={link.id}
                        style={
                            pathname === link.path
                                ? {
                                      backgroundColor: '#fff',
                                      color: 'var(--color-primary)'
                                  }
                                : {}
                        }
                        className="nav-link bg-primary text-white px-2 py-0.5 rounded border border-current">
                        <Link to={link.path}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
