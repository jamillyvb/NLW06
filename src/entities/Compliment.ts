import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_sender: string;
    @JoinColumn({ name: "user_SENDER"})
    @ManyToOne(() => User)
    userSender: User;

 
    @Column()
    user_receiver: string;
    @JoinColumn({ name: "user_receiver"})
    @ManyToOne(() => User)
    userReceiver: User;

    @Column()
    tag_id: string;
    @JoinColumn({ name: "tag_id"})
    //relação de tabela -> muitos elogios pode ter uma tag, ao invés de muitas tag só pode ter um elogio
    //muitos para um
    @ManyToOne(() => Tag)
    tag: Tag;
    
    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;

constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export{ Compliment };
