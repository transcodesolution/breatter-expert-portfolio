import * as yup from "yup";

export const loginSchema = yup.object().shape({
    userName: yup.string().required(),
    password: yup.string().required(),

});


// string().min(6).minUppercase(3).minRepeating(2).minWords(2)