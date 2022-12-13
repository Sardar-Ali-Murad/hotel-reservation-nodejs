import express from "express"
let router=express.Router()

import {auth,isAdmin} from "../middleware/auth.js"

import {createRoom,deleteRoom,updateRoom,getSingleRoom,reserveRoom,getRoomsOfHotel,getAllRooms} from "../controllers/RoomController.js"

router.route("/").post(auth,isAdmin,createRoom)
router.route("/getAllRooms").get(getAllRooms)

router.route("/hotelRooms/:HotelId").get(getRoomsOfHotel)

router.route("/:RoomId").get(getSingleRoom).delete(auth,isAdmin,deleteRoom).patch(auth,isAdmin,updateRoom).post(auth,reserveRoom)


export default router