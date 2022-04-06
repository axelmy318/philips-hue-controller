import React from 'react'
import '../assets/css/sidebars.css'
import '../assets/css/bootstrap.min.css'

const Sidebar = ({ selectedMenu, setSelectedMenu, menus }) => {
 
    return (
    <>
        <div className="d-flex flex-column flex-shrink-0 p-5 text-white bg-dark" style={{height: '100vh'}}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32"></svg>
            <span className="fs-4">PHC</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                { Object.keys(menus).map((item, index) => <React.Fragment key={index}><li className={`nav-item`}>
                        <div onClick={() => setSelectedMenu(item)} style={{marginRight: '10%', marginLeft: '10%'}} className={`mt-3 mb-3 text-125 text-center clickable nav-link text-white ${selectedMenu === item && 'active bg-primary'}`}>
                            {menus[item].icon} {menus[item].name}
                        </div>
                    </li>

                    {index < Object.keys(menus).length-1 && <hr />}
                </React.Fragment>)
                }
            </ul>
            <hr />
            <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
            </div>
        </div>
        <script src="../assets/js/sidebars.js"></script>
        <script src="../assets/js/bootstrap.bundle.min.js"></script>
    </>
    )
}

export default Sidebar