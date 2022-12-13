import mongoose from "mongoose"

let HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide the hotel name"]
    },
    title: {
        type: String,
        required: [true, "Provide the hotel title"]
    },
    description: {
        type: String,
        required: [true, "Provide the hotel description"]
    },
    region: {
        type: String,
        enum: ["Alabama", "Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana",  "Iowa","Kansas", "Kentucky","Louisiana"],
        required:[true,"Provide the state in which the hotel is located"]
    },
    images:{
       type:Array,
       required:[true,"Give the images related to the hotel"]
    },
    awards:{
        type:Array,
        default:[]
    },
    ranking:{
        type:String,
        required:[true,"Provide the ranking of the hotel"]
    },
    class:{
        type:String,
        enum:["UpperClass","LoweClass","MiddleClass"]
    },
    maxNoOfRooms:{
        type:Number,
        required:[true,"Provide the maximun number of the rooms "]
    }
},{timestamps:true})

export default mongoose.model("ReservationAppHotels",HotelSchema)