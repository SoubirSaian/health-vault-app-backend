import { model, models, Schema } from "mongoose";
import { IProvider } from "./provider.interface";

const providerSchema = new Schema<IProvider>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    specialist: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    medicalLicenseNo: { type: String, default: "" },
    yearsOfExperience: { type: Number, default: 0 },
    language: { type: String, default: "" },
    institution: { type: String, default: "" },
    dateSlot: { type: Date, default: Date.now },
    timeSlot: { type: Date, default: Date.now },
    
}, { timestamps: true });

const ProviderModel = models.Provider || model<IProvider>("Provider", providerSchema);
export default ProviderModel;