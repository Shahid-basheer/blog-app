import './About.css'

const About = () => {
    console.log(window.location.origin);
    return (
      <>
        <div className="about">
          <div id="about-child-1">
            <img src={"/Images/lap.png"} />
          </div>
          <div id="about-child-2"></div>
        </div>
        <div id="center-div">
          <div id="center-div-child-1">
            <div>
              <span>About Us</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi non quis exercitationem culpa nesciunt nihil aut
                nostrum explicabo reprehenderit optio amet ab temporibus
                asperiores quasi cupiditate. Voluptatum ducimus voluptates
                voluptas. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                
              </p>
              <button>Read More</button>
            </div>
          </div>
        </div>
      </>
    );
}

export default About
