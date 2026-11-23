/*
  JNX Tech - DATOS DEL CATÁLOGO
  Este es el único archivo que tenés que editar para cambiar productos, precios y tu número.

  Cómo escribir el número de WhatsApp (sin +, sin espacios, sin guiones):
  54 (Argentina) + 9 + código de área sin 0 + número sin 15
  Ejemplo: 11 2345-6789  ->  "5491123456789"
*/
window.JNX = {
  whatsapp: "5491100000000", // <-- CAMBIÁ ESTE NÚMERO POR EL TUYO
  negocio: "JNX Tech",

  // Mensaje que se arma al tocar los botones generales
  mensajeGeneral: "Hola JNX Tech, quiero pedir un presupuesto.",

  // Cada clave es el nombre que va en data-categoria del HTML.
  // Campos: nombre, descripcion, detalle (material, plazo, etc.), precio, imagen
  // Si no ponés imagen, se muestra un recuadro gris. Si el precio es "Consultar", se muestra tal cual.
  catalogo: {
    "impresion-3d": [
      {
        nombre: "EJEMPLO - Soporte de auriculares",
        descripcion: "Soporte para escritorio, estable y liviano.",
        detalle: "Material: PLA · Entrega en 3 a 5 días",
        precio: "$8.000",
        imagen: "img/producto-soporte.jpg"
      },
      {
        nombre: "EJEMPLO - Pieza a medida",
        descripcion: "Mandame tu archivo STL o una foto de la pieza y la cotizo.",
        detalle: "Material a elegir: PLA, PETG",
        precio: "Consultar",
        imagen: "img/producto-medida.jpg"
      }
    ],

    computadoras: [
      {
        nombre: "EJEMPLO - Limpieza y mantenimiento de PC",
        descripcion: "Limpieza interna, cambio de pasta térmica y revisión general.",
        detalle: "Plazo: 24 a 48 hs",
        precio: "Desde $20.000",
        imagen: "img/servicio-pc.jpg"
      }
    ],

    consolas: [
      {
        nombre: "EJEMPLO - Mantenimiento de consola",
        descripcion: "Limpieza completa, cambio de pasta térmica y prueba final.",
        detalle: "Plazo: 24 a 72 hs",
        precio: "Desde $25.000",
        imagen: "img/servicio-consola.jpg"
      }
    ]
  }
};
