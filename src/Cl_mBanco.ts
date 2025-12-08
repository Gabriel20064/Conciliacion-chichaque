import Cl_mTransaccion, { iTransaccion } from "./Cl_mTransaccion.js";

export default class Cl_mBanco {
    private transacciones: Cl_mTransaccion[] = [];
    private readonly STORAGE_KEY = "Movimientos_Bancarios_data";
    //Atributos derivados para los metodos de conciliacion (en revision)
    //Resumen
    private acmMontoCargos: number = 0;
    private acmMontoAbonos: number = 0;
    //Desglose por categoria
    private cntTransacciones: number = 0;
    private categoria1: number = 0; // Ingresos
    private categoria2: number = 0; // Alimentacion
    private categoria3: number = 0; // Servicios Basicos
    private categoria4: number = 0; // Articulos de Vestimenta
    private categoria5: number = 0; // Servicios Publicos
    private categoria6: number = 0; // Entretenimiento
    private categoria7: number = 0; // Educacion
    private categoria8: number = 0; // Gasto del Hogar
    private categoria9: number = 0; // Otros
    private cntCategoria1: number = 0;
    private cntCategoria2: number = 0;
    private cntCategoria3: number = 0;
    private cntCategoria4: number = 0;
    private cntCategoria5: number = 0;
    private cntCategoria6: number = 0;
    private cntCategoria7: number = 0;
    private cntCategoria8: number = 0;
    private cntCategoria9: number = 0;
    //Analisis
    private categoriaMayorGasto: number = 0; // Categoria con mayor gasto
    private montoMayorGasto: number = 0; // Monto de la categoria con mayor gasto

    constructor() {
        this.cargar();
    }

    private cargar() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
            try {
                const json = JSON.parse(data);
                this.transacciones = json.map((registro: any) => new Cl_mTransaccion(registro));
            } catch (error) {
                console.error("Error al cargar data del almacenamiento local:", error);
                this.transacciones = [];
            }
        }
    }

    private guardar() {
        const data = this.transacciones.map(registro2 => registro2.toJSON());
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
    public procesarTransaccion(data: any): boolean {
        let existe = this.transacciones.find(a => a.referencia === data.referencia);
        
        if (existe) {
            if (data.referencia !== undefined) existe.referencia = data.referencia;
            if (data.fecha !== undefined) existe.fecha = data.fecha;
            if (data.descripcion !== undefined) existe.descripcion = data.descripcion;
            if (data.monto !== undefined) existe.monto = data.monto;
            if (data.tipoTransaccion !== undefined) existe.tipoTransaccion = data.tipoTransaccion;
            if (data.categoria !== undefined) existe.categoria = data.categoria;
        } else {
            this.transacciones.push(new Cl_mTransaccion(data));
        }
        
        this.guardar();
        return true;
    }

    public deleteTransaccion(referencia: string): boolean {
        let index = this.transacciones.findIndex(registro3 => registro3.referencia === referencia);
        if (index !== -1) {
            this.transacciones.splice(index, 1);
            this.guardar();
            return true;
        }
        return false;
    }

    public getTransaccion(referencia: string): Cl_mTransaccion | undefined {
        return this.transacciones.find(registro4 => registro4.referencia === referencia);
    }

    get dtTransacciones(): Cl_mTransaccion[] {
        return this.transacciones;
    }
    
    
    //Metodos 
     /*   public resumen(transacciones: Cl_mTransaccion[]): { totalIngresos: number; totalEgresos: number; saldoFinal:number }{
        for (let t of transacciones) {
            if (t.tipoTransaccion === 1) {
                this.acmMontoCargos += t.monto;
            } else if (t.tipoTransaccion === 2) {
                this.acmMontoAbonos += t.monto;
            }
        }
        return { totalIngresos: this.acmMontoAbonos, totalEgresos: this.acmMontoCargos, saldoFinal: this.acmMontoAbonos - this.acmMontoCargos };    
    }

        public DesgloseCategoria(transacciones: Cl_mTransaccion[]): { 
    ingresos: number; 
    alimentacion: number; 
    serviciosBasicos: number; 
    articulosVestimenta: number; 
    serviciosPublicos: number; 
    entretenimiento: number; 
    educacion: number; 
    gastoHogar: number; 
    otros: number; 
    pIngresos: number;
    pAlimentacion: number; 
    pServiciosBasicos: number; 
    pArticulosVestimenta: number; 
    pServiciosPublicos: number; 
    pEntretenimiento: number; 
    pEducacion: number; 
    pGastoHogar: number; 
    pOtros: number; 
} {
    let ingresos = 0;
    let alimentacion = 0;
    let serviciosBasicos = 0;
    let articulosVestimenta = 0;
    let serviciosPublicos = 0;
    let entretenimiento = 0;
    let educacion = 0;
    let gastoHogar = 0;
    let otros = 0;
    let pIngresos = 0;
    let pAlimentacion = 0;
    let pServiciosBasicos = 0;
    let pArticulosVestimenta = 0;
    let pServiciosPublicos = 0;
    let pEntretenimiento = 0;
    let pEducacion = 0;
    let pGastoHogar = 0;
    let pOtros = 0;

    for (let t of transacciones) {
        switch (t.categoria) {
            case 1:
                ingresos += t.monto;
                break;
            case 2:
                alimentacion += t.monto;
                break;
            case 3:
                serviciosBasicos += t.monto;
                break;
            case 4:
                articulosVestimenta += t.monto;
                break;
            case 5:
                serviciosPublicos += t.monto;
                break;
            case 6:
                entretenimiento += t.monto;
                break;
            case 7:
                educacion += t.monto;
                break;
            case 8:
                gastoHogar += t.monto;
                break;
            case 9:
                otros += t.monto;
                break;
            default:
                break;
        }
    }
    pIngresos = this.cntCategoria1 / this.cntTransacciones;
    pAlimentacion = this.cntCategoria2 / this.cntTransacciones;
    pServiciosBasicos = this.cntCategoria3 / this.cntTransacciones;
    pArticulosVestimenta = this.cntCategoria4 / this.cntTransacciones;
    pServiciosPublicos = this.cntCategoria5 / this.cntTransacciones;
    pEntretenimiento = this.cntCategoria6 / this.cntTransacciones;
    pEducacion = this.cntCategoria7 / this.cntTransacciones;
    pGastoHogar = this.cntCategoria8 / this.cntTransacciones;
    pOtros = this.cntCategoria9 / this.cntTransacciones;

    return { 
        ingresos, 
        alimentacion, 
        serviciosBasicos, 
        articulosVestimenta, 
        serviciosPublicos, 
        entretenimiento, 
        educacion, 
        gastoHogar, 
        otros, 
        pIngresos,
        pAlimentacion, 
        pServiciosBasicos, 
        pArticulosVestimenta, 
        pServiciosPublicos, 
        pEntretenimiento, 
        pEducacion, 
        pGastoHogar, 
        pOtros 
    };
}*/
} 