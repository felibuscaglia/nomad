import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Ad {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true })
    companyName?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    image?: string;

    @Column({ default: false })
    local?: boolean;
}