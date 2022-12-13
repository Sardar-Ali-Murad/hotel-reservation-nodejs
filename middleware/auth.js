import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'
import Auth from '../models/Auth.js'

UnAuthenticatedError
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    let user=await Auth.findOne({_id:payload.userId})
    req.user = { userId: payload.userId,role:user.role }

    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}


const isAdmin=async (req,res,next)=>{
    if(req.user.role!=="admin"){
        throw new UnAuthenticatedError("Soory You are not an admin")
    }

    next()
}

// const isAdmin = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         throw new UnAuthenticatedError(
//           'Unauthorized to access this route'
//         );
//       }
//       next();
//     };
//   };
export {auth,isAdmin}
