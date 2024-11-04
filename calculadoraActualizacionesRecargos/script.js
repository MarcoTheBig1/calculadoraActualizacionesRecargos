 // Datos de INPC (deberás completar con los datos reales)
 const inpcData = {
    "2023-01": 128.546,
    "2023-02": 128.730,
    "2023-03": 129.240,
    "2023-04": 129.700,
    "2023-05": 130.040,
    "2023-06": 130.270,
    "2023-07": 130.790,
    "2023-08": 131.240,
    "2023-09": 131.740,
    "2023-10": 132.300,
    "2023-11": 132.760,
    "2023-12": 133.110,
    "2024-01": 133.500,
    "2024-02": 134.000,
    "2024-03": 135.600,
    "2024-04": 135.750,
    "2024-05": 136.080,
    "2024-06": 136.350,
    "2024-07": 136.600,
    "2024-08": 137.000,
    "2024-09": 137.300,
    "2024-10": 137.700,
    // Agrega más datos según sea necesario
};

function calcular() {
    // Obtener datos del formulario
    const importePagar = parseFloat(document.getElementById("importePagar").value);
    const fechaOriginal = document.getElementById("fechaOriginal").value;
    const fechaPago = document.getElementById("fechaPago").value;

    if (!importePagar || !fechaOriginal || !fechaPago) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Convertir fechas para acceder al INPC
    const fechaOriginalKey = `${fechaOriginal.slice(0, 4)}-${fechaOriginal.slice(5, 7)}`;
    const fechaPagoKey = `${fechaPago.slice(0, 4)}-${fechaPago.slice(5, 7)}`;
    const inpcOriginal = inpcData[fechaOriginalKey];
    const inpcPago = inpcData[fechaPagoKey];

    if (!inpcOriginal || !inpcPago) {
        alert("No se encontraron datos de INPC para las fechas proporcionadas.");
        return;
    }

    // Cálculo del Factor de Actualización
    const factorActualizacion = inpcPago / inpcOriginal;
    const impuestoActualizado = importePagar * factorActualizacion;

    // Calcular meses transcurridos
    const fechaInicio = new Date(fechaOriginal);
    const fechaFin = new Date(fechaPago);
    const mesesTranscurridos = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 +
                               (fechaFin.getMonth() - fechaInicio.getMonth());

    // Cálculo de Recargos
    const tasaRecargo = 1.47; // Tasa de recargo mensual en %
    const recargos = impuestoActualizado * (mesesTranscurridos * (tasaRecargo / 100));

    // Total a pagar
    const totalPagar = impuestoActualizado + recargos;

    // Mostrar resultados
    document.getElementById("resultados").innerHTML = `
        <h3>Resultados del Cálculo</h3>
        <p><strong>Cálculo de Actualización:</strong></p>
        <p>INPC Fecha Original: ${inpcOriginal}</p>
        <p>INPC Fecha de Pago: ${inpcPago}</p>
        <p>Factor de Actualización: ${factorActualizacion.toFixed(5)}</p>
        <p>Impuesto Actualizado: $${impuestoActualizado.toFixed(2)}</p>
        <p><strong>Cálculo de Recargo:</strong></p>
        <p>Meses Transcurridos: ${mesesTranscurridos}</p>
        <p>Tasa de Recargo: ${tasaRecargo}%</p>
        <p>Recargos: $${recargos.toFixed(2)}</p>
        <p><strong>Total a Pagar: $${totalPagar.toFixed(2)}</strong></p>
    `;
}