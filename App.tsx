import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FolderKanban,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Moon,
  Search,
  Send,
  Sparkles,
  SunMedium,
  X,
} from 'lucide-react'
import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react'
import { jsPDF } from 'jspdf'

type ThemeMode = 'dark' | 'light'
type ProjectStatus = 'Completed' | 'In Progress'

type Project = {
  id: string
  title: string
  category: string
  status: ProjectStatus
  featured: boolean
  summary: string
  description: string
  technologyTags: string[]
  githubUrl: string
  demoUrl: string
  reportUrl: string
  architecture: string[]
}

type SkillGroup = {
  name: string
  icon: ReactNode
  items: string[]
}

type Repo = {
  name: string
  description: string
  html_url: string
}

const profile = {
  name: 'Naveen Santhosh',
  headline: 'AI & Data Science Engineer | Machine Learning | Data Analytics',
  intro:
    'I am an AI and data-focused developer who enjoys building practical machine learning and analytics experiences that turn real-world problems into clear, usable solutions.',
  email: 'naveen.santhosh.ai@gmail.com',
  location: 'Coimbatore, Tamil Nadu',
  availability: 'Open to internships and entry-level opportunities in AI, ML, Data Science, and Analytics',
  github: 'https://github.com/yourusername',
  linkedin: 'https://www.linkedin.com/in/yourprofile',
}

const skillGroups: SkillGroup[] = [
  {
    name: 'Programming',
    icon: <Code2 className="h-5 w-5" />,
    items: ['Python', 'Java', 'SQL'],
  },
  {
    name: 'AI & Machine Learning',
    icon: <Sparkles className="h-5 w-5" />,
    items: ['Scikit-learn', 'CNN', 'Model evaluation', 'Deep learning fundamentals'],
  },
  {
    name: 'Computer Vision',
    icon: <FolderKanban className="h-5 w-5" />,
    items: ['OpenCV', 'YOLO', 'Object detection', 'Video processing'],
  },
  {
    name: 'Data Science',
    icon: <BarChart3 className="h-5 w-5" />,
    items: ['NumPy', 'Pandas', 'Data cleaning', 'EDA', 'Data visualization'],
  },
  {
    name: 'Analytics & BI',
    icon: <BarChart3 className="h-5 w-5" />,
    items: ['Power BI', 'DAX', 'Power Query', 'KPI dashboards'],
  },
  {
    name: 'Web Development',
    icon: <Code2 className="h-5 w-5" />,
    items: ['HTML', 'CSS', 'JavaScript', 'Flask'],
  },
  {
    name: 'Databases & Tools',
    icon: <FolderKanban className="h-5 w-5" />,
    items: ['SQLite', 'Git', 'GitHub', 'VS Code'],
  },
]

const projects: Project[] = [
  {
    id: 'crime-detection',
    title: 'Crime Detection Using Camera with Machine Learning',
    category: 'Computer Vision',
    status: 'Completed',
    featured: true,
    summary:
      'A real-time surveillance analytics project that identifies suspicious activity using camera feeds and object detection.',
    description:
      'This project focuses on detection, alerting, and structured logging for video-based monitoring. It combines YOLO object detection, OpenCV preprocessing, Flask APIs, and SQLite storage to simulate a practical security workflow.',
    technologyTags: ['YOLO', 'OpenCV', 'Flask', 'SQLite', 'Computer Vision'],
    githubUrl: 'https://github.com/yourusername/crime-detection-using-camera',
    demoUrl: 'https://your-demo-link.example',
    reportUrl: 'https://your-report-link.example',
    architecture: [
      'Video input from camera stream or recorded footage',
      'OpenCV preprocessing and frame-level analysis',
      'YOLO object detection for identifying people, vehicles, and relevant objects',
      'Flask-based application layer with result handling',
      'SQLite database for logging detections and relevant metadata',
    ],
  },
  {
    id: 'power-bi-dashboard',
    title: 'Data Analytics and Power BI Dashboard',
    category: 'Analytics & BI',
    status: 'Completed',
    featured: true,
    summary:
      'A business intelligence project with data cleaning, KPI design, and interactive reporting using Power BI.',
    description:
      'This project demonstrates structured data preparation and business insight communication through dashboard narratives, KPI metrics, and reporting workflows relevant to decision support.',
    technologyTags: ['Power BI', 'Power Query', 'DAX', 'KPI Dashboard'],
    githubUrl: 'https://github.com/yourusername/powerbi-dashboard-project',
    demoUrl: 'https://your-demo-link.example',
    reportUrl: 'https://your-report-link.example',
    architecture: [
      'Dataset import and cleaning in Power Query',
      'Data modeling and KPI logic using DAX',
      'Dashboard visuals for operational trend analysis',
      'Business insight presentation and report storytelling',
    ],
  },
  {
    id: 'ml-project',
    title: 'Machine Learning Project',
    category: 'Machine Learning',
    status: 'In Progress',
    featured: false,
    summary:
      'A reusable template for classification or prediction work with model training, evaluation, and documentation.',
    description:
      'This project can be adapted for specific problem statements, datasets, and metrics. It is designed to support a clear train-evaluate-report workflow for machine learning problem-solving.',
    technologyTags: ['Scikit-learn', 'Pandas', 'NumPy', 'Model evaluation'],
    githubUrl: 'https://github.com/yourusername/ml-project-template',
    demoUrl: 'https://your-demo-link.example',
    reportUrl: 'https://your-report-link.example',
    architecture: [
      'Problem definition and dataset objective mapping',
      'Data preprocessing and feature preparation',
      'Model training and validation',
      'Evaluation using task-appropriate metrics',
      'Documentation of assumptions and future improvements',
    ],
  },
  {
    id: 'ai-project',
    title: 'Additional AI or Data Science Project',
    category: 'Deep Learning',
    status: 'In Progress',
    featured: false,
    summary:
      'A flexible project space for future AI experiments, vision work, or advanced analytics solutions.',
    description:
      'This project card is intentionally editable so new work can be added as the portfolio grows. It can represent deep learning, exploratory data analysis, or applied AI work.',
    technologyTags: ['Python', 'OpenCV', 'Data Analysis', 'AI Pipeline'],
    githubUrl: 'https://github.com/yourusername/ai-project',
    demoUrl: 'https://your-demo-link.example',
    reportUrl: 'https://your-report-link.example',
    architecture: [
      'Define the project goal and success criteria',
      'Collect or prepare the dataset',
      'Build the analysis or model pipeline',
      'Document outcomes, constraints, and future opportunities',
    ],
  },
]

const timeline = [
  {
    kind: 'Education',
    title: 'B.Tech in Artificial Intelligence and Data Science',
    date: 'Ongoing',
    details: 'Focused on AI fundamentals, machine learning, analytics, and applied problem solving.',
  },
  {
    kind: 'Internship',
    title: 'Data Analytics with Power BI',
    date: 'NEXTSKILL TECHNOLOGIES PVT LTD, Coimbatore',
    details: 'Worked with data preparation, reporting workflows, dashboard analysis, and business insight generation.',
  },
  {
    kind: 'Project',
    title: 'Crime Detection Using Camera with Machine Learning',
    date: 'Computer vision and AI project',
    details: 'Built a project pipeline using YOLO, OpenCV, Flask, and SQLite for practical surveillance analysis.',
  },
]

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

const fallbackRepos: Repo[] = [
  {
    name: 'Portfolio Website',
    description: 'A responsive professional portfolio built with React, TypeScript, and Tailwind CSS.',
    html_url: 'https://github.com/yourusername/portfolio-website',
  },
  {
    name: 'Power BI Dashboard Case Study',
    description: 'Business intelligence dashboard project with KPI analysis and reporting insights.',
    html_url: 'https://github.com/yourusername/power-bi-dashboard-case-study',
  },
  {
    name: 'AI Project Sandbox',
    description: 'Exploratory work for machine learning and data science experiments in Python.',
    html_url: 'https://github.com/yourusername/ai-project-sandbox',
  },
]

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    return savedTheme === 'light' ? 'light' : 'dark'
  })
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [githubRepos, setGithubRepos] = useState<Repo[]>([])
  const [loadingRepos, setLoadingRepos] = useState(true)
  const [githubError, setGithubError] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const categories = useMemo(() => ['All', ...new Set(projects.map((project) => project.category))], [])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      const search = searchTerm.toLowerCase()
      const matchesSearch =
        project.title.toLowerCase().includes(search) ||
        project.summary.toLowerCase().includes(search) ||
        project.technologyTags.some((tag) => tag.toLowerCase().includes(search))

      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection?.target.id) {
          setActiveSection(visibleSection.target.id)
        }
      },
      { threshold: [0.2, 0.4, 0.6] },
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => sectionObserver.observe(section))

    return () => sectionObserver.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalScrollable > 0 ? (window.scrollY / totalScrollable) * 100 : 0
      setScrollProgress(progress)
      setShowBackToTop(window.scrollY > 320)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/naveen-santhosh/repos?per_page=6&sort=updated')

        if (!response.ok) {
          throw new Error('GitHub API unavailable at the moment.')
        }

        const data = (await response.json()) as Array<{ name: string; description: string | null; html_url: string }>
        const mappedRepos = data.map((repo) => ({
          name: repo.name,
          description: repo.description ?? 'No description provided yet.',
          html_url: repo.html_url,
        }))

        setGithubRepos(mappedRepos)
      } catch {
        setGithubError('GitHub API is not available right now, so a fallback list is being shown instead.')
        setGithubRepos(fallbackRepos)
      } finally {
        setLoadingRepos(false)
      }
    }

    void loadGitHubRepos()
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Please complete the name, email, and message fields before submitting.' })
      return
    }

    const hasValidEmail = /\S+@\S+\.\S+/.test(formData.email)
    if (!hasValidEmail) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    setFormStatus({
      type: 'success',
      message:
        'Form validated successfully. Connect this form to a backend or email provider to send messages in production.',
    })
    setFormData({ name: '', email: '', project: '', message: '' })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setFormStatus({ type: 'success', message: 'Email address copied to your clipboard.' })
    } catch {
      setFormStatus({ type: 'error', message: 'Copy failed. Please copy the email manually from the contact section.' })
    }
  }

  const createResumePdf = () => {
    const doc = new jsPDF()
    doc.setFontSize(22)
    doc.text(profile.name, 14, 20)
    doc.setFontSize(11)
    doc.text(profile.headline, 14, 28)
    doc.text(profile.email, 14, 36)
    doc.text(profile.location, 14, 42)

    doc.setFontSize(14)
    doc.text('Summary', 14, 58)
    doc.setFontSize(10)
    const summaryLines = doc.splitTextToSize(
      'AI and data-focused engineering student with a practical interest in machine learning, analytics, and business intelligence projects.',
      180,
    )
    doc.text(summaryLines, 14, 66)

    doc.setFontSize(14)
    doc.text('Education', 14, 90)
    doc.setFontSize(10)
    doc.text('B.Tech in Artificial Intelligence and Data Science', 14, 98)
    doc.text('Skills: Python, Java, SQL, NumPy, Pandas, Scikit-learn, OpenCV, YOLO, Flask, Power BI, DAX, HTML, CSS, JavaScript', 14, 106)

    doc.setFontSize(14)
    doc.text('Experience', 14, 122)
    doc.setFontSize(10)
    doc.text('Data Analytics with Power BI Internship | NEXTSKILL TECHNOLOGIES PVT LTD, Coimbatore', 14, 130)
    doc.text('Responsibilities included working with Power Query, DAX, dashboards, and business reporting workflows.', 14, 138)

    doc.setFontSize(14)
    doc.text('Portfolio Note', 14, 154)
    doc.setFontSize(10)
    doc.text('This resume template is editable and should be updated with final details before job applications.', 14, 162)

    doc.save('Naveen-Santhosh-Resume.pdf')
  }

  const exportPortfolioPdf = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Naveen Santhosh | Portfolio Snapshot', 14, 20)
    doc.setFontSize(11)
    doc.text('AI & Data Science Engineer | Machine Learning | Data Analytics', 14, 30)
    doc.text('Professional focus: practical AI, machine learning, and data-driven product thinking.', 14, 38)

    doc.setFontSize(13)
    doc.text('Featured Projects', 14, 56)
    doc.setFontSize(10)
    filteredProjects.slice(0, 3).forEach((project, index) => {
      const y = 66 + index * 24
      doc.text(`${index + 1}. ${project.title}`, 14, y)
      doc.text(project.summary, 16, y + 7, { maxWidth: 170 })
    })

    doc.text('This portfolio snapshot is intended for recruiter-facing previews and can be edited further.', 14, 160)
    doc.save('Naveen-Portfolio-Snapshot.pdf')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <div className="fixed inset-x-0 top-0 z-50 h-1.5 bg-slate-200/40 dark:bg-slate-800/60">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-slate-100/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a href="#home" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 font-bold text-slate-950">
                NS
              </span>
              Naveen Santhosh
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-cyan-500 dark:text-cyan-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                className="rounded-full border border-slate-300 bg-white p-2.5 text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 md:hidden"
                onClick={() => setMobileMenuOpen((value) => !value)}
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="border-t border-slate-200 bg-white/95 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        <main>
          <section id="home" className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),transparent_30%)]" />
            <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-700 dark:text-cyan-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Available for internships and entry-level roles
                </div>

                <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                  {profile.name}
                </h1>

                <div className="mt-5 min-h-[2.6rem] text-xl font-semibold text-slate-600 dark:text-slate-300 sm:text-2xl">
                  <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-400 bg-clip-text text-transparent">
                    AI & Data Science Engineer | Machine Learning | Data Analytics
                  </span>
                </div>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {profile.intro}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
                  >
                    View My Projects <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={createResumePdf}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <Download className="h-4 w-4" /> Download Resume
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <Mail className="h-4 w-4" /> Contact Me
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                    <GitBranch className="h-4 w-4" /> GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                    <BriefcaseBusiness className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
                <div className="absolute -left-10 top-5 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="absolute -right-10 bottom-10 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/70 p-5 shadow-glow backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      Profile
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" /> Available
                    </span>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 text-white dark:border-slate-700">
                    <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 text-3xl font-black text-slate-950">
                      NS
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="h-4 w-4 text-cyan-300" />
                        {profile.location}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <BriefcaseBusiness className="h-4 w-4 text-violet-300" />
                        {profile.availability}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/10 dark:text-cyan-300">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">About Me</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Building practical AI and data solutions</h2>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                  I am a B.Tech student specializing in Artificial Intelligence and Data Science, with a strong interest in machine learning, data analytics, and building tools that connect insights to useful outcomes. My learning is rooted in applied problem solving, experimentation, and presenting results in a clear and business-friendly way.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Education</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">B.Tech in AI & Data Science</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Internship</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">Data Analytics with Power BI</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Career interests</h3>
                <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> AI and machine learning product development</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> Data storytelling and business intelligence</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> Data cleaning, exploratory analysis, and decision support</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {timeline.map((entry, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">{entry.kind}</p>
                  <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{entry.title}</h3>
                  <p className="mt-2 text-sm font-medium text-violet-500">{entry.date}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{entry.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="skills" className="bg-slate-200/40 py-16 dark:bg-slate-900/70">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-300">
                    <Code2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Skills</p>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Technical skill dashboard</h2>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {skillGroups.map((group) => (
                  <div key={group.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-300">
                        {group.icon}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{group.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-300">
                  <FolderKanban className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">Projects</p>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Featured project gallery</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={exportPortfolioPdf}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-emerald-400 hover:text-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                Export PDF <Download className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  type="search"
                  placeholder="Search projects or technologies"
                  className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                No projects match the current search. Try a different keyword or choose another category.
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {filteredProjects.map((project) => (
                  <motion.article
                    key={project.id}
                    layout
                    whileHover={{ y: -4 }}
                    className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition dark:border-slate-800 dark:bg-slate-900/80"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/70">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">{project.category}</span>
                        {project.featured && (
                          <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">
                            Featured
                          </span>
                        )}
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-sky-500/10 text-sky-600 dark:text-sky-300'}`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.summary}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologyTags.map((tag) => (
                          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                        >
                          View Details <ChevronRight className="h-4 w-4" />
                        </button>
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-200">
                          GitHub <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </section>

          <section id="experience" className="bg-slate-200/40 py-16 dark:bg-slate-900/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-300">
                  <BriefcaseBusiness className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">Experience</p>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Internship and project learning</h2>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">Internship</p>
                    <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Data Analytics with Power BI</h3>
                    <p className="mt-2 text-base font-medium text-violet-500">NEXTSKILL TECHNOLOGIES PVT LTD, Coimbatore</p>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    Duration: Editable field
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Responsibilities</h4>
                    <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> Prepared and cleaned datasets for dashboard analysis.</li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> Worked with reporting logic and KPI-focused visualization processes.</li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> Built insights that supported decision-oriented reporting.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Tools & skills</h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['Power BI', 'Power Query', 'DAX', 'Dashboards', 'Reporting', 'KPI Analysis'].map((item) => (
                        <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="resume" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-300">
                <Download className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">Resume</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Recruiter-ready portfolio and resume</h2>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Resume Preview</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Naveen Santhosh</h3>
                  </div>
                  <button
                    type="button"
                    onClick={createResumePdf}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                  >
                    Download PDF <Download className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-8 space-y-5 text-sm text-slate-600 dark:text-slate-300">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Education</p>
                    <p className="mt-1">B.Tech in Artificial Intelligence and Data Science</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Skills</p>
                    <p className="mt-1">Python, Java, SQL, NumPy, Pandas, Scikit-learn, OpenCV, YOLO, Flask, Power BI, DAX, HTML, CSS, JavaScript</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Experience</p>
                    <p className="mt-1">Data Analytics with Power BI Internship at NEXTSKILL TECHNOLOGIES PVT LTD, Coimbatore</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Portfolio note</p>
                    <p className="mt-1">This resume template is editable and should be finalized with missing details before application submission.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">Recruiter Features</p>
                <ul className="mt-5 space-y-4 text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> Clear call-to-action for internships and junior opportunities</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> Contact information and social links ready for recruiter outreach</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /> Resume export for quick sharing and print-friendly output</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="contact" className="bg-slate-200/40 py-16 dark:bg-slate-900/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-300">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">Contact</p>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Let’s connect</h2>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">Email</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <a href={`mailto:${profile.email}`} className="text-base font-semibold text-slate-900 dark:text-white">{profile.email}</a>
                      <button type="button" onClick={copyEmail} className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-200">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">Professional profiles</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
                        <GitBranch className="h-4 w-4" /> GitHub
                      </a>
                      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
                        <BriefcaseBusiness className="h-4 w-4" /> LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Name
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="Your name" />
                    </label>

                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="you@example.com" />
                    </label>
                  </div>

                  <label className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Project or opportunity
                    <input type="text" name="project" value={formData.project} onChange={handleInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="e.g. Internship, collaboration, entry-level role" />
                  </label>

                  <label className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="Tell me a bit about the role or project." />
                  </label>

                  {formStatus && (
                    <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${formStatus.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300' : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300'}`}>
                      {formStatus.message}
                    </div>
                  )}

                  <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
                    Send Message <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">GitHub</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Public repositories</h3>
                </div>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
                  View profile <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {loadingRepos ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                  Loading repositories...
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {githubRepos.map((repo) => (
                    <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-400 dark:border-slate-700 dark:bg-slate-800/70">
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{repo.name}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{repo.description}</p>
                    </a>
                  ))}
                </div>
              )}

              {githubError && (
                <p className="mt-4 text-sm text-amber-600 dark:text-amber-300">{githubError}</p>
              )}
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 bg-white/80 py-8 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-600 sm:px-6 lg:flex-row lg:px-8 dark:text-slate-300">
            <p>© 2025 Naveen Santhosh. Built for AI, ML, and data opportunities.</p>
            <div className="flex items-center gap-4">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </footer>

        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={(event) => event.stopPropagation()}
                className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">{selectedProject.category}</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h3>
                  </div>
                  <button type="button" onClick={() => setSelectedProject(null)} className="rounded-full border border-slate-300 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-200">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.technologyTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{selectedProject.description}</p>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">System architecture</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {selectedProject.architecture.map((step) => (
                      <li key={step} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {step}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
                    GitHub Repo <ExternalLink className="h-4 w-4" />
                  </a>
                  <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                    Demo <ExternalLink className="h-4 w-4" />
                  </a>
                  <a href={selectedProject.reportUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                    Project Report <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
