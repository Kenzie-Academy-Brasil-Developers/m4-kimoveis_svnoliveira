import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: "date" })
    createdAt: string;

    @Column({ type: "date" })
    updatedAt: string;

    @Column({ type: "date", nullable: true })
    deletedAt?: string | undefined | null;
};

export default User;