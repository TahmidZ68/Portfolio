export interface SystemActionLink {
  label: 'Live Demo' | 'GitHub' | 'Documentation' | 'Research Paper';
  sublabel?: string;
  url: string;
}

export interface SystemArchitectureNode {
  stage: string;
  node: string;
  detail: string;
}

export interface SystemPreviewImage {
  src: string;
  caption: string;
}

export interface EngineeredSystem {
  id: string;
  code: string;
  name: string;
  classification: string;
  domain: 'production-ai' | 'diagnostic-engine' | 'automation-reliability';
  status: string;
  statusType: 'live' | 'alpha' | 'open-core' | 'active';
  shortDescription: string;
  problemAddressed: string;
  architectureSummary: string;
  architecturePipeline: SystemArchitectureNode[];
  technicalSpecifications: string[];
  technologies: string[];
  links: SystemActionLink[];
  previews?: SystemPreviewImage[];
}

export interface ResearchItem {
  id: string;
  code: string;
  title: string;
  venue: string;
  year: string;
  status: 'Published' | 'Funded Capstone & Pre-Publication' | 'Experimental Research';
  category: 'published' | 'ongoing' | 'experimental';
  contribution: string;
  methodology: string;
  keywords: string[];
  paperUrl?: string;
  repoUrl?: string;
  secondaryRepoUrl?: string;
  secondaryRepoLabel?: string;
}

export interface OpenQuestionItem {
  id: string;
  code: string;
  domain: string;
  question: string;
  context: string;
  failureMode: string;
  investigativeDirection: string;
  relatedSystem: string;
}

export interface EvolutionEntry {
  id: string;
  period: string;
  type:
    | 'ENGINEERING & LEADERSHIP'
    | 'AI ARCHITECTURE'
    | 'BUSINESS & STRATEGY'
    | 'ACADEMIC RESEARCH'
    | 'UNIVERSITY EDUCATION';
  role: string;
  organization: string;
  orgUrl?: string;
  location: string;
  summary: string;
  details: string[];
}

export interface TechMatrixCategory {
  code: string;
  category: string;
  description: string;
  items: Array<{
    name: string;
    tier: 'Core Proficiency' | 'Applied / Working';
    context: string;
  }>;
}

export interface SignalEntry {
  id: string;
  code: string;
  type: 'RESEARCH PAPER' | 'ENGINEERING NOTE' | 'SYSTEMS ARCHITECTURE';
  date: string;
  title: string;
  abstract: string;
  keyTakeaways: string[];
  externalUrl?: string;
  externalLabel?: string;
}

export const verifiedLinks = {
  portfolio: 'https://portfolio-nine-green-49.vercel.app/',
  portfolioRepo: 'https://github.com/TahmidZ68/Portfolio',
  github: 'https://github.com/TahmidZ68',
  linkedin: 'https://www.linkedin.com/in/md-tahmid-zoayed-39355037b/',
  kaggle: 'https://www.kaggle.com/mdtahmidzoayed',
  axiosStation: 'https://www.axiosstation.com/',
  axiosInsight: 'https://axios-insight-v1-three.vercel.app/',
  axiosInsightWorkspace: 'https://axios-insight-v1-cqge871jp-tahmid-z.vercel.app/',
  axiosInsightRepo: 'https://github.com/TahmidZ68/axios-insight',
  axiosTalent: 'https://axios-talent-tau.vercel.app/',
  axiosTalentCandidate: 'https://axios-talent-candidate.vercel.app/',
  datasetMedicRepo: 'https://github.com/TahmidZ68/DatasetMedic',
  datasetMedicDocs: 'https://github.com/TahmidZ68/DatasetMedic#readme',
  apiDetectiveRepo: 'https://github.com/TahmidZ68/API-Detective',
  apiDetectiveDocs: 'https://github.com/TahmidZ68/API-Detective#readme',
  flowSentryRepo: 'https://github.com/TahmidZ68/flowsentry',
  flowSentryDocs: 'https://github.com/TahmidZ68/flowsentry#readme',
  vellumResearchLive: 'https://vellum-research-nine.vercel.app/',
  vellumResearchRepo: 'https://github.com/TahmidZ68/vellum-research',
  vellumResearchDocs: 'https://github.com/TahmidZ68/vellum-research#readme',
  ragBanglaHscRepo: 'https://github.com/TahmidZ68/RAG_BanglaHSC',
  autismNumericRepo: 'https://github.com/TahmidZ68/Autism_detection_from_numericDataset',
  autismImageRepo: 'https://github.com/TahmidZ68/Autistic_detection_img_data',
  startupPredictionRepo: 'https://github.com/TahmidZ68/startup_success_rate_prediction',
  covidPneumoniaRepo: 'https://github.com/TahmidZ68/Covid-Pneumonia',
  brainTumorRepo: 'https://github.com/TahmidZ68/brain_tumor_prediction',
  bookRecRepo: 'https://github.com/TahmidZ68/User-Based-Collaborative-Filtering_Book-recomendation',
  realEstateRepo: 'https://github.com/TahmidZ68/real_estate_price_prediction',
  diseaseSymptomsRepo: 'https://github.com/TahmidZ68/Disease-detection-using-symptoms',
  tfidfReviewRepo: 'https://github.com/TahmidZ68/Online-review-using-_Tf-Idf',
  email: 'mohammadtahmidzoayed@gmail.com',
  phone: '+880 1629 483568',
  cvPdf: '/Md_Tahmid_Zoayed_CV.pdf',
  papers: {
    autismClassification:
      'https://www.researchgate.net/publication/363839044_Autism_Disease_Detection_using_Classification_Algorithms',
    autismImageVgg19:
      'https://www.researchgate.net/publication/361209023_Autism_Detecting_Model_using_Image',
    rainwaterHarvesting:
      'https://www.researchgate.net/publication/381879219_Paper_ID_403_Rainwater_Harvesting_and_Reducing_Biological_Threat_of_Utilizing',
    startupPrediction:
      'https://www.researchgate.net/publication/361343173_Startup_Success_prediction_using_Classification_Algorithms',
  },
};

export const navigationSections = [
  { num: '01', id: 'hero', label: 'OVERVIEW' },
  { num: '02', id: 'profile', label: 'PROFILE' },
  { num: '03', id: 'systems', label: 'SYSTEMS' },
  { num: '04', id: 'research-lab', label: 'RESEARCH' },
  { num: '05', id: 'open-questions', label: 'OPEN QUESTIONS' },
  { num: '06', id: 'evolution', label: 'EVOLUTION' },
  { num: '07', id: 'axios-station', label: 'AXIOS STATION' },
  { num: '08', id: 'tech-matrix', label: 'TECH MATRIX' },
  { num: '09', id: 'current-vector', label: 'CURRENT VECTOR' },
  { num: '10', id: 'signal', label: 'SIGNAL' },
  { num: '11', id: 'network', label: 'CONTACT' },
];

export const heroData = {
  brandName: 'MD TAHMID ZOAYED',
  name: 'TAHMID ZOAYED',
  role: 'AI / ML ENGINEER · SYSTEMS BUILDER · CBO AT AXIOS STATION',
  statement: 'I BUILD INTELLIGENT SYSTEMS.',
  supportingDescription:
    'I engineer intelligent applications, explore machine learning, and transform research into practical systems—spanning multi-tenant AI platforms, deterministic developer tools, workflow reliability engines, and applied computer vision.',
  location: 'Dhaka, Bangladesh · 23.8103° N, 90.4125° E',
  availability: 'Available for AI Engineering, Systems Architecture & Research Collaboration',
  currentRole: 'Chief Business Officer & AI Engineer @ Axios Station',
};

export const intelligenceProfileData = {
  headerCode: '02 // ENGINEERING & RESEARCH PROFILE',
  headline: 'Engineering at the convergence of empirical research, deterministic tooling, and live AI products.',
  narrative: [
    'Most machine-learning initiatives fail in the transition between an isolated notebook and an operational environment—where data distributions shift, APIs drift, and silent workflow failures corrupt downstream decisions.',
    'My work bridges that gap. Trained in Computer Science & Engineering with a specialization in Data Science and Intelligent Systems, I architect end-to-end AI applications, pre-training diagnostic tools, and domain-generalized computer vision pipelines.',
    'As Chief Business Officer & AI Engineer at Axios Station, I approach every system from first principles: defining the operational bottleneck, enforcing deterministic data and contract boundaries, and integrating LLMs or deep-learning models where they deliver verifiable leverage.',
  ],
  domains: [
    {
      index: '01',
      title: 'Artificial Intelligence',
      focus: 'Production LLM Integration & Multi-Step Reasoning',
      summary:
        'Architecting structured extraction pipelines, retrieval-grounded assistants, and domain-specific AI applications powered by OpenAI, Groq, Gemini, and LangGraph.',
      metrics: 'Document AI · Policy RAG · Citation-Validated Synthesis',
    },
    {
      index: '02',
      title: 'Machine Learning',
      focus: 'Supervised Classification, Regression & Empirical Evaluation',
      summary:
        'Designing and benchmarking classification and predictive models across clinical screening, venture analytics, and tabular/image feature spaces.',
      metrics: 'Feature Engineering · Cross-Validation · Model Optimization',
    },
    {
      index: '03',
      title: 'Intelligent Automation',
      focus: 'Operational Workflow Systems & Execution Reliability',
      summary:
        'Building automated business workflows, OCR ingestion pipelines, and centralized observability layers that verify real-world business outcomes.',
      metrics: 'n8n Reliability · Incident Fingerprinting · Operational Chatbots',
    },
    {
      index: '04',
      title: 'Computer Vision',
      focus: 'Deep Learning, Medical Imaging & Dataset Integrity',
      summary:
        'Developing CNN and transfer-learning architectures (VGG19, YOLO) for medical X-rays, agricultural harvesting assessment, and pre-training dataset audits.',
      metrics: 'Image Classification · Object Detection · Leakage Forensics',
    },
    {
      index: '05',
      title: 'Research & Experimental Systems',
      focus: 'Domain Generalization, Explainable AI & Adaptive Pipelines',
      summary:
        'Investigating how visual and statistical models maintain reliability under degraded image quality, environmental shifts, and constrained data regimes.',
      metrics: 'Degradation Routing · Adaptive Restoration · Published Studies',
    },
    {
      index: '06',
      title: 'Data Intelligence',
      focus: 'Workspace Analytics, Statistical Profiling & Decision Support',
      summary:
        'Transforming multi-file datasets and organizational records into conversational analytics, automated anomaly reports, and executive telemetry.',
      metrics: 'Natural-Language BI · Workforce Analytics · Reproducibility Manifests',
    },
  ],
};

export const engineeredSystems: EngineeredSystem[] = [
  {
    id: 'dataset-medic',
    code: 'SYS-01',
    name: 'DatasetMedic',
    classification: 'Open-Source Computer Vision Data Quality & Leakage Framework',
    domain: 'diagnostic-engine',
    status: 'Public Alpha · v0.2.0',
    statusType: 'alpha',
    shortDescription:
      'Local-first, read-only computer vision dataset auditing, cross-split leakage detection, profiling, and reproducibility framework ("Before you train your model, audit your data") for image classification and object detection.',
    problemAddressed:
      'Computer vision models frequently suffer from inflated validation metrics caused by undetected train/val/test image leakage, corrupted image files, degenerate bounding boxes, and undocumented dataset mutations across training runs.',
    architectureSummary:
      'Executes a strictly read-only, CPU-first diagnostic pipeline across Folder, CSV, Ultralytics YOLO, COCO JSON, and Pascal VOC datasets without requiring external APIs, GPUs, or cloud accounts.',
    architecturePipeline: [
      {
        stage: '01 / INGEST',
        node: 'Format Adapter Layer',
        detail: 'Deterministic parsing of Folder, CSV, YOLO, COCO JSON & hardened Pascal VOC XML.',
      },
      {
        stage: '02 / INTEGRITY',
        node: 'Geometry & Image Analyzer',
        detail: 'Detects truncated/corrupted byte streams, invalid bounding boxes, and class imbalance.',
      },
      {
        stage: '03 / LEAKAGE',
        node: 'Cross-Split Contamination Engine',
        detail: 'Exact SHA-256 duplicate matching, perceptual pHash near-duplicates & group-ID tracking.',
      },
      {
        stage: '04 / MANIFEST',
        node: 'Reproducibility Fingerprinter',
        detail: 'Outputs DatasetProfile, SHA-256 structural/content hashes, and offline HTML/JSON reports.',
      },
    ],
    technicalSpecifications: [
      'Supports both Image Classification (Folder-per-class, CSV manifest) and Object Detection (Ultralytics YOLO, COCO JSON, Pascal VOC XML).',
      'Group-aware metadata leakage detection tracks patient_id, subject_id, video_id, and capture_session across splits with automatic SHA-256 pseudonymization.',
      'Profile comparison engine (compare-profiles) diffs sample additions, removals, label edits, and separates dataset edits from tool-config changes.',
    ],
    technologies: [
      'Python 3.11+',
      'Computer Vision',
      'YOLO / COCO / VOC',
      'Perceptual Hashing (pHash)',
      'SHA-256 Fingerprinting',
      'CLI & Offline HTML Reports',
    ],
    links: [
      { label: 'GitHub', url: verifiedLinks.datasetMedicRepo },
      { label: 'Documentation', url: verifiedLinks.datasetMedicDocs },
    ],
    previews: [
      {
        src: '/images/projects/datasetmedic/01_cover_overview.png',
        caption: 'DatasetMedic Overview & Health Score Architecture',
      },
      {
        src: '/images/projects/datasetmedic/02_html_audit_report.png',
        caption: 'Offline HTML Audit Report & Severity Breakdown',
      },
      {
        src: '/images/projects/datasetmedic/03_metadata_leakage_detection.png',
        caption: 'Cross-Split SHA-256, pHash & Metadata Group Leakage Forensics',
      },
      {
        src: '/images/projects/datasetmedic/04_cli_terminal_summary.png',
        caption: 'CLI Audit Summary & Deterministic Health Grade',
      },
      {
        src: '/images/projects/datasetmedic/05_profiling_reproducibility.png',
        caption: 'Reproducibility Manifest & Dataset Profile Diffing',
      },
    ],
  },
  {
    id: 'api-detective',
    code: 'SYS-02',
    name: 'API Detective',
    classification: 'Autonomous API Integration Failure Investigator & Contract Engine',
    domain: 'diagnostic-engine',
    status: 'Public Alpha · v0.1.0-alpha.2',
    statusType: 'alpha',
    shortDescription:
      'Open-source developer utility ("Investigate. Diagnose. Fix. Verify.") that diagnoses API integration failures, identifies root causes across HTTP traces and OpenAPI specs, and verifies approved repairs.',
    problemAddressed:
      'Debugging broken API integrations requires correlating HTTP status codes, auth headers, OpenAPI/Swagger contracts, and client repository call sites—a slow, error-prone process when done manually across microservices.',
    architectureSummary:
      'Pairs a 43-check deterministic diagnostic engine (operating 100% locally without requiring an external LLM key) with a 7-step investigation agent, repository static analyzer, and a 4-level controlled unified-diff repair and rollback system.',
    architecturePipeline: [
      {
        stage: '01 / COLLECT',
        node: 'Context & Spec Ingestion',
        detail: 'Parses HTTP request/response traces, OpenAPI 3.0/3.1, Swagger 2.0, and JSON Schemas.',
      },
      {
        stage: '02 / DIAGNOSE',
        node: '43-Check Deterministic Engine',
        detail: 'Executes 6 analyzer suites: Connectivity, Auth, Request, Schema, Response, Integration.',
      },
      {
        stage: '03 / CORRELATE',
        node: '7-Step Agent & Repo Inspector',
        detail: 'Matches client call sites (Python requests/httpx, TS axios/fetch) and ranks root causes.',
      },
      {
        stage: '04 / VERIFY',
        node: '4-Level Controlled Repair',
        detail: 'Generates reviewable unified diffs, applies approved patches with backup/rollback, and re-tests.',
      },
    ],
    technicalSpecifications: [
      '43-Check deterministic diagnostic engine operates locally without external AI keys; optional provider adapter supports OpenAI, Gemini, Anthropic, or local models.',
      'Defense-in-depth security: recursive secret redaction (***REDACTED***), in-memory JWT metadata inspection, and SSRF protection blocking private networks and cloud metadata endpoints.',
      'Verified against a 25-scenario diagnostic benchmark suite with full FastAPI backend, React 18 dashboard, and Typer/Rich CLI.',
    ],
    technologies: [
      'Python 3.12+',
      'FastAPI',
      'React 18',
      'TypeScript',
      'OpenAPI 3.1 / JSON Schema',
      'SQLAlchemy',
      'Typer CLI',
    ],
    links: [
      { label: 'GitHub', url: verifiedLinks.apiDetectiveRepo },
      { label: 'Documentation', url: verifiedLinks.apiDetectiveDocs },
    ],
    previews: [
      {
        src: '/images/projects/api-detective/01_cover_overview.png',
        caption: 'Diagnostic Overview Dashboard (43 Deterministic Checks)',
      },
      {
        src: '/images/projects/api-detective/02_investigation_workspace.png',
        caption: '7-Step Autonomous Investigation Workspace',
      },
      {
        src: '/images/projects/api-detective/03_diagnostic_findings_and_diff.png',
        caption: 'Root-Cause Ranking & Level 2 Unified Diff Repair Plan',
      },
      {
        src: '/images/projects/api-detective/04_request_inspector_redaction.png',
        caption: 'Redacted Request Inspector & SSRF Protection Telemetry',
      },
      {
        src: '/images/projects/api-detective/05_cli_and_benchmark_summary.png',
        caption: 'CLI Output & 25-Scenario Benchmark Verification Suite',
      },
    ],
  },
  {
    id: 'flowsentry',
    code: 'SYS-03',
    name: 'FlowSentry',
    classification: 'Open-Core Automation Reliability & Business Outcome Monitoring Platform',
    domain: 'automation-reliability',
    status: 'Open-Core · Production Architecture',
    statusType: 'open-core',
    shortDescription:
      'Centralized automation reliability and intelligence layer ("Your workflows run. Make sure they work.") that detects silent workflow failures, fingerprints recurring incidents, and monitors business outcomes.',
    problemAddressed:
      'Workflow orchestrators like n8n report when a job crashes, but miss silent business failures (where an execution returns 200 OK yet creates no CRM record or invoice) and flood teams with duplicate HTTP 429/401 alert storms.',
    architectureSummary:
      'Modular monolith combining a Next.js 14 dashboard, FastAPI ingestion/diagnostic backend, PostgreSQL 16, Redis 7, and Celery workers to ingest n8n API v1 executions and Error Trigger webhooks with idempotent event normalization.',
    architecturePipeline: [
      {
        stage: '01 / INGEST',
        node: 'n8n Sync & Error Webhooks',
        detail: 'Idempotent NormalizedExecutionEvent (v1.0) ingestion with automatic token/secret stripping.',
      },
      {
        stage: '02 / MONITOR',
        node: '6 Business-Outcome Verifiers',
        detail: 'Checks expected_interval, expected_count, required_output_fields, HTTP & external records.',
      },
      {
        stage: '03 / GROUP',
        node: 'Incident Fingerprinting Engine',
        detail: 'Clusters recurring failure storms and >3x latency SLA anomalies into single incidents.',
      },
      {
        stage: '04 / TRIAGE',
        node: 'Evidence-Backed Root Cause',
        detail: 'Runs quota-bounded AI investigation with a built-in deterministic fallback engine + Slack/SMTP alerts.',
      },
    ],
    technicalSpecifications: [
      'Multi-tenant workspace isolation with RBAC (owner, admin, member, viewer), environment-scoped projects (production, staging, development), and audit logs.',
      '6 configurable Business Outcome Monitors catch silent logical failures even when the underlying workflow runner reports execution success.',
      'Built-in deterministic root-cause fallback engine guarantees incident triage even without external LLM API keys.',
    ],
    technologies: [
      'Next.js 14',
      'TypeScript',
      'FastAPI',
      'PostgreSQL 16',
      'Redis 7 & Celery',
      'n8n API v1 & Webhooks',
      'Docker Compose',
    ],
    links: [
      { label: 'GitHub', url: verifiedLinks.flowSentryRepo },
      { label: 'Documentation', url: verifiedLinks.flowSentryDocs },
    ],
  },
  {
    id: 'vellum-research',
    code: 'SYS-04',
    name: 'Vellum Research',
    classification: 'Open-Source 14-Stage LangGraph AI Research & Citation Verification Workspace',
    domain: 'automation-reliability',
    status: 'Live Deployment · Vercel & Open-Source',
    statusType: 'live',
    shortDescription:
      'Methodical AI research workspace that decomposes complex questions into subquestions, executes multi-angle web discovery, cross-checks conflicting claims, validates every inline [n] citation, and exports Markdown/PDF reports.',
    problemAddressed:
      'Generic conversational chatbots blend verified facts with ungrounded hallucinations, omit conflicting evidence, and fabricate reference URLs that cannot be audited.',
    architectureSummary:
      'Implements a controlled 14-stage LangGraph state machine with pluggable search (Tavily / Mock) and LLM providers (Gemini / OpenAI-compatible), Trafilatura content extraction, SSRF guards, and deterministic inline citation verification.',
    architecturePipeline: [
      {
        stage: '01 / PLAN',
        node: 'Query Decomposition & Discovery',
        detail: 'Decomposes research questions into subquestions and runs two-stage domain-diverse web search.',
      },
      {
        stage: '02 / EXTRACT',
        node: 'SSRF-Guarded Content Extractor',
        detail: 'Canonical URL deduplication and clean readable extraction via Trafilatura & BeautifulSoup4.',
      },
      {
        stage: '03 / EVALUATE',
        node: 'Evidence & Contradiction Analyzer',
        detail: 'Classifies cross-source disagreements by scope, measurement, date, or genuine contradiction.',
      },
      {
        stage: '04 / VALIDATE',
        node: 'Deterministic Citation Verifier',
        detail: 'Ensures every inline [n] citation maps to a real collected source before exporting MD/PDF.',
      },
    ],
    technicalSpecifications: [
      'Controlled 14-stage LangGraph pipeline: understand_question → create_research_plan → generate_search_queries → search_web → deduplicate_sources → rank_sources → extract_source_content → extract_evidence → evaluate_evidence → cross_check_claims → identify_research_gaps → generate_report → validate_citations → save_research_results.',
      'Interactive React workspace featuring real-time SSE progress streaming, clickable inline [n] citation inspector, Recharts evidence analytics, and filterable Source Library.',
      'Security-first design with SSRF blocking for localhost/private IPs/metadata endpoints, JWT authentication, and per-user ownership isolation.',
    ],
    technologies: [
      'Python',
      'LangGraph',
      'FastAPI',
      'React & TypeScript',
      'Trafilatura',
      'Gemini & OpenAI APIs',
      'Vercel',
    ],
    links: [
      { label: 'Live Demo', sublabel: 'Vercel App', url: verifiedLinks.vellumResearchLive },
      { label: 'GitHub', url: verifiedLinks.vellumResearchRepo },
      { label: 'Documentation', url: verifiedLinks.vellumResearchDocs },
    ],
  },
  {
    id: 'repo-medic',
    code: 'SYS-05',
    name: 'RepoMedic',
    classification: 'Open-Source Software Repository Diagnostics & Health Auditor',
    domain: 'diagnostic-engine',
    status: 'Open-Source Engineering Tool',
    statusType: 'active',
    shortDescription:
      'Engineering diagnostic utility designed to audit software repositories for structural configuration drift, dependency risks, maintainability bottlenecks, and pre-deployment readiness.',
    problemAddressed:
      'Growing engineering repositories accumulate silent configuration drift, unpinned or conflicting dependencies, dead modules, and missing environment contracts that surface only during production build failures.',
    architectureSummary:
      'Performs static repository inspection across project manifests, directory topologies, environment templates, and build configurations to produce structured health assessments and actionable engineering checklists.',
    architecturePipeline: [
      {
        stage: '01 / SCAN',
        node: 'Repository Topology Walker',
        detail: 'Traverses source trees while respecting ignore rules and symlink safety boundaries.',
      },
      {
        stage: '02 / AUDIT',
        node: 'Manifest & Config Inspector',
        detail: 'Evaluates dependency hygiene, environment templates, and build/test pipeline definitions.',
      },
      {
        stage: '03 / SCORE',
        node: 'Risk & Debt Aggregator',
        detail: 'Classifies findings by severity across maintainability, security hygiene, and portability.',
      },
      {
        stage: '04 / REPORT',
        node: 'Remediation Plan Emitter',
        detail: 'Generates prioritized diagnostic summaries for developer review and CI pre-flight checks.',
      },
    ],
    technicalSpecifications: [
      'Read-only static inspection architecture ensuring source files and git working trees are never modified during auditing.',
      'Identifies configuration mismatches between local environment templates, package manifests, and CI/CD workflow definitions.',
      'Provides structured terminal and exportable diagnostic reports for engineering triage.',
    ],
    technologies: ['Python', 'Static Analysis', 'AST & Manifest Parsing', 'CLI Diagnostics', 'CI/CD Auditing'],
    links: [{ label: 'GitHub', sublabel: 'Developer Profile', url: verifiedLinks.github }],
  },
  {
    id: 'website-auditor',
    code: 'SYS-06',
    name: 'Website Auditor',
    classification: 'AI Automation System for Technical Web, SEO & Conversion Auditing',
    domain: 'automation-reliability',
    status: 'AI Automation Product',
    statusType: 'active',
    shortDescription:
      'Automated website inspection and intelligence pipeline that evaluates technical SEO, metadata completeness, security posture, performance signals, and structural conversion readiness.',
    problemAddressed:
      'Manual website and technical SEO audits require hours of fragmented inspection across DOM headers, SSL/security configurations, broken links, and content hierarchy, producing inconsistent client reports.',
    architectureSummary:
      'Combines automated page extraction and deterministic heuristic checks (HTTP headers, canonical tags, OpenGraph metadata, accessibility markers) with LLM-assisted synthesis to generate prioritized engineering remediation scorecards.',
    architecturePipeline: [
      {
        stage: '01 / CRAWL',
        node: 'Page & Header Extractor',
        detail: 'Captures HTTP response headers, DOM hierarchy, metadata tags, and asset links.',
      },
      {
        stage: '02 / EVALUATE',
        node: 'Technical Heuristic Matrix',
        detail: 'Audits SEO structure, security headers, accessibility rules, and performance bottlenecks.',
      },
      {
        stage: '03 / SYNTHESIZE',
        node: 'LLM Diagnostic Summarizer',
        detail: 'Translates raw technical findings into prioritized engineering tasks and business impact.',
      },
      {
        stage: '04 / EXPORT',
        node: 'Structured Audit Scorecard',
        detail: 'Outputs actionable diagnostic reports for engineering and digital transformation teams.',
      },
    ],
    technicalSpecifications: [
      'Combines deterministic rule evaluation with structured LLM synthesis so findings remain grounded in actual DOM and HTTP evidence.',
      'Designed for rapid technical due diligence and client digital transformation assessments.',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'LLM Integration', 'Automated Web Extraction', 'Technical Auditing'],
    links: [{ label: 'GitHub', sublabel: 'Developer Profile', url: verifiedLinks.github }],
  },
  {
    id: 'axios-insight',
    code: 'SYS-07',
    name: 'Axios Insight',
    classification: 'Live AI Document & Multi-File Data Intelligence Platform',
    domain: 'production-ai',
    status: 'Live Deployment · Vercel',
    statusType: 'live',
    shortDescription:
      'Workspace-based AI document and data analysis platform supporting multi-file uploads, conversational natural-language querying, automated dataset profiling, forecasting, and visual reporting.',
    problemAddressed:
      'Business and operations teams struggle to extract cross-document insights and statistical trends from scattered CSVs, spreadsheets, and reports without dedicated data analysts writing custom scripts.',
    architectureSummary:
      'Organizes uploads into persistent, workspace-scoped analysis environments where automated statistical profilers and LLM reasoning layers collaborate to generate charts, correlations, forecasts, and executive summaries.',
    architecturePipeline: [
      {
        stage: '01 / WORKSPACE',
        node: 'Multi-File Ingestion Layer',
        detail: 'Scopes uploaded datasets and documents into persistent, isolated analysis workspaces.',
      },
      {
        stage: '02 / PROFILE',
        node: 'Automated Data Profiler',
        detail: 'Computes schema distributions, missing-value diagnostics, and statistical correlations.',
      },
      {
        stage: '03 / QUERY',
        node: 'Conversational AI Analyst',
        detail: 'Translates natural-language questions into structured analytical operations and forecasts.',
      },
      {
        stage: '04 / VISUALIZE',
        node: 'Interactive Chart & Report Engine',
        detail: 'Renders visual dashboards and AI-synthesized business intelligence briefs.',
      },
    ],
    technicalSpecifications: [
      'Persistent workspace-scoped analysis workflows across multiple uploaded files.',
      'Combines automated dataset profiling, data quality analysis, correlation discovery, and forecasting in a unified web interface.',
      'Live production deployment accessible on Vercel with public source repository on GitHub.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'LLMs',
      'Document & Data AI',
      'Statistical Profiling',
      'Data Visualization',
      'Vercel',
    ],
    links: [
      { label: 'Live Demo', sublabel: 'Primary Deployment', url: verifiedLinks.axiosInsight },
      { label: 'Live Demo', sublabel: 'Workspace Build', url: verifiedLinks.axiosInsightWorkspace },
      { label: 'GitHub', sublabel: 'TahmidZ68/axios-insight', url: verifiedLinks.axiosInsightRepo },
    ],
  },
  {
    id: 'axios-talent',
    code: 'SYS-08',
    name: 'Axios Talent',
    classification: 'Live Multi-Tenant B2B AI Recruitment & Workforce Intelligence Platform',
    domain: 'production-ai',
    status: 'Live Deployment · Vercel',
    statusType: 'live',
    shortDescription:
      'Multi-tenant AI recruitment and HR operations platform featuring bulk CV screening, explainable per-job candidate matching, employee/department management, Workforce Intelligence analytics, and an HR Copilot.',
    problemAddressed:
      'Enterprise hiring teams and HR departments juggle disconnected ATS spreadsheets, manual CV screening, unstandardized interview evaluations, and scattered internal HR policy documents.',
    architectureSummary:
      'Built on React 18, TypeScript, and Supabase (PostgreSQL with Row Level Security and Edge Functions). Decouples the persistent CV pool (candidates) from per-job evaluations (candidate_matches) and integrates Groq LLM inference for explainable scoring and HR document automation.',
    architecturePipeline: [
      {
        stage: '01 / TENANCY',
        node: 'Supabase RLS & RBAC Core',
        detail: 'Organization-isolated database schema with server-side onboarding RPCs and role guards.',
      },
      {
        stage: '02 / SCREENING',
        node: 'Bulk CV Extraction & Matching',
        detail: 'Extracts PDF/DOCX text (unpdf/mammoth + OCR) and scores against JDs via Groq LLMs.',
      },
      {
        stage: '03 / PIPELINE',
        node: 'Application State & Interviews',
        detail: 'Tracks screened → shortlisted → interviewing → offered → hired with 0–10 rubric evaluations.',
      },
      {
        stage: '04 / INTELLIGENCE',
        node: 'HR Copilot & Workforce Analytics',
        detail: 'Postgres FTS Policy RAG assistant, HR document generator, Recharts funnels & Stripe billing.',
      },
    ],
    technicalSpecifications: [
      'Decoupled CV pool (candidates) and per-job applications (candidate_matches): upload 100+ CVs once and re-match existing candidates against new job descriptions without re-uploading.',
      'Explainable match scoring across skills, experience, education, and keywords with one-click full-dataset CSV exports.',
      'Includes Employee & Department rosters, AI interview question generation, Postgres Full-Text Search Policy Assistant, and three-layer plan gating (RLS, Edge Function ai-proxy, and route Guards).',
    ],
    technologies: [
      'React 18',
      'TypeScript',
      'Supabase (PostgreSQL & RLS)',
      'Supabase Edge Functions',
      'Groq LLM API',
      'Recharts',
      'Tailwind CSS',
      'Vercel',
    ],
    links: [
      { label: 'Live Demo', sublabel: 'Recruiter & HR Platform', url: verifiedLinks.axiosTalent },
      { label: 'GitHub', sublabel: 'Profile', url: verifiedLinks.github },
    ],
  },
  {
    id: 'axios-talent-candidate',
    code: 'SYS-09',
    name: 'Axios Talent Candidate',
    classification: 'Live Candidate-Facing Career Intelligence & ATS Optimization Portal',
    domain: 'production-ai',
    status: 'Live Deployment · Vercel',
    statusType: 'live',
    shortDescription:
      'Dedicated candidate-facing web application providing AI-powered CV analysis, job-description compatibility evaluation, actionable resume optimization feedback, and cover-letter generation.',
    problemAddressed:
      'Job applicants rarely receive transparent, structured feedback on why their resumes fail ATS filters or how their documented skills align with specific job descriptions.',
    architectureSummary:
      'Complements the Axios Talent enterprise ecosystem with a specialized candidate workspace focused on document parsing, semantic resume-to-JD gap analysis, and guided application preparation.',
    architecturePipeline: [
      {
        stage: '01 / PARSE',
        node: 'Resume Structure Extractor',
        detail: 'Parses candidate CVs into structured skill, experience, and qualification segments.',
      },
      {
        stage: '02 / ALIGN',
        node: 'JD Compatibility Evaluator',
        detail: 'Measures semantic overlap and identifies missing domain keywords against target roles.',
      },
      {
        stage: '03 / OPTIMIZE',
        node: 'CV & Cover-Letter Copilot',
        detail: 'Generates targeted resume bullet improvements and role-aligned cover letters.',
      },
      {
        stage: '04 / PREPARE',
        node: 'Readiness Feedback Loop',
        detail: 'Delivers clear, actionable scoring breakdowns before candidates submit applications.',
      },
    ],
    technicalSpecifications: [
      'Built specifically for job seekers as the candidate-facing counterpart to Axios Talent.',
      'Delivers ATS-oriented resume evaluation, skill-gap diagnostics, CV optimization suggestions, and cover-letter assistance.',
      'Deployed live on Vercel.',
    ],
    technologies: ['React', 'TypeScript', 'LLMs & NLP', 'Document AI', 'ATS Compatibility Analysis', 'Vercel'],
    links: [
      { label: 'Live Demo', sublabel: 'Candidate Application', url: verifiedLinks.axiosTalentCandidate },
      { label: 'GitHub', sublabel: 'Profile', url: verifiedLinks.github },
    ],
  },
];

export const researchLabData = {
  headerCode: '04 // RESEARCH & PUBLICATIONS',
  headline: 'Empirical machine learning, deep-learning classification, and domain-generalized computer vision.',
  thesisTitle: 'Meta-Learning and Explainable AI for Domain-Generalized Computer Vision Systems',
  thesisDescription:
    'Standard computer vision models achieve high accuracy on curated benchmarks yet degrade sharply under real-world optical noise, sensor variation, and environmental distribution shifts. My research investigates adaptive pipelines that diagnose degradation first, apply targeted restoration, and maintain interpretable feature representations.',
  interests: [
    'Computer Vision',
    'Deep Learning',
    'Explainable AI',
    'Domain Generalization',
    'Pattern Recognition',
    'Image Processing',
    'Robust Machine Learning',
  ],
  adaptivePipeline: [
    {
      step: 'STAGE 01',
      title: 'Degradation Classification',
      detail: 'Quantify optical noise, illumination shift, blur, or compression artifacts in raw input frames.',
    },
    {
      step: 'STAGE 02',
      title: 'Adaptive Restoration',
      detail: 'Route degraded representations through conditioned enhancement modules rather than uniform filters.',
    },
    {
      step: 'STAGE 03',
      title: 'Robust Object Detection & Attribution',
      detail: 'Execute detection/classification on restored features with explainable saliency verification.',
    },
  ],
  publications: [
    {
      id: 'res-01',
      code: 'PUB-2023-A',
      title: 'Autism Disease Detection Using Classification Algorithms',
      venue: 'Research Publication / Conference Work (ICDMIS)',
      year: '2023',
      status: 'Published',
      category: 'published',
      contribution:
        'Evaluated and benchmarked supervised machine-learning classification algorithms on clinical and behavioral tabular screening features for early autism spectrum detection.',
      methodology:
        'Feature preprocessing, comparative supervised classification modeling, cross-validation analysis, and diagnostic metric evaluation.',
      keywords: ['Machine Learning', 'Classification Algorithms', 'Clinical Screening', 'Tabular Data'],
      paperUrl: verifiedLinks.papers.autismClassification,
      repoUrl: verifiedLinks.autismNumericRepo,
    },
    {
      id: 'res-02',
      code: 'PUB-2022-A',
      title: 'Autism Detecting Model Using Image (Deep Learning / VGG19 & CNN Architectures)',
      venue: 'Research Publication',
      year: '2022',
      status: 'Published',
      category: 'published',
      contribution:
        'Investigated image-based autism detection using deep convolutional neural networks and transfer-learning representations (including VGG19 / CNN architectures).',
      methodology:
        'Image preprocessing, convolutional feature extraction, transfer learning, and classification evaluation on facial/image datasets.',
      keywords: ['Deep Learning', 'CNN', 'VGG19', 'Transfer Learning', 'Image Classification'],
      paperUrl: verifiedLinks.papers.autismImageVgg19,
      repoUrl: verifiedLinks.autismImageRepo,
    },
    {
      id: 'res-03',
      code: 'PUB-2023-B',
      title: 'Rainwater Harvesting and Reducing Biological Threat of Utilizing It',
      venue: 'Research Publication / Conference Work (Paper ID 403)',
      year: '2023',
      status: 'Published',
      category: 'published',
      contribution:
        'Analyzed sustainable rainwater collection architectures and engineered mitigation strategies to reduce biological contamination threats in harvested water utilization.',
      methodology:
        'Environmental systems analysis, biological hazard assessment, and sustainable resource engineering.',
      keywords: ['Sustainability Engineering', 'Biological Threat Mitigation', 'Resource Systems'],
      paperUrl: verifiedLinks.papers.rainwaterHarvesting,
    },
    {
      id: 'res-04',
      code: 'PUB-2022-B',
      title: 'Start-Up Success Prediction Using Classification Algorithms',
      venue: 'Research Publication',
      year: '2022',
      status: 'Published',
      category: 'published',
      contribution:
        'Developed supervised classification models to predict venture viability and startup success outcomes from multi-variable historical business indicators.',
      methodology:
        'Exploratory data analysis, feature selection, supervised classification benchmarking, and predictive evaluation.',
      keywords: ['Predictive Modeling', 'Classification Algorithms', 'Data Science', 'Venture Analytics'],
      paperUrl: verifiedLinks.papers.startupPrediction,
      repoUrl: verifiedLinks.startupPredictionRepo,
    },
    {
      id: 'res-05',
      code: 'RES-2023-BAU',
      title: 'Detecting the Harvesting Time of Spirulina Using Deep Learning Techniques',
      venue: 'Bangladesh Agricultural University (Dept. of Horticulture) & East West University Capstone Grant',
      year: '2022–2023',
      status: 'Funded Capstone & Pre-Publication',
      category: 'ongoing',
      contribution:
        'Constructed the first Spirulina growth image dataset of its kind in Bangladesh across 20 consecutive days of laboratory observation and trained CNN models as a low-cost optical alternative to spectrometer-based harvesting assessment.',
      methodology:
        '20-day daily laboratory data acquisition at BAU Lab of Dr. Abul Faiz Md. Jamal Uddin, custom image/color preprocessing pipeline, and CNN architecture tuning (funded by East West University, USD 120 grant).',
      keywords: ['Agricultural Computer Vision', 'CNN', 'Novel Dataset (Bangladesh)', 'EWU Funded Grant'],
    },
    {
      id: 'res-06',
      code: 'EXP-ML-SUITE',
      title: 'Medical Imaging (COVID-19, Pneumonia & Brain Tumor), Bangla RAG & Applied ML Repositories',
      venue: 'Open-Source Experimental Research & ML Benchmarks',
      year: '2022–2025',
      status: 'Experimental Research',
      category: 'experimental',
      contribution:
        'Developed and open-sourced deep-learning CNN pipelines for COVID-19/Pneumonia chest X-ray diagnosis and Brain Tumor prediction, a Bangla HSC Retrieval-Augmented Generation (RAG) system, collaborative filtering book recommendation, and real-estate regression models.',
      methodology:
        'Radiographic image normalization, CNN classification, retrieval-augmented generation (RAG_BanglaHSC), TF-IDF text representation, collaborative filtering similarity matrices, and supervised regression.',
      keywords: ['COVID-19 & Pneumonia CNN', 'Brain Tumor Prediction', 'RAG_BanglaHSC', 'Collaborative Filtering'],
      paperUrl: verifiedLinks.kaggle,
      repoUrl: verifiedLinks.covidPneumoniaRepo,
      secondaryRepoUrl: verifiedLinks.ragBanglaHscRepo,
      secondaryRepoLabel: 'RAG_BanglaHSC Repo',
    },
  ] as ResearchItem[],
};

export const openQuestionsData: OpenQuestionItem[] = [
  {
    id: 'oq-01',
    code: 'OQ // 01',
    domain: 'COMPUTER VISION & DOMAIN GENERALIZATION',
    question: 'How can vision pipelines remain calibrated when deployment optics degrade outside training distributions?',
    context:
      'Models trained on clean benchmark imagery lose localization and classification stability when exposed to motion blur, sensor noise, poor lighting, or compression in field environments.',
    failureMode:
      'End-to-end detectors silently drop recall or produce high-confidence false positives when high-frequency spatial features are corrupted.',
    investigativeDirection:
      'Decoupling degradation classification from downstream inference—routing inputs through condition-specific adaptive restoration before object detection.',
    relatedSystem: 'Adaptive CV Pipeline & Spirulina Optical Assessment',
  },
  {
    id: 'oq-02',
    code: 'OQ // 02',
    domain: 'DATASET INTEGRITY & REPRODUCIBILITY',
    question: 'How do we guarantee zero cross-split leakage and deterministic dataset provenance before GPU training begins?',
    context:
      'In medical and agricultural imaging, near-duplicate frames from the same patient, video stream, or capture session routinely leak across train, validation, and test splits.',
    failureMode:
      'Models memorize patient- or session-specific background artifacts, yielding 98%+ validation accuracy that collapses on truly held-out clinical or laboratory cohorts.',
    investigativeDirection:
      'Combining SHA-256 content hashes, perceptual pHash near-duplicate clustering, and group-aware metadata tracking (patient_id, capture_session) into pre-training CI gates.',
    relatedSystem: 'DatasetMedic (v0.2.0)',
  },
  {
    id: 'oq-03',
    code: 'OQ // 03',
    domain: 'EXPLAINABLE AI IN HIGH-STAKES CLASSIFICATION',
    question: 'What separates genuine morphological feature attribution from spurious correlation in clinical and biological CNNs?',
    context:
      'Deep convolutional networks applied to medical X-rays, autism image screening, or biological culture assessment often latch onto framing markers or illumination bias.',
    failureMode:
      'Black-box predictions offer no audit trail for domain experts (clinicians or horticulturists) to verify whether the model attended to relevant biological structures.',
    investigativeDirection:
      'Integrating spatial attribution checks, perturbation testing, and hybrid tabular-plus-visual feature evaluation.',
    relatedSystem: 'Autism & Medical Imaging Classification Studies',
  },
  {
    id: 'oq-04',
    code: 'OQ // 04',
    domain: 'AI AGENT EVALUATION & DETERMINISTIC BOUNDARIES',
    question: 'Where should deterministic static analysis end and probabilistic LLM reasoning begin in developer and research tools?',
    context:
      'Purely LLM-driven debugging and research agents frequently hallucinate root causes, fabricate citations, or fail when API keys hit quota limits.',
    failureMode:
      'Unbounded agents apply destructive code patches, cite non-existent URLs, or miss straightforward schema/auth violations that a deterministic parser catches with 100% precision.',
    investigativeDirection:
      'Architecting deterministic-first engines (API Detective’s 43 local checks, Vellum Research’s deterministic inline [n] citation validator, and FlowSentry’s outcome verifiers) where LLMs operate strictly within evidence-bounded synthesis.',
    relatedSystem: 'API Detective, Vellum Research & FlowSentry',
  },
  {
    id: 'oq-05',
    code: 'OQ // 05',
    domain: 'PRODUCTION AUTOMATION RELIABILITY',
    question: 'How do we detect silent business failures when distributed workflows return HTTP 200 OK?',
    context:
      'Modern operations rely on multi-step webhook and LLM automations where transport-layer success does not equal business-layer completion.',
    failureMode:
      'An orchestration node succeeds syntactically with an empty payload or skipped branch, leaving downstream databases out of sync without triggering a single error alert.',
    investigativeDirection:
      'Continuous business-outcome verification—asserting expected record creation, field contracts, and cadence intervals independently of workflow runner exit codes.',
    relatedSystem: 'FlowSentry Outcome Monitors',
  },
];

export const evolutionData: EvolutionEntry[] = [
  {
    id: 'evo-01',
    period: 'JUNE 2025 — PRESENT',
    type: 'ENGINEERING & LEADERSHIP',
    role: 'Chief Business Officer (CBO) & AI Engineer',
    organization: 'Axios Station',
    orgUrl: verifiedLinks.axiosStation,
    location: 'Dhaka, Bangladesh',
    summary:
      'Lead AI-powered software development, API integration, database architecture, and product engineering across Axios Station’s AI application portfolio.',
    details: [
      'Architect and ship multi-tenant AI platforms including Axios Talent (recruitment & HR intelligence) and Axios Insight (multi-file document/data analysis).',
      'Develop AI automation solutions, database-driven applications, and operational chatbot systems (Axios Station AMS).',
      'Design and integrate LLM features spanning resume/JD matching, policy RAG assistants, document extraction, and business intelligence.',
      'Align technical system architecture with commercial product strategy from initial problem framing to live production deployment.',
    ],
  },
  {
    id: 'evo-02',
    period: 'DEC 2023 — AUG 2026',
    type: 'BUSINESS & STRATEGY',
    role: 'Business Development Executive',
    organization: 'Talent Centric / Go Global',
    location: 'Dhaka, Bangladesh',
    summary:
      'Managed lead generation, client communication, and strategic relationship management for international education consultancy operations.',
    details: [
      'Led strategic discussions and cross-functional collaboration to support client acquisition and operational growth.',
      'Grounded subsequent AI product engineering in direct experience with commercial workflows, client bottlenecks, and operational decision-making.',
    ],
  },
  {
    id: 'evo-03',
    period: 'NOV 2023 — NOV 2024',
    type: 'AI ARCHITECTURE',
    role: 'AI Solutions Architect & Business Development Lead',
    organization: 'AI Alchemy Hub',
    location: 'Dhaka, Bangladesh',
    summary:
      'Conducted enterprise AI maturity assessments and engineered machine-learning proof-of-concept solutions for client engagements.',
    details: [
      'Evaluated client data readiness and designed practical ML/AI proof-of-concept architectures.',
      'Performed technical AI/ML market research and authored technical solution documentation and client communications.',
      'Bridged technical scoping and business development for custom AI solution delivery.',
    ],
  },
  {
    id: 'evo-04',
    period: '2019 — 2024',
    type: 'UNIVERSITY EDUCATION',
    role: 'B.Sc. in Computer Science and Engineering',
    organization: 'East West University',
    location: 'Dhaka, Bangladesh',
    summary:
      'Major in Data Science & Intelligent Systems. CGPA: 3.04 / 4.00 (Last 34 Credits: 3.33 / 4.00). Awarded undergraduate capstone research funding (USD 120).',
    details: [
      'Core coursework: Machine Learning, Artificial Intelligence, Data Mining, Pattern Recognition, Data Science.',
      'Served as General Secretary of the EWU Computer Programming Club, organizing technical events, programming initiatives, and student engineering activities.',
    ],
  },
  {
    id: 'evo-05',
    period: 'APR 2022 — AUG 2022',
    type: 'ACADEMIC RESEARCH',
    role: 'Research Assistant',
    organization: 'Bangladesh Agricultural University (BAU)',
    location: 'Mymensingh, Bangladesh',
    summary:
      'Conducted experimental data collection and deep-learning computer vision research in the Lab of Dr. Abul Faiz Md. Jamal Uddin (Department of Horticulture).',
    details: [
      'Collected and managed daily laboratory observations across 20 consecutive days for Spirulina harvesting-time prediction.',
      'Engineered an image preprocessing pipeline and constructed a novel image dataset—noted as the first dataset of its kind in Bangladesh.',
      'Developed and tuned CNN-based deep-learning models as a low-cost alternative to spectrometer assessment, supporting manuscript preparation and grant approval.',
    ],
  },
];

export const axiosStationData = {
  headerCode: '07 // AXIOS STATION',
  roleTitle: 'Chief Business Officer & AI Engineer',
  tenure: 'June 2025 — Present',
  companyName: 'Axios Station',
  companyUrl: verifiedLinks.axiosStation,
  headline: 'Translating AI capabilities into production software systems and operational business leverage.',
  overview:
    'At Axios Station, I operate across both engineering execution and commercial product strategy. Rather than shipping isolated AI demos, we build full-stack, database-driven software platforms where LLMs, document intelligence, and workflow automation solve concrete organizational bottlenecks.',
  pillars: [
    {
      code: 'AX-01',
      title: 'AI Product Development',
      detail:
        'End-to-end engineering of flagship platforms including Axios Talent (multi-tenant recruitment & HR intelligence), Axios Insight (workspace-scoped data & document BI), and Axios Talent Candidate.',
    },
    {
      code: 'AX-02',
      title: 'AI Automation & AMS',
      detail:
        'Building Axios Station AMS (Business Automation Platform) and operational chatbot systems that automate repetitive document processing, internal policy queries, and management workflows.',
    },
    {
      code: 'AX-03',
      title: 'Intelligent Software Architecture',
      detail:
        'Designing multi-tenant relational schemas (PostgreSQL / Supabase with Row Level Security), server-side RPCs, Edge Functions, and resilient API integrations.',
    },
    {
      code: 'AX-04',
      title: 'Technical & Business Strategy',
      detail:
        'Bridging commercial discovery and technical scoping—defining product tiers, unit-economics-aware AI quotas, and deployment roadmaps that align with real client workflows.',
    },
    {
      code: 'AX-05',
      title: 'Digital Transformation',
      detail:
        'Helping organizations replace fragmented spreadsheets and rigid legacy tools with tailored, data-backed operational software.',
    },
  ],
};

export const technologyMatrixData: TechMatrixCategory[] = [
  {
    code: 'MAT-01',
    category: 'Programming Languages',
    description: 'Core languages used across production backends, ML pipelines, data analysis, and frontend interfaces.',
    items: [
      { name: 'Python', tier: 'Core Proficiency', context: 'Primary language for ML, CV, FastAPI backends & CLI tools' },
      { name: 'SQL', tier: 'Core Proficiency', context: 'PostgreSQL schemas, Supabase RLS policies, analytical queries' },
      { name: 'JavaScript / TypeScript', tier: 'Core Proficiency', context: 'React 18, Next.js 14, full-stack web applications' },
      { name: 'R', tier: 'Applied / Working', context: 'Statistical analysis and academic data modeling' },
      { name: 'C / C++', tier: 'Applied / Working', context: 'Algorithmic foundations and systems coursework' },
      { name: 'Java', tier: 'Applied / Working', context: 'Object-oriented software development' },
    ],
  },
  {
    code: 'MAT-02',
    category: 'AI / Machine Learning & Computer Vision',
    description: 'Frameworks and methodologies applied across published research, medical/agricultural imaging, and LLM products.',
    items: [
      { name: 'Deep Learning & CNNs (VGG19, YOLO)', tier: 'Core Proficiency', context: 'Image classification, object detection, Spirulina & X-ray studies' },
      { name: 'Computer Vision & OpenCV', tier: 'Core Proficiency', context: 'Image preprocessing, adaptive restoration, DatasetMedic auditing' },
      { name: 'LLM Applications & LangGraph Agents', tier: 'Core Proficiency', context: 'OpenAI, Groq & Gemini APIs, Vellum Research, HR Copilot' },
      { name: 'Document AI, OCR & NLP', tier: 'Core Proficiency', context: 'PDF/DOCX parsing, resume/JD matching, Bangla & Policy RAG' },
      { name: 'Scikit-learn, Pandas & NumPy', tier: 'Core Proficiency', context: 'Supervised classification, regression, tabular data profiling' },
      { name: 'TensorFlow & Keras', tier: 'Core Proficiency', context: 'CNN model training, transfer learning & experimental evaluation' },
      { name: 'PyTorch', tier: 'Applied / Working', context: 'Deep learning experimentation and vision model pipelines' },
      { name: 'Explainable AI & Domain Generalization', tier: 'Core Proficiency', context: 'Active research focus on robust visual systems' },
    ],
  },
  {
    code: 'MAT-03',
    category: 'Systems & Full-Stack Engineering',
    description: 'Production infrastructure used to build, secure, and deploy multi-tenant web applications and diagnostic tools.',
    items: [
      { name: 'FastAPI & Pydantic v2', tier: 'Core Proficiency', context: 'API Detective, FlowSentry & Vellum Research backend services' },
      { name: 'React 18 & Next.js 14', tier: 'Core Proficiency', context: 'Axios Talent, Axios Insight, FlowSentry & interactive workspaces' },
      { name: 'PostgreSQL & Supabase (RLS / Edge Functions)', tier: 'Core Proficiency', context: 'Multi-tenant data isolation, auth, storage & serverless functions' },
      { name: 'Redis & Celery', tier: 'Applied / Working', context: 'Asynchronous task queues, periodic monitors & webhook ingestion' },
      { name: 'Node.js', tier: 'Applied / Working', context: 'Web tooling, frontend build pipelines & runtime services' },
      { name: 'Docker & Docker Compose', tier: 'Core Proficiency', context: 'Containerized multi-service deployments and local reproducibility' },
    ],
  },
  {
    code: 'MAT-04',
    category: 'Developer, Analytics & Deployment Tools',
    description: 'Workflow, version control, visualization, and cloud hosting platforms used in daily engineering.',
    items: [
      { name: 'Git & GitHub', tier: 'Core Proficiency', context: 'Source control, open-source releases & CI/CD workflows' },
      { name: 'Vercel', tier: 'Core Proficiency', context: 'Production deployment for Axios Insight, Axios Talent, Vellum & Portfolio' },
      { name: 'Jupyter & Google Colab', tier: 'Core Proficiency', context: 'ML experimentation, dataset exploration & model training' },
      { name: 'Matplotlib, Seaborn, Tableau & Power BI', tier: 'Core Proficiency', context: 'Scientific plotting, statistical visualization & BI dashboards' },
    ],
  },
];

export const currentVectorData = {
  headerCode: '09 // CURRENT VECTOR',
  vectorBanner: 'AI AGENTS / AUTOMATION / INTELLIGENT SYSTEMS',
  statement:
    'Moving beyond prompt wrappers toward deterministic-first AI systems, self-verifying workflow automation, and domain-generalized computer vision.',
  trajectories: [
    {
      code: 'VEC-01',
      status: 'ACTIVE DEVELOPMENT',
      title: 'Deterministic-Bounded Diagnostic & Research Agents',
      description:
        'Combining multi-step agent planning with strict local verification—exemplified by API Detective’s 7-step root-cause investigator and Vellum Research’s 14-stage citation-validated LangGraph pipeline.',
      focusTags: ['Agent Reliability', 'Citation Verification', 'Controlled Code Repair'],
    },
    {
      code: 'VEC-02',
      status: 'ACTIVE DEVELOPMENT',
      title: 'Workflow Execution & Business-Outcome Intelligence',
      description:
        'Advancing FlowSentry’s observability architecture for n8n and API-driven automations to eliminate silent 200-OK failures, suppress duplicate alert storms, and verify downstream business outcomes.',
      focusTags: ['n8n Reliability', 'Incident Fingerprinting', 'Outcome Monitors'],
    },
    {
      code: 'VEC-03',
      status: 'PRODUCTION EXPANSION',
      title: 'Enterprise AI Operations at Axios Station',
      description:
        'Expanding Axios Talent, Axios Insight, and Axios Station AMS (Business Automation Platform) with deeper workspace memory, policy-grounded RAG, and automated operational workflows.',
      focusTags: ['Axios Station AMS', 'Multi-Tenant SaaS', 'Document & HR Intelligence'],
    },
    {
      code: 'VEC-04',
      status: 'ONGOING RESEARCH',
      title: 'Pre-Training Dataset Hygiene & Adaptive Computer Vision',
      description:
        'Extending DatasetMedic’s cross-split leakage and reproducibility fingerprinting while exploring degradation-aware adaptive object detection for low-quality visual environments.',
      focusTags: ['DatasetMedic', 'Domain Generalization', 'Explainable Computer Vision'],
    },
  ],
};

export const signalData: SignalEntry[] = [
  {
    id: 'sig-01',
    code: 'NOTE-01',
    type: 'SYSTEMS ARCHITECTURE',
    date: 'FLOWSENTRY ARCHITECTURE',
    title: 'Why HTTP 200 OK Is Not a Business Outcome in Production Workflow Automation',
    abstract:
      'Workflow runners report transport success even when an automation branch silently drops a record. True automation reliability requires monitoring business invariants independently of execution status codes.',
    keyTakeaways: [
      'A webhook or n8n node can return 200 OK with an empty array or malformed field, causing silent downstream data loss.',
      'Grouping recurring HTTP 429/401 errors via deterministic incident fingerprinting prevents alert fatigue during third-party outages.',
      'Pairing bounded LLM root-cause analysis with a deterministic fallback engine ensures triage works even when AI provider quotas are exhausted.',
    ],
    externalUrl: verifiedLinks.flowSentryRepo,
    externalLabel: 'View FlowSentry on GitHub',
  },
  {
    id: 'sig-02',
    code: 'NOTE-02',
    type: 'ENGINEERING NOTE',
    date: 'DATASETMEDIC FORENSICS',
    title: 'Auditing Cross-Split Data Leakage Before Training Computer Vision Models',
    abstract:
      'High validation accuracy in classification and object detection is frequently an artifact of near-duplicate frames or ungrouped patient/session images leaking across train and test splits.',
    keyTakeaways: [
      'File-name separation across train/val/test folders does not prevent identical byte streams (SHA-256) or consecutive video frames (pHash) from contaminating evaluation.',
      'In clinical and laboratory datasets, leakage must be tracked at the logical group level (patient_id, capture_session, video_id) rather than individual image files.',
      'Read-only dataset profiling with deterministic content fingerprints enables reproducible comparisons across dataset versions.',
    ],
    externalUrl: verifiedLinks.datasetMedicRepo,
    externalLabel: 'View DatasetMedic on GitHub',
  },
  {
    id: 'sig-03',
    code: 'NOTE-03',
    type: 'SYSTEMS ARCHITECTURE',
    date: 'VELLUM RESEARCH & API DETECTIVE',
    title: 'Deterministic Guardrails for Autonomous Debugging and Research Agents',
    abstract:
      'Why multi-step AI agents need deterministic pre-checks, strict state-machine retry caps, and post-generation verification to prevent hallucinated fixes and ungrounded citations.',
    keyTakeaways: [
      'In API Detective, running 43 local deterministic checks before invoking LLM synthesis guarantees 100% recall on known schema, JWT, and TLS issues without spending a single token.',
      'In Vellum Research, separating claim extraction from deterministic inline [n] citation validation prevents fabricated URLs from entering final research reports.',
    ],
    externalUrl: verifiedLinks.vellumResearchLive,
    externalLabel: 'Launch Vellum Research (Vercel)',
  },
  {
    id: 'sig-04',
    code: 'PAPER-01',
    type: 'RESEARCH PAPER',
    date: 'PUBLISHED · 2023',
    title: 'Autism Disease Detection Using Classification Algorithms',
    abstract:
      'Comparative study evaluating supervised classification algorithms for autism spectrum screening on structured clinical and behavioral datasets.',
    keyTakeaways: [
      'Systematic preprocessing and feature evaluation across classification algorithms improve diagnostic sensitivity on tabular screening cohorts.',
      'Complements image-based deep-learning approaches by providing interpretable feature-level classification benchmarks.',
    ],
    externalUrl: verifiedLinks.papers.autismClassification,
    externalLabel: 'Read Paper on ResearchGate',
  },
  {
    id: 'sig-05',
    code: 'PAPER-02',
    type: 'RESEARCH PAPER',
    date: 'PUBLISHED · 2022',
    title: 'Autism Detecting Model Using Image (Deep Learning / CNN)',
    abstract:
      'Deep-learning investigation applying convolutional neural networks and transfer learning to image-based autism detection.',
    keyTakeaways: [
      'Explores hierarchical visual feature extraction and transfer-learning architectures for medical/behavioral image classification.',
      'Highlights the importance of dataset curation and image preprocessing in clinical computer vision tasks.',
    ],
    externalUrl: verifiedLinks.papers.autismImageVgg19,
    externalLabel: 'Read Paper on ResearchGate',
  },
  {
    id: 'sig-06',
    code: 'NOTE-04',
    type: 'RESEARCH PAPER',
    date: 'BAU & EWU GRANT · 2022–2023',
    title: 'Optical CNN Assessment vs. Spectrometry in Spirulina Harvesting-Time Prediction',
    abstract:
      'Notes from 20 consecutive days of laboratory data acquisition at Bangladesh Agricultural University developing an image/color-based deep-learning alternative to costly spectrometer testing.',
    keyTakeaways: [
      'Laboratory spectrometers provide accurate optical density readings for micro-algae harvesting but remain cost-prohibitive for small-scale producers.',
      'By capturing standardized daily imagery across the 20-day growth cycle, CNN models learn colorimetric and density cues correlated with optimal harvesting maturity.',
      'Funded by an East West University undergraduate research grant (USD 120), establishing the first dataset of its kind in Bangladesh.',
    ],
    externalUrl: verifiedLinks.kaggle,
    externalLabel: 'Explore ML Work on Kaggle',
  },
];
