const captainModel = require('../models/captain.model');

module.exports.createCaptain = async (captainData) => {
    
    const { firstName, lastName, email, password, vehicle } = captainData;
    
    
    if (!firstName || !email || !password || !vehicle ||
        !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        throw new Error("All fields are required");
    }
    
    
    const captain = await captainModel.create({
        fullName: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
        password: password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });
    
    return captain;
};