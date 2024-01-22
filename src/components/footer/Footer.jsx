import React from 'react'

const Footer = () => {
    return (
        <footer style={styles}>
            copyright 2023 &copy;
        </footer>
    )
}

const styles = {
    color: "var(--white-color)",
    fontSize: "21pz",
    backgroundColor: "var(--blue-color)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px"
}

export default Footer
