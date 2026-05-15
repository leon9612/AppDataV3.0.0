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

})
