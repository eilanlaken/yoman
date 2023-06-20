
const DevcardThumbnail = ({img, firstName, lastName, handle, title}) => {

    return (
        <div className="devcard-thumbnail">
            <h4>{firstName} {lastName}</h4>
            <p>{handle}</p>
            <p>{title}</p>
        </div>
    )
}

export default DevcardThumbnail;