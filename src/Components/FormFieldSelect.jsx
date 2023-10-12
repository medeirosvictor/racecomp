
const FormFieldSelect = ({placeholder,optionLabel,handleSelect,values }) => {
    
    return (
       <div className="w-64">
            <label className=" mt-2 block text-sm font-medium text-gray-700">{placeholder}</label>
            <select
                onChange={e=>{
                    handleSelect(e.target.value)
                }}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            > 
                    <option value="default">{optionLabel}</option>            
                    {
                        values?.map(item =>{
                            return (<option  key={`${item?.uid}-option`} value={item.uid}>{item?.displayName}</option>)
                        })
                    }
                
            </select>
        </div>
    );
  };
  
  export default FormFieldSelect