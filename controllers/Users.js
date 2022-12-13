import Auth from "../models/Auth.js"
import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"


let Register=async (req,res)=>{
    let {name,password,email}=req.body

    if(!name || !password || !email){
        throw new BadRequestError("Please Provide All Credentials")
    }

    let emailAlreadyExists=await Auth.findOne({email})

    if(emailAlreadyExists){
        throw new BadRequestError("Email Already Exists")
    }

    let isAdmin=await Auth.countDocuments({})

    if(isAdmin===0){
        req.body.role="admin"
    }

    let user=await Auth.create({...req.body})

    let token =user.createJWT()

    res.status(StatusCodes.CREATED).json({
        user:{name,email},
        token:token
    })
}



let Login=async (req,res)=>{
    let {password,email}=req.body
    
    if(!password || !email){
        throw new BadRequestError("Please Provide All Credentials")
    }
    
    let user=await Auth.findOne({email})
    if(!user){
        throw new BadRequestError("User Does Not Exists")
    }

    let isAdmin=await Auth.countDocuments({})
    console.log(isAdmin)

    let isPasswordCorrect=await user.comparePassword(password)
    
    if(!isPasswordCorrect){
        throw new BadRequestError('Password is not correct')
    }
   
    
    let token =user.createJWT()
    
    res.status(StatusCodes.CREATED).json({
        user:{name:user.name,email},
        token:token

    })
    
}


const deleteUser=async (req,res)=>{
    let {userId}=req.params
    let User=await Auth.findOne({_id:userId})
    if(!User){
        throw new NotFoundError("The User Not Exists")
    }

    let currentUser=await Auth.findOne({_id:req.user.userId})
    if(currentUser.role!=="admin"){
        throw new UnAuthenticatedError("You cannot do this action")
    }
    
    await User.remove()

    res.status(StatusCodes.OK).json({User,msg:'The User Id Deleted Successfully'})

}


const getAllUsers=async (req,res)=>{
    let currentUser=await Auth.findOne({_id:req.user.userId})
    if(currentUser.role!=="admin"){
        throw new UnAuthenticatedError("You cannot do this action")
    }
    
    let Users=await Auth.find({})

    res.status(StatusCodes.OK).json({Users})

}

const getCurrentUser=async (req,res)=>{
    let User=await Auth.findOne({_id:req.user.userId})
    res.status(StatusCodes.OK).json({User})
}

const updateUser=async (req,res)=>{
    let currentUser=await Auth.findOne({_id:req.user.userId})
    let {name,email,password}=req.body

    if(!name || !email || !password){
        throw new BadRequestError("Please Providce the name email and the password to proceed")
    }

    currentUser.name=name
    currentUser.email=email
    currentUser.password=password

    await currentUser.save()

    res.status(StatusCodes.OK).json({currentUser})
}




export {Register,Login,deleteUser,updateUser,getAllUsers,getCurrentUser}