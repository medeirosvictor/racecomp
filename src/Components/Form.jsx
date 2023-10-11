

 const  Form = ({ title,children , styles}) => {

        return (
            <div  className={`flex flex-row  content-start flex-wrap pt-18 w-96 h-3/5 ${styles}`} >
                <h2 className="text-4xl mb-22  h-24">{title}</h2>
                {children}
            </div>
        )
    
}
export default Form