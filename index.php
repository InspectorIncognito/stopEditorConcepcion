<!DOCTYPE html>
<html>
<head>
    <title>SmartCities Concepción</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">

    <meta name="keywords" content="smartcities, conpcecion, transapp">
    <meta name="description" content="">
    <link rel="shortcut icon" href="http://www.transapp.cl/wp-content/iso.png"  />
    
    <!-- Leaflet framework -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.0.2/dist/leaflet.js"></script>        
    
    <!-- jQuery framework -->
    <script src="https://code.jquery.com/jquery-1.11.3.js"></script>

    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="http://getbootstrap.com/dist/css/bootstrap.min.css"/>
    <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>

    <!-- Bootstrap Core CSS -->
    <link href="https://blackrockdigital.github.io/startbootstrap-simple-sidebar/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/simple-sidebar.css" rel="stylesheet">
    
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript" src="js/map.js"></script>
    <script type="text/javascript" src="js/Class.js"></script>
    <script type="text/javascript" src="js/structure_gtfs.js"></script>
    <script type="text/javascript" src="js/load_gtfs.js"></script>
    <script type="text/javascript" src="js/forms_load.js"></script>
    <script type="text/javascript" src="js/history.js"></script>
    <script type="text/javascript" src="js/modal.js"></script>
    <script src="js/js.cookie.js"></script>

    <!-- Leaflet MarkerCluster -->
    <link rel="stylesheet" href="http://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.css" />
    <link rel="stylesheet" href="http://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.Default.css" />
    <script src="http://leaflet.github.io/Leaflet.markercluster/dist/leaflet.markercluster-src.js"></script>
</head>
<body>
    <div class="spinner"></div>
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h2 class="modal-title">TranSapp Concepción</h2>
          </div>
          <div class="modal-body">
            <h4>Sobre la aplicación</h4>
            <p>TranSapp Concepción es la iniciativa del equipo TranSapp, para adaptar la aplicación móvil del mismo nombre (<a href="http://www.transapp.cl">TranSapp</a>) a la realidad del transporte público de Concepción.</p>
            <h4>¿Cuál es la función de esta página?</h4>
            <p>Esta página tiene como finalidad validar e incorporar información sobre los paraderos establecidos en Concepción, además de los servicios que se detienen en éstos. Actualmente la información con la cual se cuenta es del año 2015, y es por esto que el equipo de TranSapp se ve en la necesidad de pedir ayuda a sus usuarios, para poder actualizar los datos y de esta manera poder ofrecer una aplicación óptima y útil al servicio de toda la comunidad.</p>
            <h4>¿Cómo ayudar?</h4>
            
            <p> Al ingresar en la página nos encontraremos con la siguiente pantalla:<img src="img/main.png"/> Donde tendremos un menú lateral, y por el otro lado un mapa situado en la ciudad de Concepción.</p>
            
            <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-title-color">
                        <a data-toggle="collapse" data-parent="#accordion" href="#map_collapse">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                  1.- Mapa
                                </h4>
                            </div>
                        </a>
                    </div>
                    <div id="map_collapse" class="panel-collapse collapse">
                        <div class="panel-body">
                            <h4>1.- Mapa</h4>
                            <p> La vista inicial que tenemos del mapa es la siguiente:</p>
                            <img src="img/map1.png"/>
                            <p> Se pueden visualizar algunos círculos de colores con números adentro, estos círculos representan cierta zona, y el número dentro de ellos representa el número de paraderos que hay en esa zona geográfica</p>
                            <img src="img/map2.png"/>
                            <p>Al colocar el mouse encima de una zona, ésta se marca como aparece en la imagen, al hacer zoom en el mapa comenzaremos a ver los paraderos, como se muestra en la siguiente imagen</p>
                            <img src="img/map3.png"/>
                            <p> Si hacemos click encima de un paradero, nos entregará información sobre los servicios que se detienen en ese paradero.</p>
                            <img class="small-image center" src="img/map4.png">
                            <p> Como vemos en la imagen, hay un botón para Editar la información del paradero en caso de que esta sea incorrecta.</p>
                            <br>
                            <b>Agregar Paradero</b>
                            <p>En el mapa se puede apreciar el siguiente ícono:</p>
                            <img class="small-image center" src="img/addmarker.png">
                            <p>Al presionarlo podremos agregar un paradero nuevo, que no se encuentre en el mapa.</p>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-title-color">
                        <a data-toggle="collapse" data-parent="#accordion" href="#menu_collapse">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                  2.- Menú Lateral
                                </h4>
                            </div>
                        </a>
                    </div>
                    <div id="menu_collapse" class="panel-collapse collapse">
                        <div class="panel-body">
                            <h4> Menú Lateral </h4>
                            <p> El menú lateral posee 4 opciones.</p>
                            <img class="small-image center" src="img/menu.png"/>
                            <p> <b>Agregar paradero:</b> Este botón nos sirve para agregar un nuevo paradero en el mapa. Primero presionamos este botón luego seleccionamos el punto donde queremos agregar un paradero que no aparesca en el mapa.
                            <img src="img/add_stop.png"/>
                            Al hacer click, en el lugar que elegimos, nos aparecerá el siguiente ícono 
                            <img src="img/add_stop2.png"/> 
                            Tenemos 3 opciones las cuales son: <br>
                            <i>Sí (Conservar)</i>, la cual guardará la posición de ese paradero. <br>
                            <i>No (Cambiar)</i>, la cual eliminará el paradero y nos dejará marcar otra posición (sin necesidad de presionar nuevamente el botón Agregar paradero). <br>
                            <i>Eliminar</i>, el cual eliminará el paradero que hemos creado.<br> 
                            Al presionar <i>Sí (Conservar)</i> nos encontraremos con el siguiente formulario: 
                            <img class="small-image center" src="img/add_stop3.png"/> Primero se puede ingresar el Nombre del paradero (Opcional), luego los servicios que se detienen en ese paradero (Por ejemplo si el microbus que pasa por ahí se llama Buses Hualpensan 02a Centinela, el servicio es <b><i>02a</i></b>).</p>
                            <img class="small-image center" src="img/add_stop4.png"/>
                            <p> Luego de ingresar los datos, presionamos Aceptar y se mostrará un mensaje si los datos fueron guardados correctamente como en la siguiente imagen</p>
                            <img class="center" src="img/add_stop5.png"/>
                            <br>
                            <br>
                            <p><b>Ver Historial:</b> Este botón nos sirve para visualizar los paraderos que otras personas han agregado al mapa. Al presionarlo nos mostrará una pantalla como la siguiente</p>
                            <img class="small-image center" src="img/history.png"/>
                            <p>Primero tenemos un botón para agregar al mapa todos los paraderos que han sido agregados por otras personas hasta la fecha actual, abajo de este botón tenemos una lista con todos los paraderos que han sido agregados, y podemos agregarlos individualmente al presionarlo.</p>
                            <p><b>Ayuda:</b> Este botón nos abrirá estas instrucciones nuevamente.</p>
                        </div>
                    </div>
                </div>
            </div> 
          </div>
          <div class="modal-footer">
            <input type="checkbox" id="checkShow" style="min-width: 20px;"><div style="display: inline; padding-right: 10px;">No volver a mostrar</div>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
     <div id="wrapper">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="http://www.transapp.cl/">
                        Smartcities Concepción
                    </a>
                </li>
                <li id="addstop">
                    <a href="#">Agregar paradero</a>
                </li>
                <li >
                    <a href="#" class="history_expand">Ver Historial</a>
                    <div id="history" class="history_class">
                        
                    </div>
                </li>
                <li>
                    <a id="help">Ayuda</a>
                </li>
                <li>
                    <a href="http://www.transapp.cl/#contacto">Contacto</a>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div id="message" class="">
                </div>
                <div id="mapid"></div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->

    </div>
    <!-- /#wrapper -->
    <!-- Bootstrap Core JavaScript -->
    <script src="https://blackrockdigital.github.io/startbootstrap-simple-sidebar/js/bootstrap.min.js"></script>

</body>
</html>
