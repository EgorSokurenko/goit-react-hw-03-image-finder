export default function  Button({onLoadMore}) {
    return(
        <button onClick={()=>onLoadMore()} className="ButtonLoad" type='button'>Load More</button>
    )
}