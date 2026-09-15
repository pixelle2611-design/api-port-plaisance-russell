const bcrypt = require("bcryptjs");
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
const estCorrect = async (motdepasseenclair, hashedPasswordstockeenbase) => {
    return await bcrypt.compare(motdepasseenclair, hashedPasswordstockeenbase);
};

const User = require("../models/user");

const createUser = async (data) => {
    try {
        data.password = await hashPassword(data.password);
        const user = new User(data);
        return await user.save();
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw error;
    }
};

const updateUser = async (email, data) => {
    try {
        if (data.password) {
            data.password = await hashPassword(data.password);
        }
        return await User.findOneAndUpdate({ email }, data, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (email) => {
    try {
        return await User.findOneAndDelete({ email });
    } catch (error) {
        throw error;
    }
};

module.exports = { createUser, estCorrect, getAllUsers, getUserByEmail, updateUser, deleteUser };