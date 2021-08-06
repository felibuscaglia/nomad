import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CityImage {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    photographer: string;

    @Column()
    site: string;

    @Column()
    image: string;
}