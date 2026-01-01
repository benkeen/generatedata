import type { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'dataSetHistory',
    {
      historyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'history_id'
      },
      dataSetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'dataset_id'
      },
      dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_created'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'dataset_history',
      timestamps: false
    }
  );
};
