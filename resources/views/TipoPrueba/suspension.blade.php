@include('layout.heder')
<main id="main">
    <section id="visor" class="contact">
        <div class="container">

            <div class="section-title">
                <h2>Suspension</h2>
            </div>

            <div class="row" data-aos="fade-in">
                <div class="col-lg-12 mt-12 mt-lg-12 d-flex align-items-stretch">
                    <form action="{{ url('/su') }}" method="POST" class="form-control">
                        @csrf
                        @if ($message = Session::get('success'))
                        <div class="alert alert-success" role="alert">
                            <h4 class="alert-heading">Exitoso</h4>
                            <p>{{ $message }}</p>
                        </div>
                        @endif
                        @if ($message = Session::get('error'))
                        <div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">Error</h4>
                            <p>{{ $message }}</p>
                        </div>
                        @endif

                        <x-vehicle-selector :placas="$placas" :usuarios="$usuarios" :maquinas="$maquinas" />
                        <div class="row">

                            <div class="col-sm-12 col-md-2 col-lg-2" style="align-content: center">
                                <div class="input-group mb-3" style="align-content: center">
                                    <div class="form-floating mb-3">
                                        <input type="number" class="form-control" step="0.01" name="eje1d" id="eje1d"
                                            placeholder="1" value="{{ old('eje1d') }}">
                                        <label for="floatingInput">Eje 1 Derecha</label>
                                        @if ($errors->has('eje1d'))
                                        <span class="error text-danger">{{ $errors->first('eje1d') }}</span>
                                        @endif
                                    </div>

                                </div>
                            </div>
                            <div class="col-sm-12 col-md-2 col-lg-2" style="align-content: center">
                                <div class="input-group mb-3" style="align-content: center">
                                    <div class="form-floating mb-3">
                                        <input type="number" step="0.01" class="form-control" placeholder="2"
                                            name="eje1i" id="eje1i" value="{{ old('eje1i') }}">
                                        <label for="floatingInput">Eje 1 Izquierda</label>
                                        @if ($errors->has('eje1i'))
                                        <span class="error text-danger">{{ $errors->first('eje1i') }}</span>
                                        @endif
                                    </div>

                                </div>
                            </div>
                            <div class="col-sm-12 col-md-2 col-lg-2" style="align-content: center">
                                <div class="input-group mb-3" style="align-content: center">
                                    <div class="form-floating mb-3">
                                        <input type="number" step="0.01" class="form-control" placeholder="3"
                                            name="eje2d" id="eje2d" value="{{ old('eje2d') }}">
                                        <label for="floatingInput">Eje 2 Derecha</label>
                                        @if ($errors->has('eje2d'))
                                        <span class="error text-danger">{{ $errors->first('eje2d') }}</span>
                                        @endif
                                    </div>

                                </div>
                            </div>
                            <div class="col-sm-12 col-md-2 col-lg-2" style="align-content: center">
                                <div class="input-group mb-3" style="align-content: center">
                                    <div class="form-floating mb-3">
                                        <input type="number" step="0.01" class="form-control" placeholder="4"
                                            name="eje2i" id="eje2i" value="{{ old('eje2i') }}">
                                        <label for="floatingInput">Eje 2 Izquierda</label>
                                        @if ($errors->has('eje2i'))
                                        <span class="error text-danger">{{ $errors->first('eje2i') }}</span>
                                        @endif
                                    </div>

                                </div>
                            </div>
                            <div class="col-sm-12 col-md-2 col-lg-2">
                                <input type="hidden" name="tipoprueba" id="tipoprueba" value="9">
                                <input type="hidden" name="tipopruebaCi2" id="tipopruebaCi2" value="6">
                                <input type="hidden" name="prueba" id="prueba" value="Suspension">
                                <button style="width: 100%; height: 55px;" id="btn-guardar"
                                    class="btn btn-outline-success" type="submit">Guardar</button>
                            </div>

                        </div>

                    </form>
                </div>

            </div>
    </section>
    <!-- ======= Contact Section ======= -->
</main>






@include('layout.footer')
<script type="text/javascript">
    const Toast = Swal.mixin({
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

    $(document).ready(function() {
        document.getElementById("btn-guardar").disabled = true; // Deshabilitar el botón al cargar la página
    });

    $(".selPlaca").change(function(e) {
        e.preventDefault();
        var placa = $('.selPlaca option:selected').attr('value');
        var placa2 = placa.split("-");
        $(".Vplaca").val(placa2[1]);
        $("#idprueba").val(placa2[0]);
        $("#placa").val(placa2[1]);
        $("#btn-buscar-placa").click();


    });
    // $("#btn-evento").click(function(ev) {
    //     ev.preventDefault();
    //     document.getElementById("btn-evento").disabled = true;
    //     if ($(".Vplaca").val() == null || $(".Vplaca").val() == "") {
    //         Toast.fire({
    //             icon: "error",
    //             title: "Seleccione una placa",
    //             position: "bottom-end"
    //         });
    //         document.getElementById("btn-evento").disabled = false;
    //     } else {
    //         Toast.fire({
    //             icon: "info",
    //             title: "Creando evento...",
    //             timeout: 1000,
    //             position: "bottom-end"
    //         });
    //         $.ajax({
    //             url: 'getevento/',
    //             type: 'post',
    //             dataType: 'json',
    //             data: {
    //                 placa: $(".Vplaca").val(),
    //                 prueba: 'Suspension',
    //                 tipoprueba: '9',
    //                 tipovehiculo: '1',
    //                 tipoevento: '1',
    //                 _token: $("input[name='_token']").val()
    //             },
    //             success: function(data, textStatus, jqXHR) {
    //                 Swal.close();
    //                 document.getElementById("btn-evento").disabled = false;
    //                 document.getElementById("btn-guardar").disabled = false;
    //                 Toast.fire({
    //                     icon: "success",
    //                     title: "Evento creado, tenga en cuenta el tiempo de duracion de la prueba, para enviar los datos.",
    //                     timeout: 1000,
    //                     position: "bottom-end"
    //                 });

    //                 // Luego mostrar el toast con un pequeño delay
    //                 iniciarContadorRegresivo();

    //             },
    //             error: function(jqXHR, textStatus, errorThrown) {
    //                 console.log('error')
    //                 console.log(jqXHR.responseText)
    //                 console.log(textStatus)
    //                 console.log(errorThrown)
    //             }
    //         });
    //     }

    // });

    // Configuración del tiempo (en segundos) - puedes modificar este valor
    const TIEMPO_PRUEBA = 60; // 5 minutos = 300 segundos

    // Función para iniciar el contador regresivo
    function iniciarContadorRegresivo() {
        let tiempoRestante = TIEMPO_PRUEBA;
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
                min-width: 150px;
            ">
                <h4 style="margin: 0 0 10px 0; color: #007bff;">Tiempo Restante</h4>
                <div id="tiempo-display" style="font-size: 24px; font-weight: bold; color: #dc3545;">
                    ${formatearTiempo(tiempoRestante)}
                </div>
                
            </div>
        `);
        }

        // Mostrar el contador
        $("#contador-regresivo").show();

        // Función para actualizar el contador
        function actualizarContador() {
            tiempoRestante--;

            // Actualizar display
            $("#tiempo-display").text(formatearTiempo(tiempoRestante));

            // Cambiar color según el tiempo
            if (tiempoRestante <= 60) {
                $("#tiempo-display").css("color", "#dc3545"); // Rojo
            } else if (tiempoRestante <= 120) {
                $("#tiempo-display").css("color", "#ffc107"); // Amarillo
            }

            // Cuando el tiempo se acaba
            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                $("#tiempo-display").text("00:00");

                // Mostrar alerta
                Toast.fire({
                    icon: "warning",
                    title: "¡Tiempo agotado! Envíe la prueba ahora.",
                    position: "bottom-end"
                });
            }
        }

        // Iniciar el intervalo
        intervalo = setInterval(actualizarContador, 1000);


    }

    // Función para formatear el tiempo (segundos a MM:SS)
    function formatearTiempo(segundos) {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
    }

    $("#btn-buscar-placa").click(function(e) {
        e.preventDefault();

        if ($(".Vplaca").val() == "" || $(".Vplaca").val() == null) {
            Swal.fire({
                icon: "info",
                title: 'Buscar placa',
                allowOutsideClick: false,
                html: '<div style= "font-size: 18px">Seleccione una placa primero<div>',
                showConfirmButton: true,
            });
        } else {
            $.ajax({
                url: 'buscarvehiculo/',
                type: 'post',
                dataType: 'json',
                data: {
                    placa: $(".Vplaca").val(),
                    idtipo_prueba: 9,
                    _token: $("input[name='_token']").val()
                },
                success: function(data, textStatus, jqXHR) {

                    if (data.length > 0) {
                        $.each(data, function(i, res) {
                            if (res.estado == 1) {
                                Toast.fire({
                                    icon: "info",
                                    title: "La prueba que se trajo esta en estado <span style='color: #dc3545; font-weight: bold;'>RECHAZADA</span>, por favor verifique bien los datos antes de enviarla nuevamente.",
                                    timeout: 100000
                                });
                            }
                            if (res.estado == 9) {
                                Toast.fire({
                                    icon: "info",
                                    title: "La prueba que se trajo esta en estado <span style='color: #dc3545; font-weight: bold;'>REASIGNADA</span>, por favor verifique bien los datos antes de enviarla nuevamente.",
                                    timeout: 100000
                                });
                            }
                            if (res.observacion == 'Suspensión delantera derecha' || res
                                .observacion == 'Suspension delantera derecha')
                                $("#eje1d").val(res.valor);
                            if (res.observacion == 'Suspensión delantera izquierda' || res
                                .observacion == 'Suspension delantera izquierda')
                                $("#eje1i").val(res.valor);
                            if (res.observacion == 'Suspension trasera derecha' || res
                                .observacion == 'Suspension trasera derecha')
                                $("#eje2d").val(res.valor);
                            if (res.observacion == 'Suspensión trasera izquierda' || res
                                .observacion == 'Suspension trasera izquierda')
                                $("#eje2i").val(res.valor);

                        });
                    } else {
                        Toast.fire({
                            icon: "error",
                            title: "No se encontraron registros."
                        });
                    }



                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error')
                    console.log(jqXHR.responseText)
                    console.log(textStatus)
                    console.log(errorThrown)
                }
            });
        }
    })
</script>