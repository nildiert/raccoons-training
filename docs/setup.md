## Setup y tan

1. Ejecuta en tu terminal:
    > bundle exec rake secret
2. copia el contenido dentro de un archivo .env y coloca dentro:
    > DEVISE_JWT_SECRET_KEY=<rake secret>
3. Corre las seeds
4. En postman usa la ruta <localhost:3000/login>
   > {"user": "email": "niljordan23@gmail.com", "password": "password"}
5. Toma el header de authentication de postman
6. Agrega bearer token a tus peticiones

