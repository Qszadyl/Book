import {pool} from '../utils/db';
import {ValidationError} from '../utils/errors';
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";
import {ClientEntity} from "../types/client/client.entity";

type ClientRecordResult = [ClientRecord[], FieldPacket[]];

export class ClientRecord implements ClientEntity{
    id?: string;
    name: string;
    surname: string;
    email: string;
    phone: string;

    constructor(obj: ClientEntity){
        if(!obj.name || obj.name.length < 3 || obj.name.length > 25){
            throw new ValidationError('Imię musi mieć od 3 do 25 znaków')
        }
        if(!obj.surname || obj.surname.length < 3 || obj.surname.length > 25){
            throw new ValidationError('Imię musi mieć od 3 do 25 znaków')
        }

        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.email = obj.email;
        this.phone = obj.phone;
    }

    async insert():Promise<string>{
        if(!this.id){
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `clients` VALUES(:id,:name,:surname, :email, :phone)",{
            id: this.id,
            name: this.name,
            surname:this.surname,
            email: this.email,
            phone: this.phone
        })
        return this.id
    }


    static async listAll():Promise<ClientRecord[]>{
        const [results] = (await pool.execute("SELECT *  FROM  `clients` ORDER BY `surname` ASC"))as ClientRecordResult;
        return results.map(obj=>new ClientRecord(obj));
    }

    static async getOne(id: string): Promise<ClientRecord> | null{
        const [results] = await pool.execute("SELECT * FROM `clients` WHERE `id` = :id",{
            id
        }) as ClientRecordResult;
        return results.length === 0 ? null : new ClientRecord(results[0]);
    }

    static async searchClient(nameInput:string):Promise<ClientRecord[]>{
        const [results] = await pool.execute(`SELECT * FROM clients WHERE name LIKE '${nameInput}%'`,{
            nameInput
        }) as ClientRecordResult;
        return results.map(obj=>new ClientRecord(obj));
    }

    async update(): Promise<void>{
        await pool.execute("UPDATE `clients` SET `name` = :name, `surname` = :surname, `email` = :email, `phone` = :phone",{
            id: this.id,
            name: this.name,
            surname: this.surname,
            emial: this.email,
            phone: this.phone
        });
    }

    async delete():Promise<void>{
        await pool.execute("DELETE FROM `clients` WHERE `id` = :id",{
            id: this.id
        })
    }

  



}