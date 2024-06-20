


import *as yup from "yup";





export const validationSchema=yup.object({


      email:yup.string().email(" *enter valide email id ").required(" *this filed is required"),
      password:yup.string().min(4, " *enter minimum 4 char  ").required(" *this filed is required")
      
      

})