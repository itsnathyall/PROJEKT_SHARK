const StepTwo = ({ register, errors }) => {
    return (
      <div className="text-white">
        <label className="block mb-1">Gender</label>
        <select {...register("gender", { required: "Please select a gender" })} className="w-full border p-2 rounded">
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
  
        <label className="block mt-2 mb-1">Favorite Book / Writing Style / Movie</label>
        <input {...register("favorites")} className="w-full border p-2 rounded" />
  
        <label className="block mt-2 mb-1">Which artist inspires you the most?</label>
        <input {...register("artist")} className="w-full border p-2 rounded" />
  
        <label className="block mt-2 mb-1">Preferred Mode</label>
        <select {...register("mode")} className="w-full border p-2 rounded">
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
  
        <label className="block mt-2 mb-1">Pick a side: Chaos or Order?</label>
        <select {...register("side")} className="w-full border p-2 rounded">
          <option value="chaos">Chaos</option>
          <option value="order">Order</option>
        </select>
      </div>
    );
  };
  
  export default StepTwo;
  