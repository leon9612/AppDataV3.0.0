 
 
 const Toast2 = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

$("#btn-evento").click(function (ev) {
    
    ev.preventDefault();
    document.getElementById("btn-evento").disabled = true; // Deshabilitar el botón al hacer clic
    if ($(".Vplaca").val() == null || $(".Vplaca").val() == "") {
        Toast2.fire({
            icon: "error",
            title: "Seleccione una placa",
            position: "bottom-end"
        });
        document.getElementById("btn-evento").disabled = false;
    } else {
        Toast2.fire({
            icon: "info",
            title: "Creando evento desde tarit...",
            timeout: 1000,
            position: "bottom-end"
        });
        $.ajax({
            url: 'getevento/',
            type: 'post',
            dataType: 'json',
            data: {
                placa: $(".Vplaca").val(),
                prueba: $("#prueba").val(),
                tipoprueba: $("#tipoprueba").val(),
                tipopruebaCi2: $("#tipopruebaCi2").val(),
                idmaquina: $("#selMaquina").val(),
                _token: $("input[name='_token']").val()
            },
            success: function (data, textStatus, jqXHR) {
                document.getElementById("btn-evento").disabled = false;
                document.getElementById("btn-guardar").disabled = false;
                Swal.close();
                Toast2.fire({
                    icon: "success",
                    title: "Evento creado, tenga en cuenta el tiempo de duracion de la prueba, para enviar los datos.",
                    timeout: 1000,
                    position: "bottom-end"
                });
                iniciarContadorRegresivo();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                document.getElementById("btn-evento").disabled = false;
                let errorMessage = "Error al crear el evento, intente nuevamente." + jqXHR.responseText;

                try {
                    // Parsear la respuesta JSON si existe
                    if (jqXHR.responseText) {
                        const response = JSON.parse(jqXHR.responseText);
                        if (response.message) {
                            errorMessage = response.message;
                        }
                    }
                } catch (e) {
                    // Si no es JSON válido, usar el texto plano
                    errorMessage = jqXHR.responseText || errorMessage;
                }

                Toast2.fire({
                    icon: "error",
                    title: errorMessage,
                    position: "bottom-end",
                    width: '50%',  // Ancho personalizado
                    padding: '1.5rem', // Padding interno
                    customClass: {
                        popup: 'custom-toast-width'
                    }
                });

                // console.log('error')
                // console.log(jqXHR.responseText)
                // console.log(textStatus)
                // console.log(errorThrown)
            }
        });
    }

});

// Función para guardar el tiempo según la página actual (en segundos)
function saveTiempoPrueba(val) {
    // Obtener el título de la página
    const tituloPagina = document.querySelector('.section-title h2');
    let nombreVista = '';
    
    if (tituloPagina) {
        nombreVista = tituloPagina.textContent.trim();
    } else {
        // Si no encuentra el h2, intentar por la URL
        const url = window.location.pathname;
        if (url.includes('/al')) nombreVista = 'Alineación';
        else if (url.includes('/frenos')) nombreVista = 'Frenometro Mixta';
        else if (url.includes('/suspension')) nombreVista = 'Suspension';
        else if (url.includes('/gases')) nombreVista = 'Gases Mixta';
        else if (url.includes('/luces')) nombreVista = 'Luces Mixta';
        else nombreVista = 'default';
    }
    
    // Guardar en localStorage usando el nombre de la vista como clave (en segundos)
    localStorage.setItem(`tiempo_prueba_${nombreVista}`, val);
    
    // Mostrar confirmación
    Toast.fire({
        icon: "success",
        title: `Tiempo guardado: ${val} segundos para ${nombreVista}`,
        position: "bottom-end",
        timer: 2000
    });
    
    console.log(`✅ Tiempo guardado - Vista: ${nombreVista}, Segundos: ${val}`);
}

// Función para obtener el tiempo según la página actual (en segundos)
function getTiempoPrueba() {
    // Obtener el título de la página
    const tituloPagina = document.querySelector('.section-title h2');
    let nombreVista = '';
    
    if (tituloPagina) {
        nombreVista = tituloPagina.textContent.trim();
    } else {
        // Si no encuentra el h2, intentar por la URL
        const url = window.location.pathname;
        if (url.includes('/al')) nombreVista = 'Alineación';
        else if (url.includes('/frenos')) nombreVista = 'Frenometro Mixta';
        else if (url.includes('/suspension')) nombreVista = 'Suspension';
        else if (url.includes('/gases')) nombreVista = 'Gases Mixta';
        else if (url.includes('/luces')) nombreVista = 'Luces Mixta';
        else nombreVista = 'default';
    }
    
    // Recuperar el tiempo guardado para esta vista (en segundos)
    const tiempoGuardado = localStorage.getItem(`tiempo_prueba_${nombreVista}`);
    
    if (tiempoGuardado) {
        return parseInt(tiempoGuardado);
    }
    
    // Si no hay tiempo guardado, usar valores por defecto según el tipo de prueba (en segundos)
    const tiemposDefault = {
        'Alineación': 300,      // 5 minutos
        'Frenometro Mixta': 180, // 3 minutos
        'Frenometro Motos': 120,  // 2 minutos
        'Suspension': 240,      // 4 minutos
        'Frenometro Motocarro': 120, // 2 minutos
        'Gases Mixta': 90,      // 1.5 minutos
        'Gases Motos': 90,      // 1.5 minutos
        'Opacimetro': 60,       // 1 minuto
        'Luces Mixta': 120,     // 2 minutos
        'Luces Motos': 90,      // 1.5 minutos
        'Visual': 180,          // 3 minutos
        'Sonometro': 60,        // 1 minuto
        'Taximetro': 90,        // 1.5 minutos
        'default': 300          // 5 minutos
    };
    
    return tiemposDefault[nombreVista] || tiemposDefault['default'];
}

// Modificar tu función iniciarContadorRegresivo para usar el tiempo dinámico (en segundos)
function iniciarContadorRegresivo() {
    // Obtener el tiempo configurado para esta vista (ya está en segundos)
    let tiempoRestante = getTiempoPrueba();
    
    console.log(`⏰ Iniciando contador - Vista: ${document.querySelector('.section-title h2')?.textContent}, Tiempo: ${tiempoRestante} segundos (${Math.floor(tiempoRestante / 60)} minutos ${tiempoRestante % 60} segundos)`);
    
    let intervalo;

    // Crear o actualizar el elemento del contador
    let contadorElemento = $("#contador-regresivo");
    if (contadorElemento.length === 0) {
        $("body").append(`
            <div id="contador-regresivo" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #f8f9fa;
                border: 2px solid #007bff;
                border-radius: 10px;
                padding: 15px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 1000;
                text-align: center;
                min-width: 200px;
            ">
                <h4 style="margin: 0 0 10px 0; color: #007bff;">Tiempo Restante</h4>
                <div id="tiempo-display" style="font-size: 28px; font-weight: bold; color: #28a745;">
                    ${formatearTiempo(tiempoRestante)}
                </div>
                <small style="display: block; margin-top: 8px; font-size: 11px; color: #666;">
                    ${document.querySelector('.section-title h2')?.textContent || 'Prueba'}
                </small>
            </div>
        `);
    } else {
        // Actualizar el nombre de la vista si ya existe
        contadorElemento.find('small').text(document.querySelector('.section-title h2')?.textContent || 'Prueba');
    }

    // Mostrar el contador
    $("#contador-regresivo").show();

    // Función para actualizar el contador
    function actualizarContador() {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            
            // Actualizar display
            $("#tiempo-display").text(formatearTiempo(tiempoRestante));

            // Cambiar color según el tiempo
            if (tiempoRestante <= 60) {
                $("#tiempo-display").css("color", "#dc3545"); // Rojo
                $("#tiempo-display").css("font-weight", "bold");
            } else if (tiempoRestante <= 120) {
                $("#tiempo-display").css("color", "#ffc107"); // Amarillo
            } else {
                $("#tiempo-display").css("color", "#28a745"); // Verde
            }
        }

        // Cuando el tiempo se acaba
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            $("#tiempo-display").text("00:00");
            $("#tiempo-display").css("color", "#dc3545");

            // Mostrar alerta
            Toast.fire({
                icon: "warning",
                title: "¡Tiempo agotado! Envíe la prueba ahora.",
                position: "bottom-end",
            });
        }
    }

    // Iniciar el intervalo
    intervalo = setInterval(actualizarContador, 1000);
}

// Función para formatear el tiempo (segundos a MM:SS)
function formatearTiempo(segundos) {
    if (segundos < 0) segundos = 0;
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}


// // Función para guardar el tiempo según la página actual
// function saveTiempoPrueba(val) {
//     // Obtener el título de la página
//     const tituloPagina = document.querySelector('.section-title h2');
//     let nombreVista = '';
    
//     if (tituloPagina) {
//         nombreVista = tituloPagina.textContent.trim();
//     } else {
//         // Si no encuentra el h2, intentar por la URL
//         const url = window.location.pathname;
//         if (url.includes('/al')) nombreVista = 'Alineación';
//         else if (url.includes('/frenos')) nombreVista = 'Frenometro Mixta';
//         else if (url.includes('/suspension')) nombreVista = 'Suspension';
//         else if (url.includes('/gases')) nombreVista = 'Gases Mixta';
//         else if (url.includes('/luces')) nombreVista = 'Luces Mixta';
//         else nombreVista = 'default';
//     }
    
//     // Guardar en localStorage usando el nombre de la vista como clave
//     localStorage.setItem(`tiempo_prueba_${nombreVista}`, val);
    
//     // Mostrar confirmación
//     Toast.fire({
//         icon: "success",
//         title: `Tiempo guardado: ${val} minutos para ${nombreVista}`,
//         position: "bottom-end",
//         timer: 2000
//     });
    
//     console.log(`✅ Tiempo guardado - Vista: ${nombreVista}, Minutos: ${val}`);
// }

// // Función para obtener el tiempo según la página actual
// function getTiempoPrueba() {
//     // Obtener el título de la página
//     const tituloPagina = document.querySelector('.section-title h2');
//     let nombreVista = '';
    
//     if (tituloPagina) {
//         nombreVista = tituloPagina.textContent.trim();
//     } else {
//         // Si no encuentra el h2, intentar por la URL
//         const url = window.location.pathname;
//         if (url.includes('/al')) nombreVista = 'Alineación';
//         else if (url.includes('/frenos')) nombreVista = 'Frenometro Mixta';
//         else if (url.includes('/suspension')) nombreVista = 'Suspension';
//         else if (url.includes('/gases')) nombreVista = 'Gases Mixta';
//         else if (url.includes('/luces')) nombreVista = 'Luces Mixta';
//         else nombreVista = 'default';
//     }
    
//     // Recuperar el tiempo guardado para esta vista
//     const tiempoGuardado = localStorage.getItem(`tiempo_prueba_${nombreVista}`);
    
//     if (tiempoGuardado) {
//         return parseInt(tiempoGuardado);
//     }
    
//     // Si no hay tiempo guardado, usar valores por defecto según el tipo de prueba
//     const tiemposDefault = {
//         'Alineación': 30,
//         'Frenometro Mixta': 20,
//         'Frenometro Motos': 15,
//         'Suspension': 25,
//         'Frenometro Motocarro': 15,
//         'Gases Mixta': 10,
//         'Gases Motos': 10,
//         'Opacimetro': 8,
//         'Luces Mixta': 12,
//         'Luces Motos': 10,
//         'Visual': 15,
//         'Sonometro': 8,
//         'Taximetro': 10,
//         'default': 30
//     };
    
//     return tiemposDefault[nombreVista] || tiemposDefault['default'];
// }

// // Modificar tu función iniciarContadorRegresivo para usar el tiempo dinámico
// function iniciarContadorRegresivo() {
//     // Obtener el tiempo configurado para esta vista (en minutos y convertido a segundos)
//     const minutosConfigurados = getTiempoPrueba();
//     let tiempoRestante = minutosConfigurados * 60; // Convertir a segundos
    
//     console.log(`⏰ Iniciando contador - Vista: ${document.querySelector('.section-title h2')?.textContent}, Tiempo: ${minutosConfigurados} minutos (${tiempoRestante} segundos)`);
    
//     let intervalo;

//     // Crear o actualizar el elemento del contador
//     let contadorElemento = $("#contador-regresivo");
//     if (contadorElemento.length === 0) {
//         $("body").append(`
//             <div id="contador-regresivo" style="
//                 position: fixed;
//                 top: 20px;
//                 right: 20px;
//                 background: #f8f9fa;
//                 border: 2px solid #007bff;
//                 border-radius: 10px;
//                 padding: 15px;
//                 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//                 z-index: 1000;
//                 text-align: center;
//                 min-width: 180px;
//             ">
//                 <h4 style="margin: 0 0 10px 0; color: #007bff;">Tiempo Restante</h4>
//                 <div id="tiempo-display" style="font-size: 24px; font-weight: bold; color: #28a745;">
//                     ${formatearTiempo(tiempoRestante)}
//                 </div>
//                 <small style="display: block; margin-top: 8px; font-size: 11px; color: #666;">
//                     ${document.querySelector('.section-title h2')?.textContent || 'Prueba'}
//                 </small>
//             </div>
//         `);
//     } else {
//         // Actualizar el nombre de la vista si ya existe
//         contadorElemento.find('small').text(document.querySelector('.section-title h2')?.textContent || 'Prueba');
//     }

//     // Mostrar el contador
//     $("#contador-regresivo").show();

//     // Función para actualizar el contador
//     function actualizarContador() {
//         if (tiempoRestante > 0) {
//             tiempoRestante--;
            
//             // Actualizar display
//             $("#tiempo-display").text(formatearTiempo(tiempoRestante));

//             // Cambiar color según el tiempo
//             if (tiempoRestante <= 60) {
//                 $("#tiempo-display").css("color", "#dc3545"); // Rojo
//                 $("#tiempo-display").css("font-weight", "bold");
//             } else if (tiempoRestante <= 120) {
//                 $("#tiempo-display").css("color", "#ffc107"); // Amarillo
//             } else {
//                 $("#tiempo-display").css("color", "#28a745"); // Verde
//             }
//         }

//         // Cuando el tiempo se acaba
//         if (tiempoRestante <= 0) {
//             clearInterval(intervalo);
//             $("#tiempo-display").text("00:00");
//             $("#tiempo-display").css("color", "#dc3545");

//             // Mostrar alerta
//             Toast.fire({
//                 icon: "warning",
//                 title: "¡Tiempo agotado! Envíe la prueba ahora.",
//                 position: "bottom-end",
//             });
//         }
//     }

//     // Iniciar el intervalo
//     intervalo = setInterval(actualizarContador, 1000);
// }

// // Función para formatear el tiempo (segundos a MM:SS)
// function formatearTiempo(segundos) {
//     if (segundos < 0) segundos = 0;
//     const minutos = Math.floor(segundos / 60);
//     const segundosRestantes = segundos % 60;
//     return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
// }
