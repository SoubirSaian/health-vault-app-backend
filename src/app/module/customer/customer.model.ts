import { model, Schema, models } from "mongoose";
import { ICustomer } from "./customer.interface";

const customerSchema = new Schema<ICustomer>({
    user: { 
         type: Schema.Types.ObjectId,
         required: true, 
         ref: "User" 
    },
    name: { 
        type: String, 
        required: true 
    },
    contact: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    image: { 
        type: String, 
        default: "" 
    },
    emergencyContact: { 
        type: String, 
        default: "" 
    },
    gender: { 
        type: String, 
        default: "" 
    },
    bloodGroup: { 
        type: String, 
        default: "" 
    },
    idNo: { 
        type: String, 
        default: "" 
    },
    description: { 
        type: String, 
        default: "" 
    },
    favourites: [{ 
        type: String, 
        default: "" 
    }],
    documents: [{ 
        type: String, 
        default: "" 
    }],
    dob: { 
        type: Date, 
        default: Date.now
    },
    
    
}, { timestamps: true });

const CustomerModel = models.Customer || model<ICustomer>("Customer", customerSchema);

export default CustomerModel;