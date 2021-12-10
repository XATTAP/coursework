import {
    Table,
    Column,
    Model,
    DataType,
    Unique,
    AllowNull,
    BelongsTo,
  } from "sequelize-typescript";
  import User from "./User.model";
  
  @Table({
    timestamps: true,
  })
  class Token extends Model {
  
    @Column(DataType.NUMBER)
    userId: number;
  
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    token: string;
  
    @BelongsTo(() => User, 'userId')
    user: User[];
  }
  
  export default Token;
  