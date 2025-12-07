import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";
import Cl_mTransaccion , { iTransaccion } from "./Cl_mTransaccion.js";

export default class Cl_vEditTransaccion extends Cl_vGeneral {
    private inFecha: HTMLInputElement;
    private inDescripcion: HTMLInputElement;
    private inMonto: HTMLInputElement;
    private inReferencia: HTMLInputElement;
    private inTipoTransaccion: HTMLInputElement;
    private inCategoria: HTMLInputElement;
    private btCancelar: HTMLButtonElement;
    private btGuardar: HTMLButtonElement;
    private editingReferencia: string | null = null;
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

    public cargarDatos(trans: iTransaccion) {
        this.editingReferencia = trans.referencia;
        this.inFecha.value = trans.fecha;
        this.inDescripcion.value = trans.descripcion;
        this.inMonto.value = trans.monto.toString();
        this.inReferencia.value = trans.referencia;
        this.inTipoTransaccion.value = trans.tipoTransaccion.toString();
        this.inCategoria.value = trans.categoria.toString();
        this.inReferencia.disabled = true;
    }
    private guardar() {
        if (!this.inFecha.value || !this.inDescripcion.value || !this.inMonto.value || !this.inReferencia.value || !this.inTipoTransaccion.value || !this.inCategoria.value) {
            alert("Debes llenar todos los campos.");
            return;
        }
        if (+this.inMonto.value <= 0){ 
            alert("El monto debe ser mayor a 0.");
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
    private cancelar() {
        this.limpiar();
        this.editingReferencia = null;
        this.inReferencia.disabled = false;
        this.controlador?.mostrarVista("transacciones");
    }
    private limpiar() {
        this.inFecha.value = "";
        this.inDescripcion.value = "";
        this.inReferencia.value = "";
        this.inMonto.value = "";
        this.inTipoTransaccion.value = "";
        this.inCategoria.value = "";
    }
    public mostrar() { this.vista!.hidden = false; }
    public ocultar() { this.vista!.hidden = true; }
}