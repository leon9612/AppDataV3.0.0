<style>
.placa-destacada-container {
    display: inline-block;
    text-align: center;
}

.placa-destacada {
    background: linear-gradient(135deg, #ffcc00 0%, #ff9900 100%);
    border: 3px solid #003366;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    display: inline-block;
    margin-bottom: 5px;
}

.placa-texto {
    background: transparent !important;
    border: none !important;
    font-family: 'Arial Black', 'Arial Bold', sans-serif;
    font-size: 1.8rem;
    font-weight: 900;
    color: #003366;
    letter-spacing: 3px;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
    width: 200px;
}

.placa-texto:disabled {
    background: transparent !important;
    color: #003366 !important;
    opacity: 1 !important;
}

/* Efecto de brillo */
.placa-destacada::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 7px 7px 0 0;
    pointer-events: none;
}
</style>

<!-- Sección de placa destacada -->
<div class="row mb-4">
    <div class="col-md-12 text-center">
        <div class="placa-destacada-container">
            <div class="placa-destacada">
                <input type="text" name="Vplaca" class="form-control Vplaca placa-texto" id="floatingInput"
                    placeholder="" disabled style="text-transform: uppercase;">
            </div>

            <input type="hidden" name="idprueba" id="idprueba" class="form-control">
            <input type="hidden" name="placa" id="placa" class="form-control">
            @if ($errors->has('idprueba'))
            <span class="error text-danger">{{ $errors->first('idprueba') }}</span>
            @endif
        </div>
    </div>
</div>

<!-- Sección de selección de vehículo -->
<div class="row mb-4">
    <div class="col-md-12">
        <h5 class="mb-3 border-bottom pb-2">Selección de vehículo</h5>
    </div>

    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
        <div class="input-group">
            <span class="input-group-text">
                <i class="bi bi-car-front"></i>
            </span>
            <select class="form-select selPlaca" id="inputGroupSelect01" name="selPlaca">
                <option selected>Seleccione una placa</option>
                @foreach ($placas as $placa)
                <option value="{{ $placa->idprueba . '-' . $placa->placa }}">
                    {{ $placa->placa }}
                </option>
                @endforeach
            </select>
        </div>
    </div>

    <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <button style="width: 100%;" class="btn btn-outline-primary" id="btn-actuplacas" type="button"
            onclick="location.reload();">
            Actualizar placas
        </button>
    </div>

    <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <button style="width: 100%;" class="btn btn-outline-success" id="btn-buscar-placa" type="button">
            Buscar datos
        </button>
    </div>

    @if(sicov() == 'INDRA' || sicov() == 'CI2')
    <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <button style="width: 100%;" class="btn btn-outline-warning" id="btn-evento" type="button">
            Evento inicial
        </button>
    </div>
    @endif
</div>

<!-- Sección de configuración de prueba -->
<div class="row mb-4">
    <div class="col-md-12">
        <h5 class="mb-3 border-bottom pb-2">Configuración de prueba</h5>
    </div>

    <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="input-group">
            <span class="input-group-text">
                <i class="bi bi-clipboard-check"></i>
            </span>
            <select class="form-select selEstado" id="inputGroupSelect01" name="selEstado">
                <option value="2">Aprobado</option>
                <option value="1">Rechazado</option>
            </select>
        </div>
    </div>

    <div class="col-sm-12 col-md-4 col-lg-4 mb-2">
        <div class="input-group">
            <span class="input-group-text">
                <i class="bi bi-person"></i>
            </span>
            <select class="form-select" id="inputGroupSelect01" name="selUsuario" id="selUsuario">
                @foreach ($usuarios as $us)
                <option value="{{ $us->IdUsuario }}">{{ $us->nombre }} </option>
                @endforeach
            </select>
        </div>
    </div>

    <div class="col-sm-12 col-md-5 col-lg-5 mb-2">
        <div class="input-group">
            <span class="input-group-text">
                <i class="bi bi-gear"></i>
            </span>
            <select class="form-select" name="selMaquina" id="selMaquina">
                @foreach ($maquinas as $ma)
                <option value="{{ $ma->idmaquina }}">{{ $ma->maquina }} </option>
                @endforeach
            </select>
        </div>
        @if ($errors->has('selMaquina'))
        <span class="error text-danger">{{ $errors->first('selMaquina') }}</span>
        @endif
    </div>
</div>