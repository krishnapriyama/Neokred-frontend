import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import backImg from "../assets/backImg.jpeg";
import logo from "../assets/logo.png";

const Signin = () => {
  const navigateto = useNavigate();

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmpassword: "",
      dob: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      securityQ: "",
    },
    validate: (values) => {
      const error = {};

      if (!values.fullname) {
        error.fullname = "Name is Required";
      } else if (!/^[A-Za-z\s]+$/.test(values.fullname)) {
        error.fullname = "Alphabetic characters only";
      } else if (values.fullname.length > 50) {
        error.fullname = "Maximum length is 50 characters";
      }

      if (!values.email) {
        error.email = "Email is Required";
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i.test(values.email)
      ) {
        error.email = "Invalid email format";
      }

      if (!values.password) {
        error.password = "Password Required";
      } else if (
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(
          values.password
        )
      ) {
        error.password =
          "Aleast 8 characters, including at least 1 digit, 1 lowercase letter, 1 uppercase letter, and 1 special character";
      } else if (values.password !== values.confirmpassword) {
        error.confirmpassword = "Password Mismatch";
      }

      if (!values.dob) {
        error.dob = "Date of Birth is Required";
      } else {
        const isValidDate = !isNaN(new Date(values.dob));
        if (!isValidDate) {
          error.dob = "Invalid date format";
        }
      }

      if (!values.phone) {
        error.phone = "Phone Number is Required";
      } else if (!/^\d{10}$/.test(values.phone)) {
        error.phone = "Invalid phone number format (10 digits)";
      }

      if (!values.address) {
        error.address = "Address is Required";
      } else if (values.address.length > 100) {
        error.address = "Maximum length is 100 characters";
      }

      if (!values.city) {
        error.city = "City is Required";
      } else if (!/^[A-Za-z\s]{1,50}$/.test(values.city)) {
        error.city =
          "Invalid city format (alphabetic characters only, max 50 characters)";
      }

      if (!values.state) {
        error.state = "State is Required";
      }

      if (!values.zip) {
        error.zip = "Zip code is Required";
      }

      if (!values.country) {
        error.country = "Country is Required";
      }

      if (!values.securityQ) {
        error.securityQ = "Answer is Required";
      } else if (values.securityQ.length > 100) {
        error.securityQ = "Maximum length is 100 characters";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:4000/register", {
          ...values,
        });

        if (!response.data.created) {
          console.log(response.data.created, "Created False");
          if (response.data.errors) {
            const { email, password } = response.data.errors;
            if (email) {
              generateError(email);
            } else if (password) {
              generateError(password);
            }
          }
        } else {
          console.log(response.data.created, "Created True");
          navigateto("/");
        }
      } catch (error) {
        console.log(error, "Error from Axios");
      }
    },
  });

  return (
    <div className="bg-white h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Column */}
      <div className="w-full md:w-[40%] hidden md:block p-5 pr-0">
        <img
          src={backImg}
          alt="backImg"
          className="object-cover h-full rounded-2xl"
        />
        <div className="absolute top-20 left-10">
          <img src={logo} alt="logo" className="" />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-[60%] md:justify-normal justify-center flex items-center mr-7">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="m-4 md:m-10 w-full p-10 md:p-8">
            <h1 className="text-[#06070a] text-2xl md:text-xl mb-2 lg:mb-4 flex flex-col">
              Welcome{" "}
              <span className="text-[#131926] text-4xl font-bold">Sign up</span>
            </h1>

            <div className="flex gap-9 w-full text-[#4D5E80] mt-10">
              <div className="flex flex-col w-1/2">
                <label>Full name</label>
                <input
                  {...formik.getFieldProps("fullname")}
                  name="fullname"
                  type="text"
                  placeholder="John Doe"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.fullname ? (
                  <div className="text-red-500">{formik.errors.fullname}</div>
                ) : null}
              </div>
              <div className="flex flex-col w-1/2">
                <label>Email</label>
                <input
                  {...formik.getFieldProps("email")}
                  name="email"
                  type="email"
                  placeholder="allthebest@neokred.com"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="flex gap-9 w-full text-[#4D5E80] mt-5">
              <div className="flex flex-col w-1/2">
                <label>Date of birth</label>
                <input
                  {...formik.getFieldProps("dob")}
                  name="dob"
                  type="date"
                  placeholder="12/12/12"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.dob ? (
                  <div className="text-red-500">{formik.errors.dob}</div>
                ) : null}
              </div>
              <div className="flex flex-col w-1/2">
                <label>Password</label>
                <input
                  {...formik.getFieldProps("password")}
                  name="password"
                  type="password"
                  placeholder="**********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>

            <div className="flex gap-9 w-full text-[#4D5E80] mt-5">
              <div className="flex flex-col w-1/2">
                <label>Phone Number</label>
                <input
                  {...formik.getFieldProps("phone")}
                  name="phone"
                  type="text"
                  placeholder="+91-9876543210"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.phone ? (
                  <div className="text-red-500">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="flex flex-col w-1/2">
                <label>Confirm Password</label>
                <input
                  {...formik.getFieldProps("confirmpassword")}
                  name="confirmpassword"
                  type="password"
                  placeholder="**********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.confirmpassword ? (
                  <div className="text-red-500">
                    {formik.errors.confirmpassword}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full text-[#4D5E80] mt-5">
              <h1 className="text-[#26334D] text-lg font-semibold">
                Security Question
              </h1>
              <div className="flex flex-col w-1/2">
                <label>What is your School name ?</label>
                <input
                  {...formik.getFieldProps("securityQ")}
                  name="securityQ"
                  type="text"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.securityQ ? (
                  <div className="text-red-500">{formik.errors.securityQ}</div>
                ) : null}
              </div>
              <div className="w-1/2"></div>
            </div>

            <div className="w-full text-[#4D5E80] mt-5">
              <div className="flex flex-col w-full">
                <label>Address</label>
                <input
                  {...formik.getFieldProps("address")}
                  name="address"
                  type="text"
                  placeholder="********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.address ? (
                  <div className="text-red-500">{formik.errors.address}</div>
                ) : null}
              </div>
              <div className="w-1/2"></div>
            </div>

            <div className="flex gap-3 w-auto text-[#4D5E80] mt-5">
              <div className="flex flex-col w-1/4">
                <label>City</label>
                <input
                  {...formik.getFieldProps("city")}
                  name="city"
                  type="text"
                  placeholder="********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.city ? (
                  <div className="text-red-500">{formik.errors.city}</div>
                ) : null}
              </div>
              <div className="flex flex-col w-1/4">
                <label>State</label>
                <input
                  {...formik.getFieldProps("state")}
                  name="state"
                  type="text"
                  placeholder="********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.state ? (
                  <div className="text-red-500">{formik.errors.state}</div>
                ) : null}
              </div>
              <div className="flex flex-col w-1/4">
                <label>Zip code</label>
                <input
                  {...formik.getFieldProps("zip")}
                  name="zip"
                  type="number"
                  placeholder="********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.zip ? (
                  <div className="text-red-500">{formik.errors.zip}</div>
                ) : null}
              </div>
              <div className="flex flex-col w-1/4">
                <label>Country</label>
                <input
                  {...formik.getFieldProps("country")}
                  name="country"
                  type="text"
                  placeholder="********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.country ? (
                  <div className="text-red-500">{formik.errors.country}</div>
                ) : null}
              </div>
            </div>

            <div className="mt-4 md:mt-10 gap-3 flex flex-col">
              <button className="bg-[#194DFF] w-full md:w-72 lg:w-80  rounded-md px-3 py-3 text-white">
                Sign up
              </button>
              <h1 className="text-md text-[#A0ABC0]">
                Already have an account ?{" "}
                <Link to="/">
                  <span className="text-[#3361FF] text-lg">Login</span>
                </Link>
              </h1>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
