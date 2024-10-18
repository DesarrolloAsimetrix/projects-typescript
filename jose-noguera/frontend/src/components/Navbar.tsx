import { FC } from "react";


const Navbar: FC = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="/">CamiTracker</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav text-white">
                        <a className="nav-link active text-white" aria-current="page" href="/">Inicio</a>
                        <a className="nav-link text-white" href="/leaderboard">Clasificación</a>
                        <a className="nav-link text-white" href="/history">Hisórico</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar