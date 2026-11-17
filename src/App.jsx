import React, { useState, useEffect, Suspense, Component } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import FlagshipProjects from './components/FlagshipProjects';
import GitHubExplorer from './components/GitHubExplorer';
import ExperienceEducation from './components/ExperienceEducation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { githubService } from './services/githubService';
import { CheckCircle2, X, ArrowUp } from 'lucide-react';

// Lazy-loaded modals for code splitting
const ResumeModal = React.lazy(() => import('./components/ResumeModal'));
const ProjectModal = React.lazy(() => import('./components/ProjectModal'));

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600 font-bold text-xl">
              !
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-900">Something went wrong</h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              An unexpected error occurred while rendering the application. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Scroll-to-Top FAB Component
function ScrollToTopFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-lg flex items-center justify-center hover:-translate-y-1 active:scale-95 transition-all animate-slideUp"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals state
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [toastDismissing, setToastDismissing] = useState(false);

  const showToast = (msg) => {
    setToastDismissing(false);
    setToastMessage(msg);
    setTimeout(() => {
      dismissToast();
    }, 3800);
  };

  const dismissToast = () => {
    setToastDismissing(true);
    setTimeout(() => {
      setToastMessage('');
      setToastDismissing(false);
    }, 250);
  };

  const loadRepositories = async (force = false) => {
    if (force) setIsRefreshing(true);
    try {
      const data = await githubService.getRepositories(force);
      setRepositories(data.repos);
      setIsLive(data.isLive);
      setLastSynced(data.lastSynced);
      if (force) {
        showToast(data.error 
          ? `⚠ ${data.error}` 
          : "Successfully synchronized with GitHub API!"
        );
      }
    } catch (err) {
      console.error("Error loading repositories:", err);
      showToast("Unable to reach GitHub API, offline cache loaded.");
    } finally {
      if (force) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadRepositories(false);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-transparent text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-slate-900 focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Top Navigation Header */}
        <Navbar 
          repoCount={repositories.length || 17} 
          onOpenResume={() => setResumeOpen(true)} 
        />

        <main id="main-content" className="flex-1">
          {/* Hero Section */}
          <Hero onOpenResume={() => setResumeOpen(true)} />

          {/* About Section */}
          <About />

          {/* Skills Matrix */}
          <Skills />

          {/* Flagship Production & SaaS Projects */}
          <FlagshipProjects 
            projects={repositories}
            onOpenProjectModal={(proj) => setSelectedProject(proj)}
          />

          {/* Dynamic GitHub Repositories Explorer */}
          <GitHubExplorer 
            repositories={repositories}
            onRefresh={() => loadRepositories(true)}
            isRefreshing={isRefreshing}
            lastSynced={lastSynced}
            isLive={isLive}
            onOpenProjectModal={(proj) => setSelectedProject(proj)}
          />

          {/* Work Experience, Academic Education & Achievements */}
          <ExperienceEducation />

          {/* Contact Section */}
          <Contact onShowToast={showToast} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Lazy-loaded Modals */}
        <Suspense fallback={null}>
          {/* Interactive Resume Modal */}
          <ResumeModal 
            isOpen={resumeOpen} 
            onClose={() => setResumeOpen(false)} 
          />

          {/* Project Architecture Deep Dive Modal */}
          <ProjectModal 
            project={selectedProject} 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </Suspense>

        {/* Scroll to Top FAB */}
        <ScrollToTopFAB />

        {/* Floating Toast Notification with Dismiss */}
        {toastMessage && (
          <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-emerald-500/50 text-slate-800 text-xs sm:text-sm font-semibold shadow-xl shadow-emerald-500/15 ${
            toastDismissing ? 'animate-fadeOut' : 'animate-slideUp'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
            <button
              onClick={dismissToast}
              className="ml-1 p-0.5 rounded text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
