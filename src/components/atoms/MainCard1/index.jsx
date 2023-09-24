const MainCard1=({path,title,content})=>{
    return(
        <div>
            <div class="col">
    <div style={{borderWidth: '10px',marginTop: '30px',borderRadius: '30px',borderTopStyle:'solid',borderTopColor:'	#000080',borderTopLeftRadius:'30px',borderTopRightRadius:'30px'}} class="card">
      
      <div  class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{content}</p>
        <a style={{backgroundColor: '	#000080', color: 'white'}} href={path} class="btn btn-primary">Click Here To Learn More...</a>
      </div>
    </div>
  </div>
        </div>
    )
}
export default MainCard1;