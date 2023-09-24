import './Card1.css';

const Card1=({title1,content1,path})=>{
    return(
        <div>
            <div style={{backgroundColor: '#a7b6f9' ,opacity: '0.9',border:'0px',borderBottomRightRadius: '30px',borderBottomLeftRadius: '30px'}} class="card-body" >
        <h5 class="card-title">{title1}</h5>
        <p class="card-text">{content1}</p>
        <a style={{backgroundColor: '	#000080', color: 'White'}} href={path} class="btn btn-primary">View Store</a>
      </div>
        </div>
    )
}
export default Card1