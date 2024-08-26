const { models } = require('../libs/sequelize');

class CategoryService {
    constructor() {}

    // Obtener todas las categorías
    async find() {
        const res = await models.Category.findAll();
        return res;
    }

    // Obtener una categoría por ID
    async findOne(id) {
        const res = await models.Category.findByPk(id);
        return res;
    }

    // Crear una nueva categoría
    async create(data) {
        const res = await models.Category.create(data);
        return res;
    }

    // Actualizar una categoría existente
    async update(id, data) {
        const model = await this.findOne(id);
        if (!model) {
            throw new Error('Category not found');
        }
        const res = await model.update(data);
        return res;
    }

    // Eliminar una categoría por ID
    async delete(id) {
        const model = await this.findOne(id);
        if (!model) {
            throw new Error('Category not found');
        }
        await model.destroy();
        return { deleted: true };
    }
}

module.exports = CategoryService;
