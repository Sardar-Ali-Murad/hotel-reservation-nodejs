import HotelModel from "../models/HotelModel.js";
import {StatusCodes} from "http-status-codes"
import {NotFoundError,BadRequestError} from "../errors/index.js"
import RoomModel from "../models/RoomModel.js"


const createHotel=async (req,res)=>{
    let Hotel=await HotelModel.create({...req.body})
    res.status(StatusCodes.CREATED).json({Hotel,msg:"Created Successfully"})
}

const deleteHotel=async (req,res)=>{
    let {hotelId}=req.params

    let Hotel=await HotelModel.findOne({_id:hotelId})

    if(!Hotel){
        throw new NotFoundError("Sorry the hotel not exists")
    }

    let deleteReleatedRooms=await RoomModel.deleteMany({hotel:hotelId})

    await Hotel.remove()

    res.status(StatusCodes.OK).json({msg:"The hotel and its releated rooms are deleted successfully"})
}

const getSingleHotel=async (req,res)=>{
    let {hotelId}=req.params

    let Hotel=await HotelModel.findOne({_id:hotelId})


    if(!Hotel){
        throw new NotFoundError("Sorry the hotel not exists")
    }

    let hotelReleatedRooms=await RoomModel.find({hotel:hotelId})

    res.status(StatusCodes.OK).json({Hotel,hotelReleatedRooms})

}


const getAllHotels=async (req,res)=>{
    let Hotels=await HotelModel.find({})
    
    res.status(StatusCodes.OK).json({Hotels})
}

const updateHotel=async (req,res)=>{
    let {hotelId}=req.params
    let Hotel=await HotelModel.findOne({_id:hotelId})
    if(!Hotel){
        throw new NotFoundError("Sorry the hotel not exists")
    }
    
    let updateHotel=await HotelModel.findByIdAndUpdate(
        hotelId,{
            $set:req.body
        },
        {new:true}
    )

    res.status(StatusCodes.OK).json({updateHotel})
}

const getHotelByRegion=async (req,res)=>{
    let {region}=req.body
    if(!region){
        throw new BadRequestError("Provide the id of the hotel to proceed")
    }

    let HotelsByRegion=await HotelModel.find({region:region})

    res.status(StatusCodes.OK).json({HotelsByRegion})
}


export {createHotel,deleteHotel,updateHotel,getSingleHotel,getAllHotels,getHotelByRegion}