import './Header.css'

const Header = () => {
    
    return (
        <div className='header'>
            <div className="headerTitle">
            <span className='headerTitleSm'>React blog app</span>
            <span className='headerTitleLg'>Blog</span>
            </div>

            <img className='headerImg' src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg" alt="" />
        </div>
    )
}

export default Header
