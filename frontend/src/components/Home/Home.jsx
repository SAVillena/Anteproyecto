import React from 'react';
import './Home.css'; // Importar el archivo CSS para estilos
import EmbeddedPage from '../iframe';
import Graphics from '../Graphics';

function Home() {
    return (
        <div className="home-container">
            <div className="main-content">
                <aside className="sidebar">Filtros</aside>
                <div className="content">
                    <div className="left-pane">
                        Citysense
                        <EmbeddedPage />
                    </div>
                    <div className="right-pane">
                        <section className="graphics">Gráficos
                            <Graphics />
                        </section>
                        <section className="alerts">Alertas</section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
