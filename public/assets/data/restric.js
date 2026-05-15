

var fecha;
var dominio = "";
const SECRET_KEY = 'AppDataSecret2026';


$(document).ready(function () {
  fecha = new Date().toLocaleDateString("en-CA");
  if (localStorage.getItem("dominio") !== null && localStorage.getItem("dominio") !== undefined) {
    dominio = localStorage.getItem("dominio");
    getMac();
    desactivarComponentes();
  } else {
    Swal.fire({
      title: 'Ingrese el dominio',
      input: 'text',
      inputLabel: 'Dominio',
      inputPlaceholder: 'Ingrese su dominio',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
      confirmButtonText: 'Guardar',
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Debe ingresar un dominio');
        }
        return value;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        dominio = result.value;
        localStorage.setItem("dominio", dominio);

        getMac();
      } else {
        desactivarComponentes();
      }
    });
  }


});


function getMac() {
  $.ajax({
    url: 'index.php/getmac/',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function (data, textStatus, jqXHR) {
      sendMacAndDomain(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      getMac2();
    }
  });
}

function getMac2() {
  $.ajax({
    url: 'getmac/',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function (data, textStatus, jqXHR) {
      sendMacAndDomain(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('error')
      //console.log(jqXHR.responseText)
    }
  });
}

function sendMacAndDomain(mac) {
  $.ajax({
    url: 'https://appdataingeniersoftware.com/appdatacontrol/index.php/Cdispositivo',
    type: 'post',
    dataType: 'json',
    data: {
      mac: mac,
      dominio: dominio,
    },
    success: function (response) {
      //console.log('Response:', response);
      evalFun(response.estado);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('Error:', textStatus, errorThrown);
    }
  });
}


var evalFun = function (estado) {
  //console.log(estado);
  if (estado == 0 || estado == "0") {
    //console.log("Dispositivo inactivo");
    Swal.fire({
      'icon': 'error',
      'title': "Error",
      'allowOutsideClick': false,
      'allowEscapeKey': false,
      'showConfirmButton': false,
      'text': "Dispositivo inactivo, por favor comunicarse con el administrador del sistema.",
    });
    desactivarComponentes();
  } else {
    // console.log("entre");
    getLicencia();
  }
  // var licencia = localStorage.getItem("licencia");
  // if (licencia == null || licencia == undefined) {
  //   Swal.fire({
  //     'icon': "error",
  //     'title': "Error",
  //     'text': "Dispositivo inactivo"
  //   });
  // }
  // try {
  //   if (atob(localStorage.getItem("licencia")) !== "cdaappdatasoftwareenginer") {
  //     desactivarComponentes();
  //     Swal.fire({
  //       'icon': 'error',
  //       'title': 'Error',
  //       'text': "La licencia no es valida"
  //     });
  //   } else {
  //     getLicencia();
  //   }
  // } catch (_0xb55a64) {
  //   Swal.fire({
  //     'icon': 'error',
  //     'title': "Error",
  //     'text': "Dispositivo inactivo"
  //   });
  //   desactivarComponentes();
  // }
};

if (localStorage.getItem("juez") == 1) {
  $("#ali").css("cursor", "not-allowed");
  $('#ali').css('pointer-events', "none");
  $("#fre").css("cursor", "not-allowed");
  $("#fre").css("pointer-events", "none");
  $("#frem").css("cursor", "not-allowed");
  $('#frem').css("pointer-events", 'none');
  $("#fremc").css("cursor", "not-allowed");
  $('#fremc').css("pointer-events", 'none');
  $("#sus").css("cursor", "not-allowed");
  $("#sus").css("pointer-events", "none");
  $('#opac').css("cursor", "not-allowed");
  $("#opac").css('pointer-events', 'none');
  $("#gase").css("cursor", "not-allowed");
  $("#gase").css('pointer-events', 'none');
  $("#gasem").css("cursor", 'not-allowed');
  $("#gasem").css('pointer-events', "none");
  $("#lux").css("cursor", "not-allowed");
  $("#lux").css('pointer-events', "none");
  $("#luxm").css("cursor", "not-allowed");
  $("#luxm").css("pointer-events", 'none');
  $('#son').css('cursor', "not-allowed");
  $('#son').css("pointer-events", "none");
}

// function getLicencia() {
//   fetch("https://appdataingeniersoftware.com/appdatacontrol/index.php/Cappdata?dominio=" + dominio, {
//     'method': "GET",
//     'headers': {
//       'Autorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA",
//       'Content-Type': 'application/json'
//     }
//   }, 0x7d0).then(_0x224f34 => _0x224f34.json()).then(res => {
//     console.log(res);
//     localStorage.setItem("juez", res[0].valor);
//     localStorage.setItem("date", res[0].fechavigencia);
//     if (fecha > res[0].fechavigencia) {
//       Swal.fire({
//         'icon': "error",
//         'title': "Licencia",
//         'allowOutsideClick': false,
//         'allowEscapeKey': false,
//         'text': "Lo sentimos su licencia esta vencida",
//         'showConfirmButton': false
//       });
//       desactivarComponentes();
//     } else {
//       if (res[0].valor == 1) {
//         Swal.fire({
//           'icon': "error",
//           'title': "Licencia",
//           'allowOutsideClick': false,
//           'allowEscapeKey': false,
//           'text': "Lo sentimos su licencia esta vencida",
//           'showConfirmButton': false
//         });
//         desactivarComponentes();
//       }
//       if (res[0].valor == 2) {
//         Swal.fire({
//           'icon': "error",
//           'title': "Error de encriptacion",
//           'allowOutsideClick': false,
//           'allowEscapeKey': false,
//           'text': "Se detectó un cambio en el sistema, por su seguridad se ha bloqueado. Comuníquese con el administrador del sistema.",
//           'showConfirmButton': false
//         });
//         desactivarComponentes();
//       }
//       activarComponentes();
//     }
//   }, 0x7d0)["catch"](_0x19fb8e => {
//     activarComponentes();
//     if (fecha > localStorage.getItem("date")) {
//       Swal.fire({
//         'icon': 'error',
//         'title': "Licencia",
//         'allowOutsideClick': false,
//         'allowEscapeKey': false,
//         'text': "Lo sentimos su licencia esta vencida",
//         'showConfirmButton': false
//       });
//       desactivarComponentes();
//     }
//   });
// }

const EXPIRY_CONFIG = {
  daysBeforeWarning: 7,  // Días antes para empezar a advertir
  storageKey: 'lastExpiringAlertDate'
};

// FUNCIÓN CORREGIDA para calcular días (evita problemas de zona horaria)
function getDaysUntilExpiry(fechaVencimiento) {
  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = fechaVencimiento.split('-').map(Number);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const expiryDate = new Date(year, month - 1, day);
  expiryDate.setHours(0, 0, 0, 0);
  
  const timeDiff = expiryDate - today;
  const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  return daysUntilExpiry;
}

// Función para mostrar toast con SweetAlert
function showExpiringToast(daysUntilExpiry) {
  let message = '';
  let gradient = '';
  let iconColor = '';
  let borderLeft = '';

  if (daysUntilExpiry === 1) {
    message = `⚠️ ¡ATENCIÓN! Su licencia expira MAÑANA`;
    gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    iconColor = '#fff';
    borderLeft = '4px solid #f093fb';
  } else if (daysUntilExpiry <= 3) {
    message = `⚠️ Su licencia expirará en ${daysUntilExpiry} días`;
    gradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    iconColor = '#fff';
    borderLeft = '4px solid #fa709a';
  } else {
    message = `ℹ️ Su licencia expirará en ${daysUntilExpiry} días`;
    gradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    iconColor = '#fff';
    borderLeft = '4px solid #43e97b';
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      popup: 'custom-toast'
    },
    didOpen: (toast) => {
      toast.style.background = gradient;
      toast.style.borderLeft = borderLeft;
      toast.style.borderRadius = '12px';
      toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      toast.style.fontWeight = '500';
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: daysUntilExpiry === 1 ? 'error' : 'warning',
    title: message,
    color: iconColor
  });
}

// FUNCIÓN CORREGIDA para verificar y mostrar toast de expiración
function checkAndShowExpiringToast(fechaVencimiento) {
  // Usar la función corregida para calcular días
  const daysUntilExpiry = getDaysUntilExpiry(fechaVencimiento);
  
  // console.log(`Fecha actual: ${new Date().toISOString().split('T')[0]}`);
  // console.log(`Fecha vencimiento: ${fechaVencimiento}`);
  // console.log(`Días hasta expirar: ${daysUntilExpiry}`);
  
  // Verificar si está en el rango de advertencia
  const isInWarningPeriod = daysUntilExpiry <= EXPIRY_CONFIG.daysBeforeWarning && daysUntilExpiry > 0;

   if (isInWarningPeriod) {
    const lastAlertDate = localStorage.getItem(EXPIRY_CONFIG.storageKey);
    const todayString = new Date().toDateString();
    // console.log(`Última fecha de alerta: ${lastAlertDate}`);
    // console.log(`Fecha de hoy: ${todayString}`);


    // Mostrar solo si no se ha mostrado hoy
     if (lastAlertDate !== todayString) {
      showExpiringToast(daysUntilExpiry);
      localStorage.setItem(EXPIRY_CONFIG.storageKey, todayString);
     }
   }
}

// También debes CORREGIR la validación de fecha vencida en tu getLicencia
// Cambia esta línea:
// if (fecha > res[0].fechavigencia) {
// Por esto:
// if (getDaysUntilExpiry(res[0].fechavigencia) <= 0) {



function getLicencia() {
  fetch("https://appdataingeniersoftware.com/appdatacontrol/index.php/Cappdata?dominio=" + dominio, {
    'method': "GET",
    'headers': {
      'Autorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA",
      'Content-Type': 'application/json'
    }
  }, 0x7d0).then(_0x224f34 => _0x224f34.json()).then(res => {
    // console.log(res);
    localStorage.setItem("juez", res[0].valor);
    localStorage.setItem("date", res[0].fechavigencia);
    const currentUrl = window.location.href;
    const targetUrl = window.location.origin + '/AppData/public/index.php';
    
    if (fecha >= res[0].fechavigencia) {
    
      Swal.fire({
        'icon': "error",
        'title': "Licencia Vencida",
        'allowOutsideClick': false,
        'allowEscapeKey': false,
        'showConfirmButton': false,
        'html': `
    <div style="text-align: left;">
      <p style="margin-bottom: 10px;"><strong>⚠️ Su licencia ha expirado</strong></p>
      <p style="margin-bottom: 8px; color: #666;">Fecha de vencimiento: <strong>${res[0].fechavigencia}</strong></p>
      <p style="color: #666;">Por favor, comuníquese con el administrador para renovar su licencia.</p>
    </div>
  `,
        // 'showConfirmButton': true,
        // 'confirmButtonText': 'Entendido',
        // 'confirmButtonColor': '#d33',
        // 'showCancelButton': false,

        // 'timer': 5000,
        //'timerProgressBar': true
      });
      setTimeout(() => {
        // Solo redireccionar si no estamos ya en la URL destino
        if (currentUrl !== targetUrl) {
          window.location.href = '/AppData/public/index.php';
        }
      }, 3000);
      desactivarComponentes();
    } else {
 
      checkAndShowExpiringToast(res[0].fechavigencia);
      if (res[0].valor == 1) {
        Swal.fire({
          'icon': "error",
          'title': "Licencia",
          'allowOutsideClick': false,
          'allowEscapeKey': false,
          'text': "Lo sentimos su licencia esta vencida.",
          'showConfirmButton': false
        });

        desactivarComponentes();
        setTimeout(() => {


          // Solo redireccionar si no estamos ya en la URL destino
          if (currentUrl !== targetUrl) {
            window.location.href = '/AppData/public/index.php';
          }
        }, 3000);
      }
      if (res[0].valor == 2) {
        Swal.fire({
          'icon': "error",
          'title': "Error de encriptacion",
          'allowOutsideClick': false,
          'allowEscapeKey': false,
          'text': "Se detectó un cambio en el sistema, por su seguridad se ha bloqueado. Comuníquese con el administrador del sistema.",
          'showConfirmButton': false
        });
        desactivarComponentes();
        setTimeout(() => {


          // Solo redireccionar si no estamos ya en la URL destino
          if (currentUrl !== targetUrl) {
            window.location.href = '/AppData/public/index.php';
          }
        }, 3000);
      }

      if (res[0].valor == 3) {
        Swal.fire({
          'icon': "error",
          'title': "SISTEMA BLOQUEADO",
          'allowOutsideClick': false,
          'allowEscapeKey': false,
          'text': "Por favor, póngase en contacto con el administrador del sistema para verificar el estado del software y conocer los motivos de este bloqueo",
          'showConfirmButton': false
        });
        desactivarComponentes();
        setTimeout(() => {


          // Solo redireccionar si no estamos ya en la URL destino
          if (currentUrl !== targetUrl) {
            window.location.href = '/AppData/public/index.php';
          }
        }, 3000);
      }

      // if (res[0].valor == 50716) {
      //   Swal.fire({
      //     'icon': "error",
      //     'title': "Aplicación Deshabilitada",
      //     'allowOutsideClick': false,
      //     'allowEscapeKey': false,
      //     'text': "Esta aplicación ha sido deshabilitada permanentemente por violación de términos.",
      //     'showConfirmButton': false
      //   });

      //   desactivarComponentes();

      //   // Llamar a función para DESTRUIR la aplicación
      //  // destruirAplicacionCompletamente();
      // }



      // Controlar visibilidad del menú basado en la respuesta
      controlarVisibilidadMenu(res[0]);

      activarComponentes();
    }
  }, 0x7d0)["catch"](_0x19fb8e => {
    activarComponentes();
    if (fecha > localStorage.getItem("date")) {
      Swal.fire({
        'icon': 'error',
        'title': "Licencia",
        'allowOutsideClick': false,
        'allowEscapeKey': false,
        'text': "Lo sentimos su licencia esta vencida",
        'showConfirmButton': false
      });
      desactivarComponentes();
    }
  });
}

function controlarVisibilidadMenu(licenciaData) {
  const propiedadesMenu = [
    'ali', 'fre', 'frem', 'fremc', 'gase', 'gasem',
    'lux', 'luxm', 'opac', 'son', 'sus', 'tax',
    'visual', 'actu', 'cal', 'fot'
  ];

  propiedadesMenu.forEach(propiedad => {
    const menuElement = document.getElementById(propiedad);
    if (menuElement) {
      if (licenciaData[propiedad] === "1") {
        menuElement.classList.remove('hidden-menu-item');
      } else {
        menuElement.classList.add('hidden-menu-item');
      }
    }
  });

  // Encriptar datos
  const menuConfig = {};
  propiedadesMenu.forEach(propiedad => {
    menuConfig[propiedad] = licenciaData[propiedad];
  });

  const encryptedConfig = encryptData(menuConfig);
  localStorage.setItem('menuConfig', encryptedConfig);
}

function aplicarConfiguracionMenu() {
  const encryptedConfig = localStorage.getItem('menuConfig');
  if (encryptedConfig) {
    const config = decryptData(encryptedConfig);
    if (config) {
      Object.keys(config).forEach(menuId => {
        const menuElement = document.getElementById(menuId);
        if (menuElement) {
          if (config[menuId] === "1") {
            menuElement.classList.remove('hidden-menu-item');
          } else {
            menuElement.classList.add('hidden-menu-item');
          }
        }
      });
    }
  }
}

// function controlarVisibilidadMenu(licenciaData) {
//   // Lista de todas las propiedades que controlan el menú
//   const propiedadesMenu = [
//     'ali', 'fre', 'frem', 'fremc', 'gase', 'gasem',
//     'lux', 'luxm', 'opac', 'son', 'sus', 'tax',
//     'visual', 'actu', 'cal', 'fot'
//   ];

//   // Controlar visibilidad de cada item del menú
//   propiedadesMenu.forEach(propiedad => {
//     const menuElement = document.getElementById(propiedad);
//     if (menuElement) {
//       if (licenciaData[propiedad] === "1") {
//         menuElement.classList.remove('hidden-menu-item');
//       } else {
//         menuElement.classList.add('hidden-menu-item');
//       }
//     }
//   });

//   // Guardar el estado en localStorage para usarlo después
//   const menuConfig = {};
//   propiedadesMenu.forEach(propiedad => {
//     menuConfig[propiedad] = licenciaData[propiedad];
//   });
//   localStorage.setItem('menuConfig', JSON.stringify(menuConfig));
// }

// // Función para aplicar la configuración del menú al cargar la página
// function aplicarConfiguracionMenu() {
//   const menuConfig = localStorage.getItem('menuConfig');
//   if (menuConfig) {
//     const config = JSON.parse(menuConfig);
//     Object.keys(config).forEach(menuId => {
//       const menuElement = document.getElementById(menuId);
//       if (menuElement) {
//         if (config[menuId] === "1") {
//           menuElement.classList.remove('hidden-menu-item');
//         } else {
//           menuElement.classList.add('hidden-menu-item');
//         }
//       }
//     });
//   }
// }


//eliminar aplicacion

// function destruirAplicacionCompletamente() {
//   fetch('/destruir-aplicacion', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//       'X-Destroy-Token': 'licencia_revocada_100' // Token adicional de seguridad
//     },
//     body: JSON.stringify({
//       motivo: 'licencia_revocada',
//       codigo: 50716
//     })
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Aplicación destruida completamente');

//       Swal.fire({
//         'icon': "info",
//         'title': "Sistema Eliminado",
//         'text': "La aplicación ha sido deshabilitada permanentemente.",
//         'showConfirmButton': false,
//         'timer': 5000
//       });

//       // Redireccionar a página de bloqueo permanente
//       setTimeout(() => {
//         window.location.href = '/sistema-bloqueado';
//       }, 5000);
//     })
//     .catch(error => {
//       console.error('Error al destruir aplicación:', error);
//       // Forzar redirección incluso si falla
//       setTimeout(() => {
//         window.location.href = '/AppData/public/index.php';
//       }, 3000);
//     });
// }

// Llamar esta función cuando se cargue la página
document.addEventListener('DOMContentLoaded', function () {
  aplicarConfiguracionMenu();

  // Si no hay configuración guardada, obtener la licencia
  if (!localStorage.getItem('menuConfig')) {
    getLicencia();
  }
});

function encryptData(data) {
  // Convertir a string y luego a base64 con una clave simple
  const stringData = JSON.stringify(data);
  // Aplicar una transformación simple
  let encrypted = '';
  for (let i = 0; i < stringData.length; i++) {
    const charCode = stringData.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
    encrypted += String.fromCharCode(charCode);
  }
  // Codificar a base64 para almacenamiento seguro
  return btoa(encrypted);
}

function decryptData(encryptedData) {
  try {
    // Decodificar base64
    const decoded = atob(encryptedData);
    // Revertir la transformación XOR
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      decrypted += String.fromCharCode(charCode);
    }
    return JSON.parse(decrypted);
  } catch (e) {
    console.error('Error al desencriptar datos');
    return null;
  }
}



function activarComponentes() {
  if (document.getElementById("btn-login") !== undefined && document.getElementById("btn-login") !== null) {
    document.getElementById('btn-login').disabled = false;
  }
  if (document.getElementById('typeEmailX') !== undefined && document.getElementById("typeEmailX") !== null) {
    document.getElementById('typeEmailX').disabled = false;
  }
  if (document.getElementById("typePasswordX") !== undefined && document.getElementById("typePasswordX") !== null) {
    document.getElementById("typePasswordX").disabled = false;
  }
  $("#ali").css("cursor", '');
  $("#ali").css("pointer-events", '');
  $("#fre").css("cursor", '');
  $("#fre").css("pointer-events", '');
  $("#frem").css("cursor", '');
  $("#frem").css('pointer-events', '');
  $("#fremc").css("cursor", '');
  $("#fremc").css('pointer-events', '');
  $("#sus").css('cursor', '');
  $("#sus").css("pointer-events", '');
  $("#opac").css("cursor", '');
  $("#opac").css("pointer-events", '');
  $("#gase").css("cursor", '');
  $('#gase').css("pointer-events", '');
  $("#gasem").css("cursor", '');
  $("#gasem").css("pointer-events", '');
  $('#lux').css("cursor", '');
  $('#lux').css("pointer-events", '');
  $("#luxm").css("cursor", '');
  $("#luxm").css("pointer-events", '');
  $('#son').css('cursor', '');
  $("#son").css("pointer-events", '');
}
function desactivarComponentes() {
  if (document.getElementById("btn-login") !== undefined && document.getElementById("btn-login") !== null) {
    document.getElementById("btn-login").disabled = true;
  }
  if (document.getElementById("typeEmailX") !== undefined && document.getElementById("typeEmailX") !== null) {
    document.getElementById('typeEmailX').disabled = true;
  }
  if (document.getElementById("typePasswordX") !== undefined && document.getElementById("typePasswordX") !== null) {
    document.getElementById("typePasswordX").disabled = true;
  }
  $("#ali").css("cursor", "not-allowed");
  $('#ali').css("pointer-events", "none");
  $("#fre").css('cursor', 'not-allowed');
  $("#fre").css("pointer-events", 'none');
  $("#frem").css("cursor", "not-allowed");
  $("#frem").css("pointer-events", "none");
  $("#fremc").css("cursor", "not-allowed");
  $("#fremc").css("pointer-events", "none");
  $("#sus").css("cursor", 'not-allowed');
  $("#sus").css('pointer-events', "none");
  $('#opac').css("cursor", "not-allowed");
  $("#opac").css('pointer-events', "none");
  $("#gase").css('cursor', "not-allowed");
  $("#gase").css("pointer-events", 'none');
  $('#gasem').css("cursor", 'not-allowed');
  $('#gasem').css("pointer-events", "none");
  $("#lux").css('cursor', "not-allowed");
  $("#lux").css("pointer-events", "none");
  $("#luxm").css('cursor', 'not-allowed');
  $("#luxm").css('pointer-events', "none");
  $("#son").css("cursor", "not-allowed");
  $('#son').css("pointer-events", "none");
}

$("#formLogin").on("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  var formData = $(this).serializeArray(); // Serialize form data into an array
  var dataObject = {};

  // Convert the serialized array into an object
  formData.forEach(function (item) {
    dataObject[item.name] = item.value;
  });
  dataObject["dominio"] = dominio;

  $.ajax({
    url: 'https://appdataingeniersoftware.com/appdatacontrol/index.php/Cdispositivo/getLogin',
    type: 'post',
    dataType: 'json',
    data: {
      datos: dataObject,
    },
    success: function (response) {
      //console.log('Response:', response);
      if (response == 1) {
        getLogin();
      } else {
        Swal.fire({
          'icon': 'error',
          'title': "Error",
          'allowOutsideClick': false,
          'allowEscapeKey': false,
          'showConfirmButton': true,
          'text': "Usuario o contraseña incorrectos.",
        });
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('Error:', textStatus, errorThrown);
    }
  });

  // console.log("Captured Form Data:", dataObject);

  // You can now use `dataObject` for further processing
});

var getLogin = function () {
  $.ajax({
    url: 'index.php/getSession/',
    type: 'get',
    dataType: 'json',
    data: {
      _token: $("input[name='_token']").val()
    },
    success: function (data, textStatus, jqXHR) {
      // console.log('Response:', data);
      // window.location.href = "cpr";
      window.location.href = "index.php/cpr";

    },

  });
}