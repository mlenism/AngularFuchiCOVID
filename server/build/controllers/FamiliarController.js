"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FamiliarController {
    async getFamiliares(req, res) {
        try {
            // const familiares: QueryResult = await pool.query('SELECT * FROM familiar ORDER BY id ASC');
            // return res.status(200).json(familiares.rows);
            const listaDePrueba = [
                {
                    id: '1044111111',
                    nombre: 'nombre_familiar1',
                    apellido: 'apellido_familiar1',
                    email: 'correo1@gmail.com',
                    telefono: '3151111111',
                    parentesco: 'hermano',
                    tipoID: 'cedula de ciudadanía',
                    idTipoID: '1'
                }
            ];
            return res.status(200).json(listaDePrueba);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async setFamiliar(req, res) {
        try {
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async updateFamiliar(req, res) {
        try {
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteFamiliar(req, res) {
        try {
            const { id_paciente, id_familiar } = req.body;
            console.log(req.body);
            return res.status(200).send('BORRADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const familiarController = new FamiliarController();
exports.default = familiarController;
