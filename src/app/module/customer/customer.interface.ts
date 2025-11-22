import { Types } from "mongoose";

export interface ICustomer {
  user : Types.ObjectId
  name : string
  email :string
  contact: string
  emergencyContact : string
  image : string
  dob : Date
  gender :string
  bloodGroup :string
  address :string
  idNo :string
  favourites : string[]
  description :string
  documents : string[]
}