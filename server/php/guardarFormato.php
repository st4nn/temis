<?php
   include("../conectar.php"); 

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   //$Usuario = addslashes($_POST['Usuario']);
   $Usuario = 1;
   $datos = json_decode($_POST['datos']);

   foreach ($datos as $key => $value) 
   {
      $datos->$key = addslashes($value);
      //echo $key . ": " . $value;
   }

   $Respuesta = array();
   $Respuesta['Error'] = "";
   

   $sql = "INSERT INTO Formatos(idLogin, Formato, Datos) VALUES (
               '" . $Usuario . "',
               '" . $datos->Formato . "',
               '" . json_encode($datos) . "'
            )";

   $link->query(utf8_decode($sql));

   if ( $link->error <> "")
   {
      $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
   } else
   {
      $nuevoId = $link->insert_id;
      $Respuesta['datos'] = $nuevoId;
   }

   echo json_encode($Respuesta);
?>