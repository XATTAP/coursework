import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull,
    HasMany,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import User from "./User.model";
  
  @Table({
    timestamps: true,
  })
  class Message_General extends Model {
    @Column(DataType.STRING)
    info: string;
  
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;
  
    @BelongsTo(() => User, "email")
    user: User;
  }
  
  export default Message_General;
  