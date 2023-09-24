const FormItems=({for1,name,type,id,placeholder})=>{
    return(
        <div>
            <div class="col-md-12">
                <label style={{color: '#000080'}} for={for1} class="form-label">{name}</label>
                <input type={type} class="form-control" id={id} placeholder={placeholder}/>
            </div>
        </div>
    )
}
export default FormItems;