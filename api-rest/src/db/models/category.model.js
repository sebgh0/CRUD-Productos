const { Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'categories';

class Category extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false, // Desactivar timestamps
        };
    }
}

const CategorySchema = {
    category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
};

module.exports = { Category, CategorySchema };
