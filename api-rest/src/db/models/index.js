const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');

function setupModels(sequelize) {
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));

    // Si hay asociaciones entre modelos, las definimos aquí
    Product.belongsTo(Category, { foreignKey: 'category_id' });
    Category.hasMany(Product, { foreignKey: 'category_id' });
}

module.exports = setupModels;
