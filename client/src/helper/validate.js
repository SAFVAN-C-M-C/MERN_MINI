export const validateEmail=(data)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
}
export const validatePassword=(data)=>{
    
    return data.length>8
}
export const validateUsername=(data)=>{
    return data.trim()!==''
}
export const validateAddress=(data)=>{
    return data.trim()!==''
}
export const validatePhone=(data)=>{
    const phoneRegex = /^\d{10}$/;

  // Test if the phone number matches the regular expression
  return phoneRegex.test(data);
}
