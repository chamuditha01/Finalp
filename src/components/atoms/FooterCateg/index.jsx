const Category=({path,categ})=>{
    return(
        <div>
            <li>
                  <a href={path}>{categ}</a>
                </li>
        </div>
    )
}
export default Category;