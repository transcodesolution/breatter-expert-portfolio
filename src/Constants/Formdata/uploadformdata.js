import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, 'Must be exactly 5 digits'),
    address: yup.string().required(),
    dob: yup.date().required(),
    accountNumber: yup.number().required(),
    ifsc: yup.string().required(),
    photoIdentity: yup.string().required(),
    addressProof: yup.string().required(),
    cancelCheque: yup.string().required(),
    degreeCertificate: yup.string().required(),
 

}); 