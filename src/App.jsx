import Nav from './components/Nav.jsx'
import ParticleCanvas from './components/ParticleCanvas.jsx'
import Hero from './components/Hero.jsx'
import AboutSection from './components/AboutSection.jsx'
import SkillsSection from './components/SkillsSection.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import ChatWidget from './components/ChatWidget.jsx'

function App() {
  return (
    <>
      <ParticleCanvas />
      <Nav />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactForm />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
