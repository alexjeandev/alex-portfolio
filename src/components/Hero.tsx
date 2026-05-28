import Globe from './Globe'


function Hero() {
    return (
        <section className="hero">
            <div className="hero-text">
                <p className="hero-tag">Portfolio • Software Engineer</p>
                <h1>Alex Jean</h1>

                <p className="hero-subtitle">
                    Junior software engineer focused on clean code, real-world projects,
                    and solving problems with modern web technologies.
                </p>

                <div className="hero-buttons">
                    <a href="#projects" className="btn primary">View Projects</a>
                    <a href="#contact" className="btn ghost">Contact Me</a>
                </div>
            </div>

            <div className="hero-globe">
                <Globe /> 
            </div>
        </section>
    )
}

export default Hero;