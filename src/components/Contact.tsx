function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p>Want to connect? Reach me at the links below.</p>

      <div className="contact-links">
        <a href="mailto:jeancyberworld@gmail.com">
          <i className="fa-solid fa-envelope"></i>
          Email
        </a>
        <a href="https://linkedin.com/in/alexjeandev" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin"></i>
          LinkedIn
        </a>
        <a href="https://github.com/AlexJeanDev" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
          GitHub
        </a>
      </div>
    </section>
  )
}

export default Contact