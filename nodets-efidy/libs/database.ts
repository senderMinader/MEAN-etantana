import {connect, connection} from "mongoose";

async function run(): Promise<void>{
    await connect('mongodb://localhost:27017/test');
}
run().catch(err => console.log(err));
const conn = connection;

conn.on('connected', ()=>{
    console.log('Database is connected successfully');
});

conn.on('disconnected', ()=>{
    console.log('database is disconnected');
});

conn.on('error', console.error.bind(console, 'connection error'));

//api to get data from mongo db


