const { models } = require('../libs/sequelize');

class ProductService {
    constructor() {}

    // Obtener todos los productos
    async find() {
        const res = await models.Product.findAll();
        return res;
    }

    // Obtener un producto por ID
    async findOne(id) {
        const res = await models.Product.findByPk(id);
        return res;
    }

    // Crear un nuevo producto
    async create(data) {
        const res = await models.Product.create(data);
        return res;
    }

    // Actualizar un producto existente
    async update(id, data) {
        const model = await this.findOne(id);
        if (!model) {
            throw new Error('Product not found');
        }
        const res = await model.update(data);
        return res;
    }

    // Eliminar un producto por ID
    async delete(id) {
        const model = await this.findOne(id);
        if (!model) {
            throw new Error('Product not found');
        }
        await model.destroy();
        return { deleted: true };
    }
}

module.exports = ProductService;
