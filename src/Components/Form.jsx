import { translation } from "../constants/translation/en"


 const  Form = ({ title, handleCancel,handleSubmit , styles,children}) => {

        return (
            <div  className={`flex flex-col content-start flex-wrap pt-18 w-96 h-3/5 ${styles}`} >
                <h2 className="text-4xl h-20">{title}</h2>
                {children}
                <div className="flex justify-center content-center space-x-4 items-center w-full ">
                    <button onClick = { ()=>handleSubmit()}className='bg-white rounded-lg shadow-md px-4 py-2 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50'>
                        {translation.SUBMIT}
                    </button>
                    <button onClick ={()=>handleCancel()} className='mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-red-300'>
                        {translation.CANCEL}
                    </button>
                </div>
            </div>
        )
    
}
export default Form