import type { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'dataSets',
    {
      dataSetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'dataset_id'
      },
      dataSetName: {
        type: DataTypes.STRING(255),
        field: 'dataset_name',
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('public', 'private'),
        allowNull: false
      },
      dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_created'
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'account_id'
      },
      numRowsGenerated: {
        type: DataTypes.INTEGER,
        field: 'num_rows_generated',
        allowNull: false
      }
    },
    {
      tableName: 'datasets',
      timestamps: false
    }
  );
};
