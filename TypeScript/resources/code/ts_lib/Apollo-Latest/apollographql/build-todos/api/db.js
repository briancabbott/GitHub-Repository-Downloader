import Sequelize from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_URL);

const {Model, DataTypes} = Sequelize;

export class Todo extends Model {}
Todo.init(
  {
    text: DataTypes.STRING,
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    modelName: 'todo',
    sequelize
  }
);
