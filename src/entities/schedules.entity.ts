import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./users.entity";
import RealEstate from "./realEstates.entity";

@Entity("schedules")
class Schedule { 
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "date" })
    date: string;

    @Column({ type: "time" })
    hour: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate;
};

export default Schedule;