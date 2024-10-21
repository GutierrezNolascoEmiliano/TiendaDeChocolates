<?php
// Simular una respuesta de datos de usuario
$usuario = [
    'nombre' => 'Juan Pérez',
    'direccion' => 'Calle Falsa 123, Ciudad',
    'correo' => 'juan.perez@email.com'
];

// Enviar los datos como respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($usuario);
?>
