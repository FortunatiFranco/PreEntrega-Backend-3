import { connect } from "mongoose";


export const initMongoDB = async ()=>{
    try {
        const URL = process.env.URL;
        console.log(URL)
        await connect(URL);
    } catch (error) {
        throw new Error(error);
    }
}