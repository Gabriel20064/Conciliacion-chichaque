export default class Cl_mTransaccion {
    _fecha = "";
    _descripcion = "";
    _monto = 0;
    _referencia = "";
    _tipoTransaccion = 0;
    _categoria = 0;
    constructor({ fecha, descripcion, monto, referencia, tipoTransaccion, categoria }) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.monto = monto;
        this.referencia = referencia;
        this.tipoTransaccion = tipoTransaccion;
        this.categoria = categoria;
    }
    get fecha() {
        return this._fecha;
    }
    set fecha(f) {
        this._fecha = f;
    }
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(d) {
        this._descripcion = d;
    }
    get monto() {
        return this._monto;
    }
    set monto(m) {
        this._monto = +m;
    }
    get referencia() {
        return this._referencia;
    }
    set referencia(r) {
        this._referencia = r;
    }
    get tipoTransaccion() {
        return this._tipoTransaccion;
    }
    set tipoTransaccion(t) {
        this._tipoTransaccion = +t;
    }
    get categoria() {
        return this._categoria;
    }
    set categoria(c) {
        this._categoria = +c;
    }
    error() {
        if (this.descripcion.length === 0) {
            return "La descripción no puede estar vacía";
        }
        if (this.monto === 0) {
            return "El monto no puede ser 0";
        }
        if (this.referencia.length === 0) {
            return "La referencia no puede estar vacía";
        }
        if (this.referencia.length !== 7) {
            return "La referencia debe tener 7 caracteres";
        }
        return false;
    }
    montoCargo() {
        if (this.tipoTransaccion === 1)
            return this.monto;
        else
            return 0;
    }
    montoAbono() {
        if (this.tipoTransaccion === 2)
            return this.monto;
        else
            return 0;
    }
    toJSON() {
        return {
            descripcion: this.descripcion,
            monto: this.monto,
            referencia: this.referencia,
            categoria: this.categoria,
            fecha: this.fecha,
            tipoTransaccion: this.tipoTransaccion
        };
    }
}
