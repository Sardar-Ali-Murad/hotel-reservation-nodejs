import express from "express"

let router=express.Router()

import {createHotel,deleteHotel,updateHotel,getAllHotels,getSingleHotel,getHotelByRegion} from "../controllers/HotelController.js"

import {auth,isAdmin} from "../middleware/auth.js"


router.route("/").post(auth,isAdmin,createHotel)

router.route("/getHotelByRegion").get(getHotelByRegion)

router.route("/getAllHotels").get(getAllHotels)


router.route("/:hotelId").delete(auth,isAdmin,deleteHotel).patch(auth,isAdmin,updateHotel).get(getSingleHotel)



export default router