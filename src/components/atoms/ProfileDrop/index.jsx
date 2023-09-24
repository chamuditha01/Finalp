const ProfileDrop=()=>{
    return(
        <div>
            <div class="btn-group">
  <button style={{backgroundColor: '#000080',marginTop: '6px',height: '35px'}} type="button" class="btn btn-primary">Profile</button>
  <button style={{backgroundColor: '#000080',marginTop: '6px',height: '35px'}} type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="/Profile">Profile</a></li>
    <li><a class="dropdown-item" href="Edit">Edit Profile</a></li>
    <li><a class="dropdown-item" href="Cart">Cart</a></li>
    <li><hr class="dropdown-divider"/></li>
    <li><a class="dropdown-item" href="#">Log Out</a></li>
  </ul>
</div>
        </div>
    )
}
export default ProfileDrop;