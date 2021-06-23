import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1624394832545 implements MigrationInterface {
//o metodo up - fazer a migration
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
                name: "users",
                columns:[
                    {
                        name: "id",
                        type: "uuid",//uuid é um id com 32 digitos, isso é, nunca se repetirá
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "admin",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default:"now()",
                    },
                    {
                        name:"updated_at",
                        type: "timestamp",
                        default:"now()",
                    },
                ],
              })
            );
          }
        
          public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("users");
          }
        }