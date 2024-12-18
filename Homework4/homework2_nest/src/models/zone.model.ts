import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey,} from 'sequelize-typescript';
  import { Region } from './region.model.js';
  
  @Table({
    tableName: 'Zones',
    timestamps: false,
  })
  export class Zone extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    ZoneID: number;
  
    @ForeignKey(() => Region)
    @Column
    RegionID: number;
  
    @Column
    ZoneName: string;
  }
  