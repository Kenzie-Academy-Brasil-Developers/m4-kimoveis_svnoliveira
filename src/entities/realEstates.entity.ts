import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Category from "./categories.entity";
import Address from "./addresses.entity";

@Entity("realEstates")
class RealEstate { 
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ default: false })
    sold: boolean;
    
    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
    value: number;

    @Column({ type: "integer" })
    size: number;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category)
    category: Category;
};

export default RealEstate;