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
  class Message_Personal extends Model {
    @Column(DataType.STRING)
    info: string;
  
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.STRING)
    email_from: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.STRING)
    email_to: string;
  
    @BelongsTo(() => User, "email_from")
    sender: User;

    @BelongsTo(() => User, "email_to")
    recipient: User;
  }
  
  export default Message_Personal;