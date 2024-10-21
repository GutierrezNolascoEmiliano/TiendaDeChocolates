<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
        // Capturar las variables enviadas por POST o GET
        //$nombre = $_REQUEST["nombre"];
    }

    include('db_config.php');
    $conn = conectarDB();
    if (is_string($conn)) {
        echo $conn; 
    } else {

        // Definir la consulta
        $sql = "SELECT id_usuario, nombre, usuario, correo FROM usuarios  ";
        echo $sql;  //probar estructura de la consulta
        // Ejecutar la consulta
        $result = $conn->query($sql);

        // Verificar si hay resultados
        if ($result->num_rows > 0) {
            // Construir las filas de la tabla con los resultados
            while ($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>" . $row['id_usuario'] . "</td>
                        <td>" . $row['nombre'] . "</td>
                        <td>" . $row['usuario'] . "</td>
                        <td>" . $row['correo'] . "</td>
                    </tr>";
            }
        } else {
            // No devolver nada si no hay resultados
            echo "";
        }
        // Cerrar la conexión
        $conn->close();
    }
?>
