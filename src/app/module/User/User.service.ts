import ApiError from "../../../error/ApiError";
import { Express } from "express";
import {  IChangePassword, IUser } from "./User.interface";
import UserModel from "./User.model";
import { JwtPayload } from "jsonwebtoken";
import deleteOldFile from "../../../utilities/deleteFile";
import { IJwtPayload } from "../../../interface/jwt.interface";



const updateUserProfile = async (userDetails: IJwtPayload,file: Express.Multer.File | undefined,payload: Partial<IUser>) => {
  const { userId } = userDetails;

  // Fetch user and profile in parallel
  const user = await UserModel.findById(userId);
   

  if (!user ) {
    throw new ApiError(404, "Profile not found to update.");
  }

  // Update fields
  const { name, phone } = payload;

  if (name) {
    user.name = name;
  }

  if (phone) {
    user.phone = phone;
  }

  // Handle image update
  if (file) {

    if (user.image) deleteOldFile(user.image as string);

    user.image = `uploads/profile-image/${file.filename}`;
  }

  // Save both
  await user.save();

  // Return a unified response
  return {
      name: user.name,
      email: user.email,
  };
};


// const addLocationService = async (userDetails: JwtPayload,payload: IAddLocation) => {
//     // Service logic goes here
//     const {profileId,role} = userDetails;
//    const {location} = payload;

//     let profile : ICustomer| ISupplier | null = null;

//     switch (role) {

//         case ENUM_USER_ROLE.CUSTOMER:
//              profile = await CustomerModel.findByIdAndUpdate(profileId, {location: location}, {new: true});
//             break;

//         case ENUM_USER_ROLE.SUPPLIER:
//             profile = await SupplierModel.findByIdAndUpdate(profileId, {location: location}, {new: true});
//             break;
             
//         default:{
//             // const _exhaustiveCheck: never = role;
//             throw new ApiError(400, "Invalid user role");
//         }

//     }

//     if(!profile){
//         throw new ApiError(500,'Failed to add location in the profile');
//     }  

//     return { name:profile.name,email:profile.email, location: profile.location };
// }


// const addBankDetailService = async (userDetails: JwtPayload,payload: IBankDetail) => {
//     // Service logic goes here
//     const {profileId,role} = userDetails;
//   // console.log(payload);

//     let profile : ICustomer| ISupplier | null = null;

//     switch (role) {
//         case ENUM_USER_ROLE.CUSTOMER:
//              profile = await CustomerModel.findByIdAndUpdate(profileId,{
//               $set: payload
//              } , {new: true});
//             break;

//         case ENUM_USER_ROLE.SUPPLIER:
//             profile = await SupplierModel.findByIdAndUpdate(profileId, {
//               $set: payload
//             }, {new: true});
//             break;
             
//         default:{
//             // const _exhaustiveCheck: never = role;
//             throw new ApiError(400, "Invalid user role");
//         }

//     }
//     // console.log(profile);
//     if(!profile){
//         throw new ApiError(500,'Failed to add location in the profile');
//     }  

//     return { name:profile.name,email:profile.email, location: profile.location };
// }

const changePasswordService = async (userDetails: IJwtPayload, payload: IChangePassword) => {
    // Service logic goes here
    const { userId } = userDetails;
    const { oldPassword, newPassword } = payload;

    const user =  await UserModel.findById(userId).select('+password');
    if(!user){
        throw new ApiError(404,'User not found');
    }

    // const isPasswordMatched = await user.isPasswordMatched(oldPassword);
    // if(!isPasswordMatched){
    //     throw new ApiError(400,'Old password is incorrect');
    // }
    if(user.password !== oldPassword){
        throw new ApiError(400,'Old password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return null;
}

const UserServices = {
    updateUserProfile, 
    // addLocationService,
    // addBankDetailService,
    changePasswordService 
};
export default UserServices;