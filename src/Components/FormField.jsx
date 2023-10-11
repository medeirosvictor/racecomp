
const FormField = ({ label,placeholder, value, onChange }) => {
    
  return (
    <div className="mb-4">
        <label className=" font-bold m-2 text-xl block text-gray-700 " htmlFor={label}>
            {label}:
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id={label}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
  );
};

export default FormField