


import * as yup from "yup";


   

export const validationSchema=yup.object({


      partname:yup.string().required("* this fild is required"),
      partcode:yup.string().required(" *this filed is required"),
      customername:yup.string().required(" *this filed is required"),
      customernumber:yup.string().required(" *this filed is required"),
      warrantystatus :yup.string().required(" *this filed is required"),
      company:yup.string().required(" *this filed is required"),
      




})