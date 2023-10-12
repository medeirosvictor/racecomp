const FormFieldOptions = ({options }) => {
    return (
        options.map(item => <option  key={`${item?.uid}-option`} value={item.uid}>{item?.displayName}</option>)
    );
  };
  
  export default FormFieldOptions