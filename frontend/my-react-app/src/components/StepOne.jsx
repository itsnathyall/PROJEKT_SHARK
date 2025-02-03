const StepOne = ({ register, errors }) => {
    return (
      <div className="text-white">
        <label className="block mb-1">First Name</label>
        <input {...register("firstName", { required: "First name is required" })} className="w-full border p-2 rounded" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
  
        <label className="block mt-2 mb-1">Last Name</label>
        <input {...register("lastName", { required: "Last name is required" })} className="w-full border p-2 rounded" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
  
        <label className="block mt-2 mb-1">Email</label>
        <input {...register("email", { required: "Email is required" })} className="w-full border p-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
  
        <label className="block mt-2 mb-1">Password</label>
        <input type="password" {...register("password", { required: "Password is required" })} className="w-full border p-2 rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
  
        <label className="block mt-2 mb-1">Confirm Password</label>
        <input type="password" {...register("confirmPassword", { required: "Please confirm your password" })} className="w-full border p-2 rounded" />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>
    );
  };
  
  export default StepOne;
  
  