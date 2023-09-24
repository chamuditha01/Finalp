const Menu=({path,name})=>{
    return(
        <div>
           <li>
                    <a className="dropdown-item" href={path}>
                      {name}
                    </a>
                  </li> 
        </div>
    )
}
export default Menu;