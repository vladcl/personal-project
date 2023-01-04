import express from "express";
import cors from 'cors'
import mongoose from "mongoose";


const app = express();

app.use(cors);
app.use(express.json());

mongoose.set('strictQuery', true);

mongoose.connect