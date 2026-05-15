@include('layout.heder')

<main id="main">
    <section id="visor" class="contact">
        <div class="container">
            <div class="section-title">
                <h2>Alineación</h2>
            </div>

            <div class="row" data-aos="fade-in">
                <div class="col-lg-12 mt-12 mt-lg-12 d-flex align-items-stretch">
                    <form action="{{ url('/al') }}" method="POST" id="form-datos"
                        class="form-control p-4 rounded shadow-sm">
                        @csrf

                        <!-- Alertas mejoradas -->
                        @if ($message = Session::get('success'))
                        <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
                            <h5 class="alert-heading mb-2"><i class="bi bi-check-circle-fill me-2"></i>Exitoso</h5>
                            <p class="mb-0">{{ $message }}</p>
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                        @endif
                        @if ($message = Session::get('error'))
                        <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                            <h5 class="alert-heading mb-2"><i class="bi bi-exclamation-triangle-fill me-2"></i>Error
                            </h5>
                            <p class="mb-0">{{ $message }}</p>
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                        @endif

                        <!-- Componente reutilizable -->
                        <x-vehicle-selector :placas="$placas" :usuarios="$usuarios" :maquinas="$maquinas" />

                        <!-- Sección de mediciones de ejes mejorada -->
                        <div class="row mt-4">
                            <div class="col-12 mb-3">
                                <h5 class="border-bottom pb-2 text-dark">
                                    <i class="bi bi-speedometer2 me-2"></i>
                                    Mediciones de Ejes
                                </h5>
                            </div>

                            <div class="col-sm-12 col-md-2 col-lg-2 mb-3">
                                <div class="form-floating">
                                    <input type="number" class="form-control" step="0.01" name="eje1" id="eje1"
                                        placeholder="1" value="{{ old('eje1') }}">
                                    <label for="eje1">Eje 1</label>
                                    @if ($errors->has('eje1'))
                                    <span
                                        class="error text-danger small mt-1 d-block">{{ $errors->first('eje1') }}</span>
                                    @endif
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2 col-lg-2 mb-3">
                                <div class="form-floating">
                                    <input type="number" step="0.01" class="form-control" placeholder="2" name="eje2"
                                        id="eje2" value="{{ old('eje2') }}">
                                    <label for="eje2">Eje 2</label>
                                    @if ($errors->has('eje2'))
                                    <span
                                        class="error text-danger small mt-1 d-block">{{ $errors->first('eje2') }}</span>
                                    @endif
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2 col-lg-2 mb-3">
                                <div class="form-floating">
                                    <input type="number" step="0.01" class="form-control" placeholder="3" name="eje3"
                                        id="eje3" value="{{ old('eje3') }}">
                                    <label for="eje3">Eje 3</label>
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2 col-lg-2 mb-3">
                                <div class="form-floating">
                                    <input type="number" step="0.01" class="form-control" placeholder="4" name="eje4"
                                        id="eje4" value="{{ old('eje4') }}">
                                    <label for="eje4">Eje 4</label>
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2 col-lg-2 mb-3">
                                <div class="form-floating">
                                    <input type="number" step="0.01" class="form-control" placeholder="5" name="eje5"
                                        id="eje5" value="{{ old('eje5') }}">
                                    <label for="eje5">Eje 5</label>
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2 col-lg-2 mb-3 d-flex align-items-end">
                                <input type="hidden" name="tipoprueba" id="tipoprueba" value="10">
                                <input type="hidden" name="tipopruebaCi2" id="tipopruebaCi2" value="8">
                                <input type="hidden" name="prueba" id="prueba" value="Alineacion">
                               
                                <button id="btn-guardar" class="btn btn-success w-100 py-3" type="submit">
                                    <i class="bi bi-check-lg me-2"></i>Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
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
        // document.getElementById("btn-guardar").disabled = true; // Deshabilitar el botón al cargar la página
    })



    $(".selPlaca").change(function(e) {
        e.preventDefault();
        var placa = $('.selPlaca option:selected').attr('value');
        var placa2 = placa.split("-");
        $(".Vplaca").val(placa2[1]);
        $("#placa").val(placa2[1]);
        $("#idprueba").val(placa2[0]);
        $("#btn-buscar-placa").click();
    });

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
                    idtipo_prueba: 10,
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
                            if (res.observacion == 'Alineacion eje 1')
                                $("#eje1").val(res.valor);
                            if (res.observacion == 'Alineacion eje 2')
                                $("#eje2").val(res.valor);
                            if (res.observacion == 'Alineacion eje 3')
                                $("#eje3").val(res.valor);
                            if (res.observacion == 'Alineacion eje 4')
                                $("#eje4").val(res.valor);
                            if (res.observacion == 'Alineacion eje 5')
                                $("#eje5").val(res.valor);
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

    

    // Configuración del tiempo (en segundos) - puedes modificar este valor
    const TIEMPO_PRUEBA = 10; // 5 minutos = 300 segundos

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
                    position: "bottom-end",
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
</script>