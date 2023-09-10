

const LikeButton = (props) => {
    const {dataHref} = props
    return (
        <div className="my-3">
            <div className="fb-like" data-href={dataHref} data-width="" data-layout="" data-action="" data-size="" data-share="true"></div>
        </div>
    )
}

export default LikeButton