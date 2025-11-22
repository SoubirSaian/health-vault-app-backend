import { Types } from "mongoose";

export interface IProvider {
  user : Types.ObjectId
  name :string
  email : string
  specialist: string
  idNo :string
  medicalLicenseNo: string
  yearsOfExperience: number
  affliatedHospitals: string[]
  address: string
  language: string
  institution: string
  dateSlot: Date
  timeSlot: Date
  
}