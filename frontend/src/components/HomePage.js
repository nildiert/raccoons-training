import React from 'react';
import { Carousel } from 'react-bootstrap';
import './HomePage.css'

const HomePage = ({ currUser }) => {
    return (
        <div className='mt-5'>
            <h4 className=" my-2">Próximas salidas</h4>
            <Carousel>
                <Carousel.Item>
                    <div className="carousel-image-container">
                        <img
                            className="d-block w-100"
                            src="https://caminatasdeportivas.com/wp-content/uploads/2022/05/WhatsApp-Image-2022-10-03-at-8.40.56-PM-1.jpeg"
                            alt="Primera salida"
                        />
                        <div className="carousel-caption-overlay"></div>
                    </div>
                    <Carousel.Caption>
                        <h3>Farallones de Sutatausa</h3>
                        <p>18 de Feb</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel-image-container">
                        <img
                            className="d-block w-100"
                            src="https://media-cdn.tripadvisor.com/media/photo-s/19/35/af/71/uno-de-los-miradores.jpg"
                            alt="Segunda salida"
                        />
                        <div className="carousel-caption-overlay"></div>
                    </div>
                    <Carousel.Caption>
                        <h3>San Antonio del Tequendama</h3>
                        <p>25 de Feb</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomePage;
