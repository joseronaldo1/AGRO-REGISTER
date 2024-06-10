  import express from 'express';
  import bodyParser from 'body-parser';
  import cors from 'cors';

  import rutaValidacion from './src/routes/autotenticaion.route.js';
  import rutaUsuario from './src/routes/routes.usuarios.js';
  import rutaCostos from './src/routes/CostosRoutesdevSdva.js';
  import rutaCultivo from './src/routes/CultivosRoutesdevSdva.js';
  import rutaEmpleado from './src/routes/Empleado.route.js';
  import router from './src/routes/Finca.routes.js';
  import inversiones from './src/routes/InversionesroutesdevJrl.js';
  import rutalote from './src/routes/lotes.routes.js';
  import rutaProduccion from './src/routes/ProduccionRoutesDevpap.js';
  import rutaProgramacion from './src/routes/programacionRoutesDevdjz.js';
  import rutaDeTipoRecurso from './src/routes/TipoRecurso.route.js';
  import rutaDeActividad  from './src/routes/Actividad.route.js';
  import rutaDeVariedad from './src/routes/variedad.routes.js';

  const servidor = express();


<<<<<<< HEAD
  servidor.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));
=======
servidor.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'token'],
}));
>>>>>>> 27ea3bf2d00799f96fb6c06ea091b270913e8c01


  servidor.use(bodyParser.json());
  servidor.use(bodyParser.urlencoded({ extended: false }));

  servidor.set('view engine', 'ejs');
  servidor.set('views', './views');

  servidor.get('/documents', (req, res) => {
    res.render('document.ejs');
  });


servidor.use('/public', express.static('./public'));


  servidor.use(rutaValidacion);
  servidor.use(rutaUsuario);
  servidor.use(rutaCostos);
  servidor.use(rutaCultivo);
  servidor.use(rutaEmpleado);
  servidor.use(rutaDeActividad);
  servidor.use(router);
  servidor.use(inversiones);
  servidor.use(rutalote);
  servidor.use(rutaProduccion);
  servidor.use(rutaProgramacion);
  servidor.use(rutaDeTipoRecurso);
  servidor.use(rutaDeVariedad);

  servidor.listen(3000, () => {
    console.log("Está funcionando");
  });
