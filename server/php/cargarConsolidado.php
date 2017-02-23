<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
      
   $sql = "SELECT
               confFormatos.id,
                COUNT(Formatos.id) AS Cantidad,
                MAX(fechaCargue) AS Fecha
            FROM 
               confFormatos
                LEFT JOIN Formatos ON Formatos.Formato = confFormatos.id AND Formatos.idLogin = '$idUsuario'
            GROUP BY 
               confFormatos.id;";

   $result = $link->query($sql);

   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>