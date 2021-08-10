import { Pillar } from "../../pillars/models/pillar.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../../cities/models/city.model";

@Entity()

export class SubPillar {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    type: string;

    @ManyToOne(type => Pillar)
    @JoinColumn({ name: 'pillar_id' })
    pillar: Pillar;

    @ManyToOne(type => City)
    @JoinColumn({ name: 'city_id' })
    city: City;
}