import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()

export class Location {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  locationId: number;
  @Column('text')
  locationName: string;
  @Column('text')
  locationAddress: string;
  @Column('simple-array')
  locationLatLng: number[];

  @OneToOne(() => Manager, {
    eager: true,
  })
  
  @JoinColumn({
    name: "managerId"
  })
  manager: Manager;
  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({
    name: "regionId"
  })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}