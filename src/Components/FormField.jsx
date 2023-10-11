
const FormField = ({ label, value, onChange }) => {
    
  return (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
            {label}:
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
  );
};

export default FormField