import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    independent: boolean;

    @Column()
    unMember: boolean;

    @Column({ nullable: true })
    currency: string;

    @Column({ nullable: true })
    capital: string;

    @Column()
    region: string; // For now it's the way to go. Maybe if I start ranking countries we could change this and also rank (sub)regions

    @Column({ nullable: true })
    subregion: string;

    @Column({ nullable: true })
    languages: string;

    @Column()
    landlocked: boolean;

    @Column()
    area: number;

    @Column()
    emojiFlag: string;

    @Column()
    description: string;
}