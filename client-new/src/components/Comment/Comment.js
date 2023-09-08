import './Comment.scss'

const Comment = (props) => {
    const {dataHref, width} = props
    return (
        <div className="comment-wrapper">
            <div className="container">
                <div className='wrapper'>
                    <div className="my-3">
                        <div class="fb-comments" data-href={dataHref} data-width={width} data-numposts="5"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment