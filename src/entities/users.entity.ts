import { getRounds, hashSync } from "bcryptjs";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn, 
    BeforeInsert, 
    BeforeUpdate 
} from "typeorm";

@Entity("users")
class User { 
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 45 })
    name: string;
    
    @Column({ length: 45, unique: true })
    email: string;

    @Column({ default: false })
    admin: boolean;

    @Column({ length: 120 })
    password: string;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;

    @DeleteDateColumn({ type: "date" })
    deletedAt: string | null;

    @BeforeInsert()
    @BeforeUpdate()
    hashpassword() {
        const hasRounds: number = getRounds(this.password);
        if(!hasRounds){
            this.password = hashSync(this.password, 10);
        }
    }
};

export default User;