import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vEditTransaccion extends Cl_vGeneral {
    inFecha;
    inDescripcion;
    inMonto;
    inReferencia;
    inTipoTransaccion;
    inCategoria;
    btCancelar;
    btGuardar;
    editingReferencia = null;
    constructor() {
        super({ formName: "editTransaccion" });
        this.inFecha = this.crearHTMLInputElement("inFecha");
        this.inDescripcion = this.crearHTMLInputElement("inDescripcion");
        this.inMonto = this.crearHTMLInputElement("inMonto");
        this.inReferencia = this.crearHTMLInputElement("inReferencia");
        this.inTipoTransaccion = this.crearHTMLInputElement("inTipoTransaccion");
        this.inCategoria = this.crearHTMLInputElement("inCategoria");
        this.btGuardar = this.crearHTMLButtonElement("btGuardar", {
            onclick: () => this.guardar()
        });
        this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
            onclick: () => this.cancelar()
        });
    }
    cargarDatos(trans) {
        this.editingReferencia = trans.referencia;
        this.inFecha.value = trans.fecha;
        this.inDescripcion.value = trans.descripcion;
        this.inMonto.value = trans.monto.toString();
        this.inReferencia.value = trans.referencia;
        this.inTipoTransaccion.value = trans.tipoTransaccion.toString();
        this.inCategoria.value = trans.categoria.toString();
        this.inReferencia.disabled = true;
    }
    guardar() {
        if (!this.inFecha.value || !this.inDescripcion.value || !this.inMonto.value || !this.inReferencia.value || !this.inTipoTransaccion.value || !this.inCategoria.value) {
            alert("Debes llenar todos los campos.");
            return;
        }
        const data = {
            fecha: this.inFecha.value,
            descripcion: this.inDescripcion.value.toLowerCase(),
            monto: parseFloat(this.inMonto.value || "0"),
            referencia: this.editingReferencia ?? this.inReferencia.value.trim().toUpperCase(),
            tipoTransaccion: parseInt(this.inTipoTransaccion.value || "0", 10),
            categoria: parseInt(this.inCategoria.value || "0", 10)
        };
        this.controlador?.procesarTransaccion(data);
        this.limpiar();
        this.editingReferencia = null;
        this.inReferencia.disabled = false;
    }
    cancelar() {
        this.limpiar();
        this.editingReferencia = null;
        this.inReferencia.disabled = false;
        this.controlador?.mostrarVista("transacciones");
    }
    limpiar() {
        this.inFecha.value = "";
        this.inDescripcion.value = "";
        this.inReferencia.value = "";
        this.inMonto.value = "";
        this.inTipoTransaccion.value = "";
        this.inCategoria.value = "";
    }
    mostrar() { this.vista.hidden = false; }
    ocultar() { this.vista.hidden = true; }
}
