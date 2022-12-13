import HotelModel from "../models/HotelModel.js";
import RoomModel from "../models/RoomModel.js";

import {StatusCodes} from "http-status-codes"

import {BadRequestError,NotFoundError} from "../errors/index.js"

import moment from "moment";
import { CompressOutlined } from "@mui/icons-material";

const createRoom=async (req,res)=>{
    let {hotel}=req.body
    let isHotelExists=await HotelModel.findOne({_id:hotel})
    if(!isHotelExists){
        throw new BadRequestError("This hotel not even exists")
    }
    let Room=await RoomModel.create({...req.body})
    res.status(StatusCodes.CREATED).json({Room})
}

const deleteRoom=async (req,res)=>{
  let {RoomId}=req.params
  let Room=await RoomModel.findOne({_id:RoomId})

  if(!Room){
    throw new NotFoundError("The Room Not Exist")
  }
  
  await Room.remove()

  res.status(StatusCodes.OK).json({Room,msg:'The Room is deleted successfully'})
}


const getSingleRoom=async (req,res)=>{
    let {RoomId}=req.params
  let Room=await RoomModel.findOne({_id:RoomId}).populate({path:"ReservedDates.user",select:"name email"}).populate("hotel")

  if(!Room){
    throw new NotFoundError("The Room Not Exist")
  } 

  res.status(StatusCodes.OK).json({Room})
}


const updateRoom=async (req,res)=>{
    let {RoomId}=req.params
    let Room=await RoomModel.findOne({_id:RoomId})
  
    if(!Room){
      throw new NotFoundError("The Room Not Exist")
    } 
    
    let updatedRoom =await RoomModel.findByIdAndUpdate(
        RoomId,{
            $set:req.body
        },
        {new:true}
    )

    res.status(StatusCodes.OK).json({updatedRoom})

}


const getAllRooms=async (req,res)=>{
    const Rooms=await RoomModel.find({})
    res.status(StatusCodes.OK).json({Rooms}).populate({path:"ReservedDates.user",select:"name email"})
}


const getRoomsOfHotel=async (req,res)=>{
    let {HotelId}=req.params
    let Hotel=await HotelModel.findOne({_id:HotelId})
    if(!Hotel){
        throw new NotFoundError("The Hotel is not there")
    }

    let Rooms=await RoomModel.find({hotel:HotelId}).populate("ReservedDates.user")
   
    res.status(StatusCodes.OK).json({Rooms})
}


const reserveRoom=async (req,res)=>{
    let {RoomId}=req.params
    let {date}=req.body
    let Room=await RoomModel.findOne({_id:RoomId})
  
    if(!Room){
      throw new NotFoundError("The Room Not Exist")
    } 
   let formatedDate=moment(date).format('MMMM d, YYYY'); 
   console.log(formatedDate)


    let isAlreadyReserved=Room.ReservedDates.find((all)=>all.date===date)
    console.log(isAlreadyReserved)

  

    //  let d=Room.ReservedDates.date.includes(formatedDate)
    //  console.log(d)
    // let isAlreadyReserved=Room.ReservedDates.find((d)=>d.date==formatedDate)
    
    
//    if(isAlreadyReserved){
//     throw new BadRequestError("The room is reserved for that date soory")
//    }
    res.status(StatusCodes.OK).json({Room,msg:"The Room is reserved for you"})

}


export  {createRoom,deleteRoom,updateRoom,getSingleRoom,getAllRooms,reserveRoom,getRoomsOfHotel}