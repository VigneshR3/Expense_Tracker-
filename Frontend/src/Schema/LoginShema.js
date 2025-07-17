import * as Yup from "yup";
const LoginSchema = Yup.object({
  email: Yup.string().email().required("email is required"),

  password: Yup.string().matches(
    /^[A-Z]{2}[a-z]{4}[0-9]{3}$/,
    "Password must start with an uppercase letter, followed by 4 lowercase letters, and end with 3 number"
  ),
});
export default LoginSchema;
