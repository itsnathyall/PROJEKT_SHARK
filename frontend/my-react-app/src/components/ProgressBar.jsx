const ProgressBar = ({ step, steps }) => {
    return (
      <div className="flex mb-4">
        {steps.map((_, index) => (
          <div key={index} className={`flex-1 h-2 mx-1 rounded-full ${index <= step ? "bg-red-500" : "bg-gray-300"}`} />
        ))}
      </div>
    );
  };
  
  export default ProgressBar;  