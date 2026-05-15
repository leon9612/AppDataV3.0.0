@include('layout.heder')

<main id="main">
    <section id="visor" class="contact">
        <div class="container">

            <div class="section-title">
                <h2>Taximetro</h2>
            </div>

            <div class="row" data-aos="fade-in">
                <div class="col-lg-12 mt-12 mt-lg-12 d-flex align-items-stretch">
                    <form action="{{ url('/tax') }}" method="POST" class="form-control">
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
                        <div style="margin-top: 15px">
                            <x-vehicle-selector
                                :placas="$placas"
                                :usuarios="$usuarios"
                                :maquinas="$maquinas" />
                            <div class="row">
                                <div class="col-sm-12 col-md-2 col-lg-2" style="align-content: center">
                                    <div class="input-group mb-3" style="align-content: center">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" name="ref_llanta"
                                                id="ref_llanta" placeholder="1" value="{{ old('ref_llanta') }}">
                                            <label for="floatingInput">Referencia llanta</label>
                                            @if ($errors->has('ref_llanta'))
                                            <span
                                                class="error text-danger">{{ $errors->first('ref_llanta') }}</span>
                                            @endif
                                        </div>

                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-2 col-lg-2" style="align-content: center">
                                    <div class="input-group mb-3" style="align-content: center">
                                        <div class="form-floating mb-3">
                                            <input type="number" class="form-control" step="0.01"
                                                name="err_tiempo" id="err_tiempo" placeholder="1"
                                                value="{{ old('err_tiempo') }}">
                                            <label for="floatingInput">Error tiempo</label>
                                            @if ($errors->has('err_tiempo'))
                                            <span
                                                class="error text-danger">{{ $errors->first('err_tiempo') }}</span>
                                            @endif
                                        </div>

                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-2 col-lg-2" style="align-content: center">
                                    <div class="input-group mb-3" style="align-content: center">
                                        <div class="form-floating mb-3">
                                            <input type="number" class="form-control" step="0.01"
                                                name="err_distancia" id="err_distancia" placeholder="1"
                                                value="{{ old('err_distancia') }}">
                                            <label for="floatingInput">Error distancia</label>
                                            @if ($errors->has('err_distancia'))
                                            <span
                                                class="error text-danger">{{ $errors->first('err_distancia') }}</span>
                                            @endif
                                        </div>

                                    </div>
                                </div>


                                <div class="col-sm-12 col-md-2 col-lg-2">
                                    <input type="hidden" name="tipoprueba" id="tipoprueba" value="6">
                                <input type="hidden" name="tipopruebaCi2" id="tipopruebaCi2" value="16">
                                <input type="hidden" name="prueba" id="prueba" value="Taximetro">
                                    <button style="width: 100%; height: 55px;" id="btn-guardar" class="btn btn-outline-success"
                                        type="submit">Guardar</button>
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
    })

    $(".selPlaca").change(function(e) {
        e.preventDefault();
        var placa = $('.selPlaca option:selected').attr('value');
        var placa2 = placa.split("-");
        $(".Vplaca").val(placa2[1]);
        $("#idprueba").val(placa2[0]);
        $("#placa").val(placa2[1]);
        $("#btn-buscar-placa").click();

    });

    

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
                    idtipo_prueba: 6,
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
                            if (res.observacion == 'Rllanta' || res.tiporesultado == "Rllanta")
                                $("#ref_llanta").val(res.valor);
                            if (res.observacion == 'error_tiempo_nuevo' || res.tiporesultado == "error_tiempo_nuevo")
                                $("#err_tiempo").val(res.valor);
                            if (res.observacion == 'error_distancia_nuevo' || res.tiporesultado == "error_distancia_nuevo")
                                $("#err_distancia").val(res.valor);


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