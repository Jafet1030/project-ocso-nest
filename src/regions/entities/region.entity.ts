import { Location } from "src/locations/entities/location.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
 
 @Entity()
 export class Region {
   @PrimaryGeneratedColumn('increment')
   regionId: number;
   @Column({
     type: "text",
     unique: true
   })
   regionName: string;
   @Column('simple-array')
   regionStates: string[];
 
   @OneToMany(() => Location, (location) => location.region)
   locations: Location[];
 }