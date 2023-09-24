const NavItem=({id,name,path})=>{
    return(
        <div>
            <li class="nav-item">
          <a id={id} class={"nav-link active"} aria-current="page" href={path}>{name}</a>
        </li>
        </div>
    )
}
export default NavItem;