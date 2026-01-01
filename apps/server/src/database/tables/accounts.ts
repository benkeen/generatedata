import type { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'accounts',
    {
      accountId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'account_id'
      },
      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'created_by'
      },
      dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_created'
      },
      lastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'last_updated'
      },
      lastLoggedIn: {
        type: DataTypes.DATE,
        field: 'last_logged_in'
      },
      expiryDate: {
        type: DataTypes.DATE,
        field: 'date_expires'
      },
      refreshToken: {
        type: DataTypes.STRING(200),
        field: 'refresh_token'
      },
      accountType: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        field: 'account_type'
      },
      accountStatus: {
        type: DataTypes.ENUM('live', 'disabled', 'expired'),
        allowNull: false,
        field: 'account_status'
      },
      firstName: {
        type: DataTypes.STRING(255),
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING(255),
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      oneTimePassword: {
        type: DataTypes.STRING(255),
        field: 'one_time_password'
      },
      country: {
        type: DataTypes.STRING(255)
      },
      region: {
        type: DataTypes.STRING(255)
      },
      maxRecords: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'max_records'
      }
    },
    {
      tableName: 'accounts',
      timestamps: false
    }
  );
};
