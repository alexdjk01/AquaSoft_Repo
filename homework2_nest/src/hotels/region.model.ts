import { Table, Column, Model, PrimaryKey, AutoIncrement,HasMany  } from 'sequelize-typescript';
import { Hotel } from './hotel.model';

@Table({
  tableName: 'Regions',
  timestamps: false,
})
export class Region extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  RegionID: number;

  @Column
  RegionName: string;

  @Column
  Country: string;

  @HasMany(() => Hotel)
  Hotels: Hotel[];
}
