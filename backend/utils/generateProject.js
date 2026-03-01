const projectTemplates = {
  'Web Development': {
    MERN: {
      titles: [
        'Smart College Event Management System',
        'Student Marketplace Platform',
        'Online Examination Portal',
        'Campus Placement Tracker',
        'E-Learning Management System'
      ],
      stack: {
        frontend: ['React.js', 'TailwindCSS', 'Axios', 'Redux Toolkit'],
        backend: ['Node.js', 'Express.js', 'JWT'],
        database: ['MongoDB', 'Mongoose'],
        tools: ['VSCode', 'Postman', 'GitHub', 'Vercel', 'Render']
      }
    },
    Python: {
      titles: [
        'Flask-Based Student Portal',
        'Django College Management System',
        'Academic Resource Sharing Platform',
        'Attendance Management Web App',
        'Online Fee Payment System'
      ],
      stack: {
        frontend: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
        backend: ['Python', 'Flask / Django', 'REST APIs'],
        database: ['PostgreSQL', 'SQLite'],
        tools: ['PyCharm', 'pgAdmin', 'GitHub', 'Heroku']
      }
    },
    Java: {
      titles: [
        'Spring Boot Student Information System',
        'Java-Based Library Management System',
        'College ERP Web Application',
        'Online Admission Portal',
        'Faculty Performance Tracker'
      ],
      stack: {
        frontend: ['HTML5', 'CSS3', 'Thymeleaf', 'Bootstrap 5'],
        backend: ['Java', 'Spring Boot', 'Spring Security'],
        database: ['MySQL', 'Hibernate JPA'],
        tools: ['IntelliJ IDEA', 'MySQL Workbench', 'Maven', 'GitHub']
      }
    }
  },
  'AI & ML': {
    Python: {
      titles: [
        'Student Performance Prediction System',
        'AI-Based Resume Screening Tool',
        'Sentiment Analysis of Exam Feedback',
        'Fake News Detection System',
        'Disease Prediction Using ML'
      ],
      stack: {
        frontend: ['Streamlit', 'HTML5', 'CSS3'],
        backend: ['Python', 'Flask', 'Scikit-learn'],
        database: ['MongoDB', 'CSV Datasets'],
        tools: ['Jupyter Notebook', 'Google Colab', 'GitHub', 'Kaggle']
      }
    },
    ML: {
      titles: [
        'Face Recognition Attendance System',
        'Crop Disease Detection Using CNN',
        'Handwritten Digit Recognition',
        'Emotion Detection from Images',
        'Stock Price Prediction with LSTM'
      ],
      stack: {
        frontend: ['Streamlit', 'Tkinter'],
        backend: ['Python', 'TensorFlow / Keras', 'OpenCV'],
        database: ['SQLite', 'Pandas DataFrames'],
        tools: ['Google Colab', 'VS Code', 'Kaggle', 'GitHub']
      }
    }
  },
  'Data Science': {
    Python: {
      titles: [
        'Student Grade Analytics Dashboard',
        'COVID-19 Data Visualization Project',
        'E-Commerce Sales Analysis',
        'Social Media Trend Analysis',
        'Real Estate Price Prediction'
      ],
      stack: {
        frontend: ['Plotly Dash', 'Streamlit'],
        backend: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
        database: ['CSV Datasets', 'SQLite', 'BigQuery'],
        tools: ['Jupyter Notebook', 'Google Colab', 'Power BI', 'GitHub']
      }
    }
  },
  IoT: {
    Python: {
      titles: [
        'Smart Home Automation System',
        'IoT-Based Attendance System with RFID',
        'Smart Agriculture Monitoring',
        'Health Monitoring Wearable System',
        'Smart Parking Management System'
      ],
      stack: {
        frontend: ['HTML5', 'CSS3', 'JavaScript', 'MQTT Dashboard'],
        backend: ['Python', 'Flask', 'MQTT Protocol'],
        database: ['InfluxDB', 'MongoDB'],
        tools: ['Arduino IDE', 'Raspberry Pi', 'Node-RED', 'Fritzing']
      }
    }
  },
  Cybersecurity: {
    Python: {
      titles: [
        'Network Intrusion Detection System',
        'Password Strength Analyzer & Manager',
        'Phishing URL Detection Tool',
        'Secure File Encryption Application',
        'Vulnerability Scanner for Web Apps'
      ],
      stack: {
        frontend: ['Tkinter', 'HTML5', 'Bootstrap 5'],
        backend: ['Python', 'Flask', 'Cryptography Library'],
        database: ['SQLite', 'MongoDB'],
        tools: ['Wireshark', 'Kali Linux', 'GitHub', 'VS Code']
      }
    }
  },
  'Mobile App': {
    MERN: {
      titles: [
        'React Native Student Planner App',
        'Campus Navigation Mobile App',
        'Study Group Finder Application',
        'Digital Notepad with Sync',
        'College Bus Tracker App'
      ],
      stack: {
        frontend: ['React Native', 'Expo', 'NativeWind'],
        backend: ['Node.js', 'Express.js'],
        database: ['MongoDB', 'AsyncStorage'],
        tools: ['Expo Go', 'Android Studio', 'GitHub', 'Firebase']
      }
    }
  },
  Blockchain: {
    MERN: {
      titles: [
        'Certificate Verification on Blockchain',
        'Decentralized Voting System',
        'Student Merit NFT Platform',
        'Transparent Fee Payment Ledger',
        'Academic Record Management DApp'
      ],
      stack: {
        frontend: ['React.js', 'Web3.js', 'MetaMask'],
        backend: ['Node.js', 'Express.js', 'Solidity'],
        database: ['MongoDB', 'IPFS'],
        tools: ['Hardhat', 'Remix IDE', 'MetaMask', 'Alchemy']
      }
    }
  }
};

const getObjectives = (domain, difficulty) => {
  const base = [
    `Analyze existing ${domain} solutions and identify gaps`,
    `Design a scalable and user-friendly system architecture`,
    `Implement core modules with industry-standard practices`,
    `Perform testing to ensure reliability and security`,
    `Document the complete system for future enhancement`
  ];
  if (difficulty === 'Advanced') {
    base.push(`Integrate advanced algorithms and optimization techniques`);
    base.push(`Deploy the system on cloud infrastructure`);
  }
  return base;
};

const getModules = (domain, technology, difficulty) => {
  const common = [
    { name: 'User Authentication Module', description: 'Handles registration, login, JWT-based session management, and role-based access control.' },
    { name: 'Dashboard Module', description: 'Provides users with a central hub to view stats, recent activity, and key metrics.' },
    { name: 'Core Feature Module', description: `Primary functionality built around ${domain} operations with CRUD capabilities.` },
    { name: 'Notification Module', description: 'Sends alerts and updates to relevant stakeholders via email or in-app notifications.' },
    { name: 'Report & Analytics Module', description: 'Generates insightful reports and visual analytics for decision-making.' }
  ];
  if (difficulty !== 'Beginner') {
    common.push({ name: 'Admin Control Panel', description: 'Allows administrators to manage users, content, and system configurations.' });
  }
  if (difficulty === 'Advanced') {
    common.push({ name: 'AI/Recommendation Module', description: 'Uses ML models or rule-based logic to provide intelligent suggestions.' });
    common.push({ name: 'API Gateway & Integration Module', description: 'Manages third-party integrations and API rate limiting.' });
  }
  return common;
};

const getFutureScope = (domain) => [
  `Integration with real-time ${domain} data feeds for live updates`,
  `Mobile application development for Android and iOS platforms`,
  `Implementation of AI-driven insights and predictive analytics`,
  `Multi-language support for regional accessibility`,
  `Cloud deployment with auto-scaling and load balancing`,
  `Integration with popular third-party services and APIs`
];

const generateProjectContent = ({ stream, domain, technology, difficulty }) => {
  const domainTemplates = projectTemplates[domain] || projectTemplates['Web Development'];
  const techTemplates = domainTemplates[technology] || Object.values(domainTemplates)[0];

  const titlesList = techTemplates.titles;
  const title = titlesList[Math.floor(Math.random() * titlesList.length)];
  const stack = techTemplates.stack;

  const abstract = `This project presents the design and development of "${title}", a ${difficulty.toLowerCase()}-level ${domain} project built for ${stream} students. The system leverages ${technology} to address real-world challenges in the academic domain. It aims to provide an efficient, scalable, and user-friendly platform that streamlines existing processes and improves productivity. The application follows modern software engineering principles, including MVC architecture, RESTful API design, and secure authentication mechanisms. This project demonstrates the practical application of ${domain} concepts learned throughout the academic curriculum.`;

  const problemStatement = `Traditional approaches to managing ${domain.toLowerCase()} tasks are often manual, error-prone, and time-consuming. ${stream} students and institutions face significant challenges due to the lack of automated, integrated systems. The existing solutions are either too complex, costly, or not tailored to the academic environment. This project, "${title}", addresses these challenges by providing an automated, web-based platform that simplifies workflows, reduces manual effort, and improves overall efficiency. The system is designed keeping student accessibility and ease of use as core priorities.`;

  const methodology = `The project follows the Agile development methodology with iterative sprints:\n\n1. **Requirement Analysis**: Gathered requirements from students and faculty through surveys and interviews.\n2. **System Design**: Created UML diagrams including Use Case, ER Diagram, and Data Flow Diagrams.\n3. **Frontend Development**: Built responsive UI using ${stack.frontend.join(', ')}.\n4. **Backend Development**: Developed APIs using ${stack.backend.join(', ')}.\n5. **Database Design**: Designed normalized schema using ${stack.database.join(', ')}.\n6. **Testing**: Conducted unit testing, integration testing, and user acceptance testing (UAT).\n7. **Deployment**: Deployed on cloud platform with CI/CD pipeline.\n8. **Documentation**: Prepared full project report and technical documentation.`;

  const conclusion = `"${title}" successfully demonstrates the practical application of ${domain} concepts in an academic setting. The project achieves all defined objectives by delivering a ${difficulty.toLowerCase()}-level, fully functional system built with ${technology}. It provides a scalable, secure, and intuitive platform for ${stream} students and administrators. The system significantly reduces manual effort and improves operational efficiency. This project serves as a strong foundation for future enhancements including mobile integration, AI capabilities, and cloud scalability. It showcases proficiency in ${stack.frontend.concat(stack.backend).join(', ')} and modern software development practices.`;

  const systemArchitecture = `Three-Tier Architecture:\n\n[Presentation Layer (Client)]\n  └── Browser / React App\n       └── Communicates via HTTPS REST API\n\n[Application Layer (Server)]\n  └── ${stack.backend.join(' + ')}\n       └── Business Logic, Auth, API Routing\n\n[Data Layer (Database)]\n  └── ${stack.database.join(' + ')}\n       └── Persistent Storage, Queries\n\nDeployment: Frontend → Vercel/Netlify | Backend → Render/Railway | DB → MongoDB Atlas`;

  const flowDiagramDescription = `User Flow:\n1. User visits Landing Page\n2. User registers / logs in (JWT issued)\n3. User accesses Dashboard\n4. User performs core ${domain} operations\n5. System processes request via Express API\n6. Data stored/retrieved from ${stack.database[0]}\n7. Response rendered on UI\n8. Admin monitors activity via Admin Panel\n9. Reports/PDFs generated on demand`;

  return {
    title,
    abstract,
    problemStatement,
    objectives: getObjectives(domain, difficulty),
    modules: getModules(domain, technology, difficulty),
    technologyStack: stack,
    methodology,
    futureScope: getFutureScope(domain),
    conclusion,
    systemArchitecture,
    flowDiagramDescription
  };
};

module.exports = { generateProjectContent };
