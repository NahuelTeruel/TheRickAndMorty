import { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hero.css';


function Hero() {
    const [personajes, setPersonajes] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);


    useEffect(() => {
        const obtenerPersonajes = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
                setPersonajes(response.data.results);
            } catch (err) {
                setError('Error al cargar los personajes. Intenta más tarde.');
                console.error(err);
            }
        };

        obtenerPersonajes();
    }, [page]);

    function nextPage() {
        if (page < 42) {
            setPage(page + 1);
        }
    }

    function prevPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <section className="text-white py-5 hero-section">
            <div className="container">
                <h1 className="text-center fw-bold mb-4">Personajes - The Rick and Morty</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-primary" onClick={prevPage} disabled={page === 1}>Anterior</button>
                    <button className="btn btn-primary" onClick={nextPage} disabled={page === 42}>Siguiente</button>
                </div>
                <div className="row">
                    {personajes.map((personaje) => (
                        <div key={personaje.id} className="col-md-3 mb-4">
                            <div className="card text-white bg-secondary h-100">
                                <img src={personaje.image} className="card-img-top img-thumbnail" alt={personaje.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{personaje.name}</h5>
                                    <p className="card-text mb-1">Especie: {personaje.species}</p>
                                    <p className="card-text">Género: {personaje.gender}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Hero;


