const Divider = ({cssClasses = ""}) => {
    const classes = "bg-blue-900 pb-0.5 mb-4 " + cssClasses;

    return (
        <hr className={classes}/>
    );
}

export default Divider;