# 00007324_practica8_seccion2

¿Cuál es la diferencia entre autenticación y autorizacion? 
La autenticación consiste en verificar la identidad del usuario cuando inicia sesión con su correo 
y contraseña. La autorización, en cambio, ocurre cuando el usuario intenta acceder a rutas protegidas; 
el servidor valida un token y, si es válido, le permite el acceso a los recursos.

¿Cuál es la función del token JWT en la guía? 
El JWT sirve para mantener la sesión activa y demostrar que el usuario fue autenticado. Se guarda en el
localStorage del frontend y se envía en cada petición al backend. El middleware verifyToken verifica su 
validez antes de permitir el acceso a recursos protegidos, garantizando así la autenticación y autorización seguras.
