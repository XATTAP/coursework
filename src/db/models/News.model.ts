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
  
  @Table({
    timestamps: true,
  })
  class News extends Model {

    @AllowNull(false)
    @Column(DataType.STRING)
    Head: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    info: string;
  
  }
  
  export default News;
  