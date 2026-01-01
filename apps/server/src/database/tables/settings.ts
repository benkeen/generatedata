import type { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'settings',
    {
      settingName: {
        type: DataTypes.STRING,
        field: 'setting_name'
      },
      settingValue: {
        type: DataTypes.STRING,
        field: 'setting_value'
      }
    },
    {
      tableName: 'settings',
      timestamps: false
    }
  );
};
