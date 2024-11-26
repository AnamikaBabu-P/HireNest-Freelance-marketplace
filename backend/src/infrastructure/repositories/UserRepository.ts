import { UserModel } from "../models/UserModel";

export const UserRepository = {

    findUserByEmail: async (email: string) => UserModel.findOne({ email }),
    findUserByRole: async (role: 'client' | 'freelancer' | 'admin')  =>  UserModel.findOne({role}),
    createUser: async (userData: any) => new UserModel(userData).save(),
    updateUser: async (id: string, updates: any) => UserModel.findByIdAndUpdate(id, updates, {new: true})

};
