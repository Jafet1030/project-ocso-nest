import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Location } from "src/locations/entities/location.entity";
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    employeeId: string;
    @Column({type:"text"})
    employeeName: string;
    @Column({type:"text"})
    employeeLastName: string;
    @Column({type:"text"})
    employeePhoneNumber: string;
   @Column('text', {unique: true})
   employeeEmail: string;
    @Column({
        type:"text",
        nullable:true
    })
    employeePhoto: string;

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
      name: "locationId"
    })
    location: Location;
    

   @OneToOne(() => User)
   @JoinColumn({
     name: "userId"
   })
   user: User;
}
