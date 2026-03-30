import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, FileCode, Terminal, MessageSquare, Settings, 
  ChevronRight, X, Plus, Folder, File, Play, Sparkles,
  Bot, Zap, Shield, Cpu, Layers, XCircle,
  Send, Copy, Check, ChevronDown, Download,
  GitBranch, Link, ArrowRight, Command,
  Maximize2, Minimize2, RotateCcw, Search, PenTool,
  Globe, Users, Wand2, Layout, Database, Cloud,
  Smartphone, Monitor, Wifi, Lock, Bug, Rocket, Star,
  GitPullRequest, Infinity, Box, ExternalLink, Workflow, Plug, Puzzle,
  Server, HardDrive, Moon, Sun, Package, AppWindow, Code,
  TerminalIcon, FileJson, FolderOpen, SearchCode, Mic, Image,
  BookOpen, LifeBuoy, MessageCircle, Video, Mail, Webhook
} from 'lucide-react'
import './App.css'

const AI_MODELS = {
  cloud: [
    { id: 'openai', name: 'OpenAI', icon: '🤖', color: '#10A37F', description: 'GPT-4o, GPT-4, GPT-3.5', models: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
    { id: 'anthropic', name: 'Anthropic', icon: '🧠', color: '#D97757', description: 'Claude 3.5 Sonnet, Opus, Haiku', models: ['claude-3-5-sonnet', 'claude-3-opus', 'claude-3-haiku'] },
    { id: 'google', name: 'Google AI', icon: '🔷', color: '#4285F4', description: 'Gemini 1.5 Pro, Flash', models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro'] },
    { id: 'meta', name: 'Meta AI', icon: '🌐', color: '#0668E1', description: 'Llama 3.1, 3, 2', models: ['llama-3.1-405b', 'llama-3.1-70b', 'llama-3-70b'] },
    { id: 'mistral', name: 'Mistral', icon: '🌪️', color: '#FF7000', description: 'Mixtral, Codestral', models: ['mixtral-8x7b', 'codestral-2501'] },
    { id: 'cohere', name: 'Cohere', icon: '🔗', color: '#39594D', description: 'Command R+', models: ['command-r-plus', 'command-r'] },
  ],
  local: [
    { id: 'ollama', name: 'Ollama', icon: '🐳', color: '#9012FE', description: 'Run 70+ models locally', models: ['llama3.3', 'qwen2.5', 'phi4', 'mistral', 'codellama'] },
    { id: 'lmstudio', name: 'LM Studio', icon: '💻', color: '#FF6B35', description: 'Desktop AI model runner', models: ['llama-3.3-70b', 'qwen-2.5-72b', 'phi-4'] },
    { id: 'llamafile', name: 'Llamafile', icon: '📄', color: '#FF4500', description: 'Single-file AI models', models: ['llama-3.1-8b', 'mistral-7b'] },
    { id: 'textgen', name: 'Text Generation WebUI', icon: '🌍', color: '#FFB347', description: 'Web interface for LLMs', models: ['various'] },
    { id: 'kobold', name: 'KoboldAI', icon: '🏰', color: '#7B68EE', description: 'AI storytelling platform', models: ['various'] },
    { id: 'sillytavern', name: 'SillyTavern', icon: '🍺', color: '#00D4AA', description: 'Chat UI for local LLMs', models: ['various'] },
  ],
  mcp: [
    { id: 'filesystem', name: 'Filesystem', icon: '📁', description: 'Read/write local files' },
    { id: 'github', name: 'GitHub', icon: '🐙', description: 'Repo management, PRs, issues' },
    { id: 'n8n', name: 'n8n', icon: '🔄', description: 'Workflow automation' },
    { id: 'postgres', name: 'PostgreSQL', icon: '🐘', description: 'Database queries' },
    { id: 'slack', name: 'Slack', icon: '💬', description: 'Team communication' },
    { id: 'notion', name: 'Notion', icon: '📓', description: 'Workspace integration' },
    { id: 'brave', name: 'Brave Search', icon: '🦁', description: 'Web search' },
    { id: 'puppeteer', name: 'Puppeteer', icon: '🎭', description: 'Browser automation' },
    { id: 'sqlite', name: 'SQLite', icon: '🗃️', description: 'Local database' },
    { id: 'fetch', name: 'Fetch', icon: '🌐', description: 'HTTP requests' },
    { id: 'sentry', name: 'Sentry', icon: '🐛', description: 'Error tracking' },
    { id: 'vercel', name: 'Vercel', icon: '▲', description: 'Deployment' },
  ]
}

const AI_AGENTS = [
  { id: 'openai', name: 'OpenAI', icon: '🤖', color: '#79C0FF', description: 'GPT-4 powered coding assistant' },
  { id: 'chatgpt', name: 'ChatGPT', icon: '💬', color: '#FF7EB6', description: 'Natural language code generation' },
  { id: 'claude', name: 'Claude', icon: '🧠', color: '#A78BFA', description: 'Anthropic Claude for complex reasoning' },
  { id: 'codex', name: 'Codex', icon: '⚡', color: '#7EE787', description: 'Specialized code generation model' },
]

const SAMPLE_PROMPTS = [
  "Build a task management app with drag and drop",
  "Create a real-time chat application",
  "Make a portfolio website with dark mode",
  "Build an e-commerce checkout flow",
]

const PROMPT_RESPONSES = {
  "Build a task management app with drag and drop": {
    files: {
      'src/App.jsx': { type: 'file', language: 'javascript', content: "import { useState } from 'react';\nimport { DndProvider } from 'react-dnd';\nimport { HTML5Backend } from 'react-dnd-html5-backend';\nimport TaskBoard from './components/TaskBoard';\n\nfunction App() {\n  const [tasks, setTasks] = useState([\n    { id: 1, title: 'Design UI', status: 'todo' },\n    { id: 2, title: 'Implement drag & drop', status: 'progress' },\n  ]);\n\n  const moveTask = (id, newStatus) => {\n    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));\n  };\n\n  return (\n    <DndProvider backend={HTML5Backend}>\n      <div className=\"app\">\n        <h1>Task Manager</h1>\n        <TaskBoard tasks={tasks} onMove={moveTask} />\n      </div>\n    </DndProvider>\n  );\n}\n\nexport default App;" },
      'src/components/TaskBoard.jsx': { type: 'file', language: 'javascript', content: "import { useDrag, useDrop } from 'react-dnd';\n\nconst ItemTypes = { TASK: 'task' };\n\nexport const TaskCard = ({ task }) => {\n  const [{ isDragging }, drag] = useDrag(() => ({\n    type: ItemTypes.TASK,\n    item: { id: task.id },\n    collect: (monitor) => ({ isDragging: monitor.isDragging() }),\n  }));\n\n  return <div ref={drag}>{task.title}</div>;\n};\n\nexport default function TaskBoard({ tasks, onMove }) {\n  return (\n    <div className=\"board\">\n      {tasks.map(task => <TaskCard key={task.id} task={task} />)}\n    </div>\n  );\n}" },
      'package.json': { type: 'file', language: 'json', content: "{\n  \"name\": \"task-manager\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {\n    \"react\": \"^18.2.0\"\n  }\n}" }
    }
  }
}

const SAMPLE_FILES = {
  'src': {
    type: 'folder',
    children: {
      'App.jsx': { type: 'file', language: 'javascript', content: "import React from 'react';\nimport { useState } from 'react';\nimport './App.css';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div className=\"app\">\n      <h1>Hello GUIDESOFT IDE</h1>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n    </div>\n  );\n}\n\nexport default App;" },
      'index.js': { type: 'file', language: 'javascript', content: "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);" },
      'utils.js': { type: 'file', language: 'javascript', content: "export const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;" }
    }
  },
  'components': {
    type: 'folder',
    children: {
      'Button.jsx': { type: 'file', language: 'javascript', content: "export const Button = ({ children, onClick }) => (\n  <button className=\"btn\" onClick={onClick}>{children}</button>\n);" },
      'Card.jsx': { type: 'file', language: 'javascript', content: "export const Card = ({ title, children }) => (\n  <div className=\"card\"><h3>{title}</h3>{children}</div>\n);" }
    }
  },
  'styles': {
    type: 'folder',
    children: {
      'main.css': { type: 'file', language: 'css', content: ':root { --primary: #00D9FF; }\nbody { margin: 0; font-family: Inter, sans-serif; }' }
    }
  },
  'package.json': { type: 'file', language: 'json', content: '{"name": "my-app", "version": "1.0.0"}' }
}

const VSCODE_FEATURES = [
  { feature: 'AI Code Completion', gs: true, cursor: true, vscode: 'Partial', lovable: true, composable: true },
  { feature: 'Multi-Agent AI', gs: true, cursor: true, vscode: false, lovable: true, composable: true },
  { feature: 'Natural Language to Code', gs: true, cursor: true, vscode: false, lovable: true, composable: true },
  { feature: 'Built-in Terminal', gs: true, cursor: true, vscode: true, lovable: 'Partial', composable: false },
  { feature: 'Git Integration', gs: true, cursor: true, vscode: true, lovable: true, composable: true },
  { feature: 'Debugging', gs: true, cursor: true, vscode: true, lovable: false, composable: false },
  { feature: '50+ Language Support', gs: true, cursor: true, vscode: true, lovable: false, composable: false },
  { feature: 'Extensions Marketplace', gs: true, cursor: true, vscode: true, lovable: false, composable: false },
  { feature: 'Remote Development', gs: true, cursor: 'Partial', vscode: true, lovable: false, composable: false },
  { feature: 'Live Collaboration', gs: true, cursor: 'Partial', vscode: false, lovable: true, composable: true },
  { feature: 'One-Click Deploy', gs: true, cursor: false, vscode: false, lovable: true, composable: true },
  { feature: 'Built-in Database', gs: true, cursor: false, vscode: false, lovable: true, composable: true },
  { feature: 'MCP Integrations', gs: true, cursor: 'Partial', vscode: false, lovable: false, composable: true },
  { feature: 'No-Code Workflows', gs: true, cursor: false, vscode: false, lovable: true, composable: true },
  { feature: 'Local AI Models', gs: true, cursor: false, vscode: false, lovable: false, composable: false },
]

function LandingPage({ onEnterIDE, onTryPrompt }) {
  const [scrolled, setScrolled] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeModelTab, setActiveModelTab] = useState('cloud')
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePromptSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim()) {
      setIsGenerating(true)
      setTimeout(() => {
        onTryPrompt(prompt)
        setIsGenerating(false)
      }, 2000)
    }
  }

  return (
    <div className="landing">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <Sparkles className="logo-icon" />
          <span>GUIDESOFT</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#models">AI Models</a>
          <a href="#mcp">MCP</a>
          <a href="#compare">Compare</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="nav-actions">
          <button className="btn-ghost">Sign In</button>
          <button className="btn-primary" onClick={onEnterIDE}>Get Started</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-new">🔥 All-in-One AI Platform</span>
            <h1 className="hero-title">
              Code, Build, Deploy
              <span className="gradient-text"> with AI</span>
            </h1>
            <p className="hero-subtitle">
              The most powerful AI IDE with 50+ models (Cloud & Local), MCP integrations, 
              No-code workflows, and GitHub sync — all in one place.
            </p>
            
            <form className="prompt-box" onSubmit={handlePromptSubmit}>
              <Wand2 className="prompt-icon" />
              <input 
                type="text" 
                placeholder="Describe what you want to build... (e.g., 'Build a task manager with drag and drop')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button type="submit" className="prompt-btn" disabled={isGenerating}>
                {isGenerating ? (
                  <span className="loading-dots">Building<span>.</span><span>.</span><span>.</span></span>
                ) : (
                  <>
                    Build <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="quick-prompts">
              {SAMPLE_PROMPTS.map((p, i) => (
                <button key={i} className="quick-prompt" onClick={() => { setPrompt(p); onTryPrompt(p); }}>
                  {p}
                </button>
              ))}
            </div>

            <div className="hero-actions">
              <button className="btn-primary btn-large" onClick={onEnterIDE}>
                <Download size={20} />
                Download for Free
              </button>
              <button className="btn-ghost btn-large">
                <Command size={20} />
                VS Code Extension
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="ai-chat-preview">
            <div className="chat-header">
              <Bot size={18} />
              <span>AI Assistant</span>
              <span className="online-dot"></span>
            </div>
            <div className="chat-messages-preview">
              <div className="chat-msg ai">
                <div className="msg-avatar">🤖</div>
                <div className="msg-content">
                  <p>Hi! I'm your AI coding assistant. I support 50+ models including OpenAI, Claude, Gemini, Llama, and local models via Ollama.</p>
                  <div className="model-tags">
                    <span className="model-tag">GPT-4</span>
                    <span className="model-tag">Claude</span>
                    <span className="model-tag">Llama</span>
                    <span className="model-tag">Ollama</span>
                  </div>
                </div>
              </div>
              <div className="chat-msg user">
                <div className="msg-content">
                  <p>Build a task management app with drag and drop</p>
                </div>
                <div className="msg-avatar">👤</div>
              </div>
              <div className="chat-msg ai">
                <div className="msg-avatar">⚡</div>
                <div className="msg-content">
                  <p>Building your app with React + react-dnd...</p>
                  <div className="files-creating">
                    <span><FileCode size={12} /> App.jsx</span>
                    <span><FileCode size={12} /> TaskBoard.jsx</span>
                    <span><FileCode size={12} /> package.json</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <strong>50+</strong>
          <span>AI Models</span>
        </div>
        <div className="stat-item">
          <strong>100+</strong>
          <span>MCP Integrations</span>
        </div>
        <div className="stat-item">
          <strong>1M+</strong>
          <span>Apps Built</span>
        </div>
        <div className="stat-item">
          <strong>50K+</strong>
          <span>Developers</span>
        </div>
      </section>

      <section id="models" className="models-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Choose your AI Model
        </motion.h2>
        <p className="section-subtitle">
          Cloud models, local models, or connect your own — all in one IDE
        </p>
        
        <div className="model-tabs">
          <button 
            className={`model-tab ${activeModelTab === 'cloud' ? 'active' : ''}`}
            onClick={() => setActiveModelTab('cloud')}
          >
            <Cloud size={18} /> Cloud Models
          </button>
          <button 
            className={`model-tab ${activeModelTab === 'local' ? 'active' : ''}`}
            onClick={() => setActiveModelTab('local')}
          >
            <HardDrive size={18} /> Local Models
          </button>
        </div>

        <div className="models-grid">
          {(activeModelTab === 'cloud' ? AI_MODELS.cloud : AI_MODELS.local).map((model, i) => (
            <motion.div 
              key={model.id}
              className="model-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              style={{ '--model-color': model.color }}
            >
              <div className="model-icon">{model.icon}</div>
              <h3>{model.name}</h3>
              <p>{model.description}</p>
              <div className="model-models">
                {model.models.slice(0, 3).map((m, j) => (
                  <span key={j} className="model-badge">{m}</span>
                ))}
              </div>
              <button className="model-connect">Connect</button>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="mcp" className="mcp-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          MCP Integrations
        </motion.h2>
        <p className="section-subtitle">
          Connect to 100+ tools and services via Model Context Protocol
        </p>

        <div className="mcp-grid">
          {AI_MODELS.mcp.map((tool, i) => (
            <motion.div 
              key={tool.id}
              className="mcp-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              viewport={{ once: true }}
            >
              <span className="mcp-icon">{tool.icon}</span>
              <h4>{tool.name}</h4>
              <p>{tool.description}</p>
              <button className="mcp-install">Install</button>
            </motion.div>
          ))}
        </div>

        <div className="mcp-featured">
          <div className="mcp-featured-item">
            <Workflow size={24} />
            <div>
              <h4>n8n Integration</h4>
              <p>Automate workflows with AI-powered n8n nodes</p>
            </div>
            <button>Connect</button>
          </div>
          <div className="mcp-featured-item">
            <GitHub size={24} />
            <div>
              <h4>GitHub Integration</h4>
              <p>Sync repos, create PRs, manage issues</p>
            </div>
            <button>Connect</button>
          </div>
          <div className="mcp-featured-item">
            <Database size={24} />
            <div>
              <h4>Database Tools</h4>
              <p>PostgreSQL, SQLite, MongoDB connectors</p>
            </div>
            <button>Connect</button>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Everything you need to ship faster
        </motion.h2>
        <div className="features-grid">
          {[
            { icon: <Wand2 />, title: 'AI-Powered Generation', desc: 'Describe any app in plain English and get full code' },
            { icon: <Bot />, title: '50+ AI Models', desc: 'Cloud & local models in one IDE' },
            { icon: <Layout />, title: 'Visual Editor', desc: 'Drag-and-drop with live preview' },
            { icon: <Database />, title: 'Built-in Database', desc: 'PostgreSQL, MongoDB, SQLite ready' },
            { icon: <Cloud />, title: 'One-Click Deploy', desc: 'Deploy to Vercel, Netlify instantly' },
            { icon: <Zap />, title: 'Real-time Sync', desc: 'Live collaboration with your team' },
            { icon: <HardDrive />, title: 'Local Models', desc: 'Run Ollama, LM Studio locally' },
            { icon: <Workflow />, title: 'No-Code Workflows', desc: 'Build automations without code' },
            { icon: <GitBranch />, title: 'GitHub Sync', desc: 'Repo management & PRs' },
            { icon: <Puzzle />, title: 'MCP Integrations', desc: '100+ tool connections' },
            { icon: <TerminalIcon />, title: 'Built-in Terminal', desc: 'Full shell access' },
            { icon: <Shield />, title: 'Enterprise Security', desc: 'SOC2 compliant' },
          ].map((f, i) => (
            <motion.div 
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="compare" className="compare-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          How we compare
        </motion.h2>
        <p className="section-subtitle">
          See why GUIDESOFT IDE is the most complete AI development platform
        </p>
        
        <div className="compare-table-wrapper">
          <div className="compare-table">
            <div className="compare-header">
              <div className="compare-feature">Feature</div>
              <div className="compare-gs">GUIDESOFT</div>
              <div className="compare-other">Cursor</div>
              <div className="compare-other">VS Code</div>
              <div className="compare-other">Lovable</div>
              <div className="compare-other">Composable</div>
            </div>
            {VSCODE_FEATURES.map((row, i) => (
              <div key={i} className="compare-row">
                <div className="compare-feature">{row.feature}</div>
                <div className="compare-gs">
                  {row.gs === true ? <Check className="check-green" /> : <XCircle className="check-gray" />}
                </div>
                <div className="compare-other">
                  {row.cursor === true ? <Check className="check-green" /> : row.cursor === 'Partial' ? <span className="partial">◐</span> : <XCircle className="check-gray" />}
                </div>
                <div className="compare-other">
                  {row.vscode === true ? <Check className="check-green" /> : row.vscode === 'Partial' ? <span className="partial">◐</span> : <XCircle className="check-gray" />}
                </div>
                <div className="compare-other">
                  {row.lovable === true ? <Check className="check-green" /> : row.lovable === 'Partial' ? <span className="partial">◐</span> : <XCircle className="check-gray" />}
                </div>
                <div className="compare-other">
                  {row.composable === true ? <Check className="check-green" /> : row.composable === 'Partial' ? <span className="partial">◐</span> : <XCircle className="check-gray" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="workflows-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          No-Code Workflows
        </motion.h2>
        <p className="section-subtitle">
          Build automations visually with AI-powered workflow builder
        </p>
        
        <div className="workflow-preview">
          <div className="workflow-node trigger">
            <Webhook size={20} />
            <span>Webhook Trigger</span>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-node ai">
            <Sparkles size={20} />
            <span>AI Action</span>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-node database">
            <Database size={20} />
            <span>Save to DB</span>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-node notify">
            <MessageCircle size={20} />
            <span>Notify Slack</span>
          </div>
        </div>

        <div className="workflow-templates">
          <h3>Popular Workflows</h3>
          <div className="template-grid">
            <div className="template-card">
              <Mail size={20} />
              <h4>AI Email Responder</h4>
              <p>Auto-reply to emails with AI</p>
            </div>
            <div className="template-card">
              <GitPullRequest size={20} />
              <h4>Code Review Auto</h4>
              <p>AI-powered PR reviews</p>
            </div>
            <div className="template-card">
              <Bug size={20} />
              <h4>Bug Triage Bot</h4>
              <p>Auto-categorize issues</p>
            </div>
            <div className="template-card">
              <Rocket size={20} />
              <h4>Auto Deploy</h4>
              <p>Deploy on PR merge</p>
            </div>
          </div>
        </div>
      </section>

      <section className="preview-section">
        <div className="preview-content">
          <h2>GitHub Code Preview</h2>
          <p>Browse and edit GitHub repositories directly in your IDE</p>
        </div>
        <div className="github-preview">
          <div className="github-header">
            <GitHub size={20} />
            <span>username/my-project</span>
            <span className="github-star"><Star size={14} /> 1.2k</span>
          </div>
          <div className="github-files">
            <div className="github-file">
              <FileCode size={14} />
              <span>src/App.jsx</span>
              <span className="file-lines">45 lines</span>
            </div>
            <div className="github-file">
              <FileCode size={14} />
              <span>src/components/Header.jsx</span>
              <span className="file-lines">32 lines</span>
            </div>
            <div className="github-file">
              <FileJson size={14} />
              <span>package.json</span>
              <span className="file-lines">28 lines</span>
            </div>
          </div>
          <button className="btn-primary">Clone Repository</button>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">$0<span>/month</span></div>
            <ul>
              <li><Check size={16} /> Basic AI completion</li>
              <li><Check size={16} /> 50 requests/day</li>
              <li><Check size={16} /> Cloud models</li>
              <li><Check size={16} /> Community MCPs</li>
              <li><Check size={16} /> 1 project</li>
            </ul>
            <button className="btn-primary">Get Started</button>
          </div>
          <div className="pricing-card featured">
            <span className="badge-featured">Most Popular</span>
            <h3>Pro</h3>
            <div className="price">$19<span>/month</span></div>
            <ul>
              <li><Check size={16} /> Unlimited AI requests</li>
              <li><Check size={16} /> All 50+ models</li>
              <li><Check size={16} /> Local models (Ollama)</li>
              <li><Check size={16} /> All MCP integrations</li>
              <li><Check size={16} /> Workflows builder</li>
              <li><Check size={16} /> GitHub sync</li>
              <li><Check size={16} /> Priority support</li>
            </ul>
            <button className="btn-primary btn-large">Start Free Trial</button>
          </div>
          <div className="pricing-card">
            <h3>Team</h3>
            <div className="price">$49<span>/month</span></div>
            <ul>
              <li><Check size={16} /> Everything in Pro</li>
              <li><Check size={16} /> Team collaboration</li>
              <li><Check size={16} /> Shared AI context</li>
              <li><Check size={16} /> Admin dashboard</li>
              <li><Check size={16} /> SSO & SAML</li>
              <li><Check size={16} /> Custom integrations</li>
            </ul>
            <button className="btn-primary">Contact Sales</button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to build faster?</h2>
        <p>Join 50,000+ developers shipping with GUIDESOFT IDE</p>
        <div className="cta-actions">
          <button className="btn-primary btn-large" onClick={onEnterIDE}>
            Start Building Free <ArrowRight size={20} />
          </button>
        </div>
        <div className="cta-stats">
          <div><strong>50K+</strong> developers</div>
          <div><strong>1M+</strong> apps built</div>
          <div><strong>4.9</strong> rating</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Sparkles className="logo-icon" />
            <span>GUIDESOFT</span>
            <p>AI-powered IDE for modern developers</p>
            <div className="footer-social">
              <GitBranch size={18} />
              <Link size={18} />
              <Globe size={18} />
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#models">AI Models</a>
              <a href="#mcp">MCP</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div>
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">API Reference</a>
              <a href="#">Templates</a>
              <a href="#">Blog</a>
            </div>
            <div>
              <h4>Integrations</h4>
              <a href="#">GitHub</a>
              <a href="#">n8n</a>
              <a href="#">PostgreSQL</a>
              <a href="#">Slack</a>
            </div>
            <div>
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 GUIDESOFT IDE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function IDE({ onExit, initialPrompt }) {
  const [files, setFiles] = useState(initialPrompt ? PROMPT_RESPONSES[initialPrompt]?.files || SAMPLE_FILES : SAMPLE_FILES)
  const [activeFile, setActiveFile] = useState('src/App.jsx')
  const [fileContent, setFileContent] = useState(files['src/App.jsx']?.content || SAMPLE_FILES['src'].children['App.jsx'].content)
  const [openTabs, setOpenTabs] = useState(['src/App.jsx'])
  const [activeModelTab, setActiveModelTab] = useState('cloud')
  const [selectedModel, setSelectedModel] = useState('claude')
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: initialPrompt ? `I've built your "${initialPrompt}" application! Here's what was created:\n\n• Complete React components\n• Full functionality\n• Package dependencies\n\nWould you like me to explain any part or make changes?` : 'Hi! I\'m Claude. Select an AI model and ask me to help with your code.\n\n💡 Try switching between Cloud (OpenAI, Claude, Gemini) or Local (Ollama, LM Studio) models.', agent: 'claude' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [activeAgent, setActiveAgent] = useState('claude')
  const [terminalOutput, setTerminalOutput] = useState(['Welcome to GUIDESOFT IDE Terminal v1.0', '> Ready', '💡 Try: npm install, npm run dev, git push'])
  const [showTerminal, setShowTerminal] = useState(true)
  const [expandedFolders, setExpandedFolders] = useState({ 'src': true, 'components': true })
  
  const terminalRef = useRef(null)

  const getLanguage = (filename) => {
    const ext = filename.split('.').pop()
    const langMap = { js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript', py: 'python', css: 'css', json: 'json', html: 'html', md: 'markdown' }
    return langMap[ext] || 'plaintext'
  }

  const flattenFiles = (obj, path = '') => {
    let result = {}
    Object.entries(obj).forEach(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name
      if (item.type === 'file') {
        result[fullPath] = item
      } else if (item.children) {
        result = { ...result, ...flattenFiles(item.children, fullPath) }
      }
    })
    return result
  }

  const flatFiles = flattenFiles(files)

  const handleFileSelect = (path) => {
    setActiveFile(path)
    setFileContent(flatFiles[path]?.content || '')
    if (!openTabs.includes(path)) {
      setOpenTabs([...openTabs, path])
    }
  }

  const closeTab = (e, path) => {
    e.stopPropagation()
    const newTabs = openTabs.filter(t => t !== path)
    setOpenTabs(newTabs)
    if (activeFile === path && newTabs.length > 0) {
      handleFileSelect(newTabs[newTabs.length - 1])
    }
  }

  const toggleFolder = (name) => {
    setExpandedFolders(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const renderFileTree = (obj, path = '', depth = 0) => {
    return Object.entries(obj).map(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name
      const isFolder = item.type === 'folder'
      const isExpanded = expandedFolders[name]
      const paddingLeft = depth * 16 + 8

      return (
        <div key={fullPath}>
          <div 
            className={`file-item ${activeFile === fullPath ? 'active' : ''}`}
            style={{ paddingLeft }}
            onClick={() => isFolder ? toggleFolder(name) : handleFileSelect(fullPath)}
          >
            {isFolder ? (
              <ChevronRight size={14} className={`folder-icon ${isExpanded ? 'expanded' : ''}`} />
            ) : (
              <FileCode size={14} className="file-icon" />
            )}
            <span>{name}</span>
          </div>
          {isFolder && isExpanded && item.children && (
            <div className="folder-content">
              {renderFileTree(item.children, fullPath, depth + 1)}
            </div>
          )}
        </div>
      )
    })
  }

  const sendMessage = () => {
    if (!inputMessage.trim()) return
    
    const newMessages = [...aiMessages, { role: 'user', content: inputMessage, agent: activeAgent }]
    setAiMessages(newMessages)
    setInputMessage('')

    setTimeout(() => {
      const responses = {
        openai: `Here's a code suggestion using GPT-4:\n\n\`\`\`javascript\n// AI-generated with OpenAI GPT-4o\n${inputMessage.includes('function') ? 'const result = ' + inputMessage : '// Implementation for: ' + inputMessage}\n\`\`\`\n\nModel: GPT-4o | Context: 128K tokens`,
        chatgpt: `I've analyzed your request with ChatGPT:\n\n1. Consider using async/await for better readability\n2. Add error handling for robustness\n3. Type checking could improve reliability\n\nWould you like me to generate the code?`,
        claude: `I understand you're working on "${inputMessage}". Here's my analysis:\n\n• Code structure looks good\n• Consider memoization for expensive calculations\n• Use proper TypeScript types for better IDE support\n\n\`\`\`typescript\n// Suggested implementation\ninterface Props {\n  // type definitions\n}\n\`\`\``,
        codex: `Code generation complete with Codex:\n\n\`\`\`python\n# Generated based on: ${inputMessage}\ndef solution():\n    # Implementation here\n    pass\n\`\`\`\n\n✓ Optimized for performance`,
        ollama: `Running locally with Ollama (Llama 3.3):\n\n\`\`\`javascript\n// Generated with local model - no API calls\n${inputMessage.includes('function') ? 'const result = ' + inputMessage : '// Implementation: ' + inputMessage}\n\`\`\`\n\n🖥️ Running offline • Privacy first`,
      }
      setAiMessages([...newMessages, { 
        role: 'assistant', 
        content: responses[activeAgent] || responses.claude, 
        agent: activeAgent 
      }])
    }, 1200)
  }

  const runCode = () => {
    setTerminalOutput(prev => [
      ...prev, 
      `> Running ${activeFile}...`,
      '✓ Execution complete (0.23s)',
      '',
      'Output:',
      '--------',
      'App running at http://localhost:3000'
    ])
  }

  return (
    <div className="ide-container">
      <div className="ide-header">
        <div className="ide-header-left">
          <button className="ide-btn" onClick={onExit}>
            <X size={16} />
          </button>
          <div className="ide-logo">
            <Sparkles size={18} />
            <span>GUIDESOFT IDE</span>
          </div>
        </div>
        <div className="ide-header-center">
          <span className="active-file">{activeFile}</span>
        </div>
        <div className="ide-header-right">
          <button className="ide-btn"><Minimize2 size={16} /></button>
          <button className="ide-btn"><Maximize2 size={16} /></button>
        </div>
      </div>

      <div className="ide-main">
        <div className="ide-sidebar">
          <div className="sidebar-tabs">
            <button className="sidebar-tab active"><FileCode size={16} /></button>
            <button className="sidebar-tab"><SearchCode size={16} /></button>
            <button className="sidebar-tab"><GitBranch size={16} /></button>
            <button className="sidebar-tab"><Puzzle size={16} /></button>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-header">
              <span>EXPLORER</span>
              <button className="ide-btn"><Plus size={14} /></button>
            </div>
            <div className="file-tree">
              {renderFileTree(files)}
            </div>
          </div>
        </div>

        <div className="ide-editor-area">
          <div className="tab-bar">
            {openTabs.map(tab => (
              <div 
                key={tab}
                className={`tab ${activeFile === tab ? 'active' : ''}`}
                onClick={() => handleFileSelect(tab)}
              >
                <FileCode size={14} />
                <span>{tab.split('/').pop()}</span>
                <button className="tab-close" onClick={(e) => closeTab(e, tab)}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="editor-wrapper">
            <Editor
              height="100%"
              language={getLanguage(activeFile)}
              value={fileContent}
              onChange={(value) => setFileContent(value)}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: true },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16 },
              }}
            />
          </div>

          {showTerminal && (
            <div className="terminal-panel" ref={terminalRef}>
              <div className="terminal-header">
                <span>TERMINAL</span>
                <div className="terminal-actions">
                  <button className="ide-btn" onClick={() => setTerminalOutput(['Welcome to GUIDESOFT IDE Terminal v1.0', '> Ready', '💡 Try: npm install, npm run dev, git push'])}>
                    <RotateCcw size={14} />
                  </button>
                  <button className="ide-btn" onClick={() => setShowTerminal(false)}>
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="terminal-output">
                {terminalOutput.map((line, i) => (
                  <div key={i} className="terminal-line">{line}</div>
                ))}
              </div>
              <div className="terminal-input">
                <span>$</span>
                <input type="text" placeholder="Enter command..." />
              </div>
            </div>
          )}
          
          <button className="run-btn" onClick={runCode}>
            <Play size={14} /> Run
          </button>
        </div>

        <div className="ai-panel">
          <div className="ai-panel-header">
            <Sparkles size={16} />
            <span>AI Assistant</span>
            <span className="ai-badge">50+ models</span>
          </div>

          <div className="model-selector-tabs">
            <button 
              className={`model-selector-tab ${activeModelTab === 'cloud' ? 'active' : ''}`}
              onClick={() => setActiveModelTab('cloud')}
            >
              <Cloud size={12} /> Cloud
            </button>
            <button 
              className={`model-selector-tab ${activeModelTab === 'local' ? 'active' : ''}`}
              onClick={() => setActiveModelTab('local')}
            >
              <HardDrive size={12} /> Local
            </button>
          </div>
          
          <div className="agent-selector">
            {(activeModelTab === 'cloud' ? AI_MODELS.cloud : AI_MODELS.local).slice(0, 6).map(agent => (
              <button 
                key={agent.id}
                className={`agent-tab ${selectedModel === agent.id ? 'active' : ''}`}
                style={{ '--agent-color': agent.color }}
                onClick={() => { setSelectedModel(agent.id); setActiveAgent(agent.id); }}
                title={agent.name}
              >
                <span>{agent.icon}</span>
              </button>
            ))}
          </div>

          <div className="chat-messages">
            {aiMessages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === 'user' ? '👤' : (AI_MODELS.cloud.find(a => a.id === msg.agent)?.icon || AI_MODELS.local.find(a => a.id === msg.agent)?.icon || '🤖')}
                </div>
                <div className="message-content">
                  {msg.content.split('```').map((part, j) => j % 2 === 1 ? (
                    <pre key={j} className="code-block">{part}</pre>
                  ) : (
                    <p key={j}>{part}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Ask AI..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}><Send size={16} /></button>
          </div>

          <div className="mcp-status">
            <Puzzle size={12} />
            <span>12 MCPs connected</span>
            <Link size={12} />
          </div>
        </div>
      </div>

      <div className="ide-statusbar">
        <div className="status-left">
          <span><Bot size={12} /> {AI_MODELS.cloud.find(m => m.id === selectedModel)?.name || AI_MODELS.local.find(m => m.id === selectedModel)?.name || 'Claude'}</span>
          <span>main*</span>
        </div>
        <div className="status-right">
          <span><HardDrive size={12} /> {activeModelTab === 'local' ? 'Local' : 'Cloud'}</span>
          <span>UTF-8</span>
          <span>{getLanguage(activeFile)}</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [showIDE, setShowIDE] = useState(false)
  const [prompt, setPrompt] = useState('')

  const handleTryPrompt = (p) => {
    setPrompt(p)
    setShowIDE(true)
  }

  return (
    <AnimatePresence mode="wait">
      {showIDE ? (
        <motion.div
          key="ide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <IDE onExit={() => setShowIDE(false)} initialPrompt={prompt} />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LandingPage onEnterIDE={() => setShowIDE(true)} onTryPrompt={handleTryPrompt} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
