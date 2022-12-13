
import mongoose from "mongoose";

const RoomSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Provide the title of the room"]
    },

    description:{
        type:String,
        required:[true,"Provide the detailed descriptiuon of the room"]
    },

    images:{
        type:Array,
        required:[true,"Provide the pictures releated to the room"]
    },
    
    hotel:{
        type:mongoose.Types.ObjectId,
       ref:"ReservationAppHotels",
       required:[true,"Provide the hotel of the room"]
    },

    minBaths:{
        type:Number,
        default:1
    },

    maxBaths:{
        type:Number,
        default:3
    },

    adultBeds:{
        type:Number,
        required:[true,"Beds Of the beds"]
     },
     
    childBeds:{
        type:Number,
        required:[true,"Provide the number of the beds for the childern"]
     },
     price:{
        type:Number,
        required:[true,"Provide the price of the room"]
     },
     ReservedDates:[{date:{type:Date},user:{type:mongoose.Types.ObjectId,ref:"ReservationAppUsers"}}]
})

export default mongoose.model("ReservationAppRooms",RoomSchema)