import {Entity , Column  , PrimaryGeneratedColumn} from "typeorm"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    _id : number

    @Column()
    userName : string 

    @Column()
    fullName :string 

    @Column()
    sexe : string 

    @Column()
    email : string 

    @Column()
    password  : string 

    @Column({default : ""})
    picture : string 

    @Column({ default : "" })
    bio : string 


}