import { Expose } from "class-transformer";
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("tags")
class Tag{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    // customizar tag
    @Expose({name: "name_Custom"})
    nameCustom(): string {
      return `#${this.name}`;
    }


    // verifica se o id NÃO está preenchido, se não tivesse o " ! " seria se ESTÁ presnchido
    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }
}

export{ Tag };