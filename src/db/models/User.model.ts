import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
  Default,
  HasMany,

} from "sequelize-typescript";
import Message_General from "./General_Message.model";
import Message_Personal from "./Personal_Message.model";

@Table({
  timestamps: true,
})
class User extends Model {

  @AllowNull(false)
  @Column(DataType.STRING)
  fio: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  pasport: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  birthday: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  male: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  job: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  date_of_receipt: string;

  @Column(DataType.STRING)
  date_of_dismissal: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  salary: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  marital_status: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  amount_of_children: number;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @HasMany(() => Message_General, { foreignKey: "email", onDelete: "RESTRICT" })
  message_for_all: Message_General[];

  @HasMany(() => Message_Personal, { foreignKey: "email_to", onDelete: "RESTRICT" })
  message_to_me: Message_Personal[];

  @HasMany(() => Message_Personal, { foreignKey: "email_from", onDelete: "RESTRICT" })
  message_from_me: Message_Personal[];
}

export default User;
