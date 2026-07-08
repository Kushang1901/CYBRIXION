import {
  InternshipProgram,
  Specialization,
  Module,
  Lesson,
  Resource,
  Assignment,
  Project,
  LiveSession,
  Announcement,
  Profile,
  User
} from '../types';

export const mockPrograms: InternshipProgram[] = [
  {
    id: 'prog-30-day',
    title: '30-Day Cybersecurity Internship',
    slug: '30-day-cybersecurity-internship',
    durationDays: 30,
    level: 'Beginner',
    description: 'A structured beginner-level path covering cybersecurity fundamentals, networking basics, operating systems, ethical principles, and introductory security tools.',
    projectsCount: 1,
    certEligible: true
  },
  {
    id: 'prog-60-day',
    title: '60-Day Cybersecurity Internship',
    slug: '60-day-cybersecurity-internship',
    durationDays: 60,
    level: 'Intermediate',
    description: 'Build stronger foundations through network security, scanning concepts, web security, OWASP Top 10, log analysis, hands-on projects, and career guidance.',
    projectsCount: 2,
    certEligible: true
  },
  {
    id: 'prog-90-day',
    title: '90-Day Advanced Cybersecurity Internship',
    slug: '90-day-advanced-cybersecurity-internship',
    durationDays: 90,
    level: 'Advanced',
    description: 'Complete a common cybersecurity foundation and specialize in either Security Operations Center (SOC) Analyst, Vulnerability Assessment & Penetration Testing (VAPT), or Governance, Risk & Compliance (GRC).',
    projectsCount: 3,
    certEligible: true
  }
];

export const mockSpecializations: Specialization[] = [
  {
    id: 'spec-soc',
    title: 'SOC Analyst Track',
    description: 'Focus on defensive security operations, threat detection, log analysis, SIEM deployment, and incident response procedures.',
    programId: 'prog-90-day'
  },
  {
    id: 'spec-vapt',
    title: 'VAPT Track',
    description: 'Focus on offensive security assessment, web application testing, vulnerability scanning, exploit analysis, and reporting.',
    programId: 'prog-90-day'
  },
  {
    id: 'spec-grc',
    title: 'GRC Track',
    description: 'Focus on information security governance, compliance standards (ISO 27001, GDPR), risk management registers, and audits.',
    programId: 'prog-90-day'
  }
];

export const mockModules: Module[] = [
  // 30-Day Internship Modules
  { id: 'mod-30-w1', title: 'Cybersecurity Fundamentals', weekNumber: 1, programId: 'prog-30-day', specializationId: null },
  { id: 'mod-30-w2', title: 'Networking Basics', weekNumber: 2, programId: 'prog-30-day', specializationId: null },
  { id: 'mod-30-w3', title: 'Operating System Security Basics', weekNumber: 3, programId: 'prog-30-day', specializationId: null },
  { id: 'mod-30-w4', title: 'Introduction to Security Tools', weekNumber: 4, programId: 'prog-30-day', specializationId: null },

  // 60-Day Internship Modules
  { id: 'mod-60-w1', title: 'Cybersecurity Foundations', weekNumber: 1, programId: 'prog-60-day', specializationId: null },
  { id: 'mod-60-w2', title: 'Networking Basics for Security', weekNumber: 2, programId: 'prog-60-day', specializationId: null },
  { id: 'mod-60-w3', title: 'Operating System Security', weekNumber: 3, programId: 'prog-60-day', specializationId: null },
  { id: 'mod-60-w4', title: 'Nmap Fundamentals & Scanning', weekNumber: 4, programId: 'prog-60-day', specializationId: null },
  { id: 'mod-60-w5', title: 'Network Security & Firewalls', weekNumber: 5, programId: 'prog-60-day', specializationId: null },
  { id: 'mod-60-w6', title: 'Web Application Security & OWASP', weekNumber: 6, programId: 'prog-60-day', specializationId: null },
  { id: 'mod-60-w7', title: 'Log Analysis & SIEM Concepts', weekNumber: 7, programId: 'prog-60-day', specializationId: null },
  { id: 'mod-60-w8', title: 'Career Guidance & Resume Prep', weekNumber: 8, programId: 'prog-60-day', specializationId: null },

  // 90-Day Common Foundation Modules (Phase 1)
  { id: 'mod-90-f1', title: 'Advanced Cybersecurity Foundations', weekNumber: 1, programId: 'prog-90-day', specializationId: null },
  { id: 'mod-90-f2', title: 'Enterprise Network Architectures', weekNumber: 2, programId: 'prog-90-day', specializationId: null },
  { id: 'mod-90-f3', title: 'Operating System Security & Hardening', weekNumber: 3, programId: 'prog-90-day', specializationId: null },
  { id: 'mod-90-f4', title: 'Threat Intelligence & Attack Vectors', weekNumber: 4, programId: 'prog-90-day', specializationId: null },

  // 90-Day SOC Specialization Modules (Phase 2)
  { id: 'mod-90-soc-w5', title: 'SOC Workflow & Cyber Kill Chain', weekNumber: 5, programId: 'prog-90-day', specializationId: 'spec-soc' },
  { id: 'mod-90-soc-w6', title: 'Log Types & SIEM Architectures', weekNumber: 6, programId: 'prog-90-day', specializationId: 'spec-soc' },
  { id: 'mod-90-soc-w7', title: 'Wazuh Deployments & Alerting', weekNumber: 7, programId: 'prog-90-day', specializationId: 'spec-soc' },
  { id: 'mod-90-soc-w8', title: 'Incident Response & Triage Simulation', weekNumber: 8, programId: 'prog-90-day', specializationId: 'spec-soc' },
  { id: 'mod-90-soc-w9', title: 'Specialized Defense Operations', weekNumber: 9, programId: 'prog-90-day', specializationId: 'spec-soc' },

  // 90-Day VAPT Specialization Modules (Phase 2)
  { id: 'mod-90-vapt-w5', title: 'Reconnaissance & Footprinting', weekNumber: 5, programId: 'prog-90-day', specializationId: 'spec-vapt' },
  { id: 'mod-90-vapt-w6', title: 'Advanced Scanning with Nmap & Nikto', weekNumber: 6, programId: 'prog-90-day', specializationId: 'spec-vapt' },
  { id: 'mod-90-vapt-w7', title: 'Burp Suite & Web App Vulnerabilities', weekNumber: 7, programId: 'prog-90-day', specializationId: 'spec-vapt' },
  { id: 'mod-90-vapt-w8', title: 'Vulnerability Analysis & Reporting', weekNumber: 8, programId: 'prog-90-day', specializationId: 'spec-vapt' },
  { id: 'mod-90-vapt-w9', title: 'Exploit Execution & Lab Work', weekNumber: 9, programId: 'prog-90-day', specializationId: 'spec-vapt' },

  // 90-Day GRC Specialization Modules (Phase 2)
  { id: 'mod-90-grc-w5', title: 'Governance Concepts & Frameworks', weekNumber: 5, programId: 'prog-90-day', specializationId: 'spec-grc' },
  { id: 'mod-90-grc-w6', title: 'Security Policies & Standards', weekNumber: 6, programId: 'prog-90-day', specializationId: 'spec-grc' },
  { id: 'mod-90-grc-w7', title: 'Risk Assessment & Risk Registers', weekNumber: 7, programId: 'prog-90-day', specializationId: 'spec-grc' },
  { id: 'mod-90-grc-w8', title: 'ISO 27001 Standards & Auditing', weekNumber: 8, programId: 'prog-90-day', specializationId: 'spec-grc' },
  { id: 'mod-90-grc-w9', title: 'Compliance Regulations (GDPR & PCI-DSS)', weekNumber: 9, programId: 'prog-90-day', specializationId: 'spec-grc' }
];

export const mockLessons: Lesson[] = [
  // 60-Day Internship (Enrolled Student aarav-sharma)
  {
    id: 'les-60-f-1',
    title: 'Introduction to Cybersecurity',
    orderIndex: 1,
    type: 'ARTICLE',
    moduleId: 'mod-60-w1',
    content: `### Introduction to Cybersecurity: Principles & Modern Concepts

Cybersecurity is the practice of protecting systems, networks, programs, and data from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users via ransomware; or interrupting normal business processes.

Implementing effective cybersecurity measures is particularly challenging today because there are more devices than people, and attackers are becoming more innovative.

#### Fundamental Security Concepts

Before exploring specific tools or testing mechanisms, security professionals must master the core models that govern information assurance.

##### 1. The Threat Landscape
The security environment is composed of various actors, motivations, and tools:
- **Threat Actor**: An individual or entity that has the potential to impact a system negatively. Actors include script kiddies, hacktivists, state-sponsored groups, and insider threats.
- **Vulnerability**: A weakness or flaw in code, configuration, or physical security that can be exploited by a threat actor.
- **Exploit**: A script, piece of software, or technique used by an attacker to take advantage of a vulnerability to gain unauthorized access or cause harm.
- **Risk**: The probability that a threat actor will exploit a vulnerability and cause business impact.

##### 2. Defense in Depth
No single security control can defend against every attack. "Defense in Depth" is a strategy that leverages multiple layers of security controls throughout an IT environment. If one control fails (e.g., a firewall), another is in place to contain or deter the attack (e.g., endpoint detection, network segmentation, or strict access control list).

*Remember, security is a process, not a product. Achieving comprehensive security requires a combination of technology, processes, and people training.*
`
  },
  {
    id: 'les-60-f-2',
    title: 'The CIA Triad & Fundamentals',
    orderIndex: 2,
    type: 'ARTICLE',
    moduleId: 'mod-60-w1',
    content: `### The CIA Triad: The Cornerstone of Information Security

The **CIA Triad** (Confidentiality, Integrity, and Availability) is a foundational model designed to guide policies for information security within an organization. Almost every security policy, tool implementation, and network architecture is designed to uphold one or more of these three pillars.

#### 1. Confidentiality (Keep Secrets Secret)
Confidentiality ensures that sensitive information is accessed only by authorized individuals. It prevents unauthorized disclosure, whether intentional or accidental.

- **Threats to Confidentiality**: Shoulder surfing, phishing attacks, man-in-the-middle interception, and misconfigured permissions.
- **Controls**:
  - **Encryption**: Translating plain text into ciphertext using cryptographic algorithms (e.g., AES-256) both at rest and in transit (e.g., HTTPS).
  - **Access Control**: Implementing Role-Based Access Control (RBAC) to ensure employees only access files necessary for their job duties (Principle of Least Privilege).
  - **Multi-Factor Authentication (MFA)**: Requiring more than one verification factor to validate user identity.

#### 2. Integrity (Keep Data Trustworthy)
Integrity ensures that data remains accurate, consistent, and unaltered throughout its lifecycle. It prevents unauthorized or accidental modifications.

- **Threats to Integrity**: Database injection, malicious file alterations, transmission errors, and unauthorized administrative actions.
- **Controls**:
  - **Hashing**: Generating a unique fixed-length signature (hash) of a file or message using algorithms like SHA-256. If a single bit changes, the hash will change, signaling tampering.
  - **Digital Signatures**: Using public-key cryptography to verify the origin and integrity of software releases or messages.
  - **Version Controls**: Keeping track of file changes and maintaining regular write logs.

#### 3. Availability (Keep Systems Ready)
Availability ensures that systems, networks, and data are accessible to authorized users when needed. High security is useless if legitimate users cannot access their services.

- **Threats to Availability**: Distributed Denial of Service (DDoS) attacks, hardware failure, power outages, and ransomware encrypting access to systems.
- **Controls**:
  - **Redundancy**: Implementing failovers, backup servers, and multi-region cloud infrastructures.
  - **Data Backups**: Regularly backing up critical files and storing them in isolated, offsite, or read-only environments.
  - **DDoS Mitigation**: Deploying network scrubbers and rate-limiting to filter out malicious traffic spikes.

#### The Balance
Securing a system requires balancing these three pillars. For instance, making a system highly confidential (e.g., requiring 10 forms of verification) may negatively affect its availability or ease of use. A security professional must determine the correct balance based on the threat model of the organization.
`
  },
  {
    id: 'les-60-f-3',
    title: 'Ethical and Legal Principles',
    orderIndex: 3,
    type: 'ARTICLE',
    moduleId: 'mod-60-w1',
    content: `### Ethical Principles and Legal Frameworks in Cybersecurity

As you acquire cybersecurity skills, you gain the power to identify and potentially exploit system vulnerabilities. It is critical to recognize the boundary between authorized security analysis (ethical hacking) and criminal intrusion.

> [!WARNING]
> Accessing a computer system, scanning a network, or testing an application without explicit, written permission from the owner is illegal in almost all jurisdictions and can lead to severe civil and criminal penalties.

#### The Golden Rule: Permission
The absolute difference between a cybercriminal and an ethical security analyst is **authorization**. Ethical security testing requires:
1. **Scope of Work (SoW)**: A written document detailing exactly which IPs, domains, and systems can be tested.
2. **Explicit Permission**: Signed authorization from an officer of the target organization who has the legal authority to grant access.
3. **No Collateral Damage**: Conducting tests in a way that minimizes the risk of system downtime or data exposure.

#### Crucial Ethical Guidelines
- **Defensive Mindset**: Focus your efforts on identifying vulnerabilities to patch them, protect data, and safeguard users.
- **Responsible Disclosure**: If you discover a vulnerability in a public system, report it privately to the vendor or organization first. Give them a reasonable timeframe to fix it before sharing details publicly.
- **Respect Privacy**: If you access sensitive data during authorized testing, do not download, share, or store it beyond what is necessary to demonstrate the vulnerability to the client.
- **No Self-Help/Retaliation**: If you detect an attack on your system, do not hack back. Defensive responses should consist of blocking, patching, and contacting law enforcement.

#### Key Cybersecurity Laws
Be aware of major international frameworks:
- **Computer Fraud and Abuse Act (CFAA) - USA**: Outlaws accessing a protected computer without authorization or exceeding authorized access.
- **Information Technology Act, 2000 (Section 66) - India**: Penalizes unauthorized access, hacking, and sending offensive messages digitally.
- **General Data Protection Regulation (GDPR) - EU**: Regulates data privacy and mandates that organizations protect personal user data or face massive fines.
`
  },
  {
    id: 'les-60-net-1',
    title: 'How Networks Work',
    orderIndex: 1,
    type: 'ARTICLE',
    moduleId: 'mod-60-w2',
    content: `### Networking Basics for Security Analysts

To secure networks, you must understand how data traverses them. This lesson covers network packets, the OSI model, and how devices communicate.

#### The OSI Model: The 7 Layers
The Open Systems Interconnection (OSI) model standardizes network communications into seven logical layers:

1. **Physical Layer**: Hubs, cables, electrical signals.
2. **Data Link Layer**: Switches, MAC addresses, Ethernet frames.
3. **Network Layer**: Routers, IP addresses, packets.
4. **Transport Layer**: TCP, UDP, port numbers.
5. **Session Layer**: Manages sessions between applications.
6. **Presentation Layer**: Data formatting, encryption/decryption.
7. **Application Layer**: HTTP, DNS, FTP, SMTP.

*Tip: A security analyst often operates at Layers 3 (Network), 4 (Transport), and 7 (Application) to inspect traffic, identify malicious patterns, and construct rules.*
`
  },
  {
    id: 'les-60-net-2',
    title: 'IP Addresses & Protocols',
    orderIndex: 2,
    type: 'ARTICLE',
    moduleId: 'mod-60-w2',
    content: `### IP Addresses, TCP/UDP, and Ports

Every device on an IP network requires a unique identifier: the IP Address.

- **IPv4**: 32-bit address represented in dotted-decimal format (e.g., \`192.168.1.1\`).
- **IPv6**: 128-bit address in hexadecimal format (e.g., \`2001:db8::ff00:42:8329\`).

#### TCP vs UDP

- **TCP (Transmission Control Protocol)**: Connection-oriented. Establishes a reliable connection using the **Three-Way Handshake** (SYN -> SYN-ACK -> ACK) before sending data. If packets are lost, they are retransmitted.
- **UDP (User Datagram Protocol)**: Connectionless. Sends packets without verification. Faster, but not guaranteed. Used for streaming, gaming, and DNS.

#### Ports and Services
Ports act like doorways to a device. Common ports:
- **Port 80**: HTTP (Web)
- **Port 443**: HTTPS (Secure Web)
- **Port 22**: SSH (Secure Remote Command Line)
- **Port 21**: FTP (File Transfer)
- **Port 53**: DNS (Domain Name System)
`
  },
  {
    id: 'les-60-os-1',
    title: 'Linux Fundamentals',
    orderIndex: 1,
    type: 'ARTICLE',
    moduleId: 'mod-60-w3',
    content: `### Linux Command Line and Security Basics

A massive portion of security infrastructure, servers, and hacking tools run on Linux. Mastering the command line is non-negotiable.

#### Essential Commands
- \`pwd\`: Print working directory.
- \`ls -la\`: List directory contents with detailed information, including hidden files.
- \`cd [path]\`: Change directory.
- \`cat [file]\`: Display file content.
- \`chmod [permissions] [file]\`: Modify file read/write/execute permissions.
- \`sudo\`: Run command as administrator (root).

#### Understanding File Permissions
Linux permissions look like: \`-rwxr-xr-x\`
- First character: File type (\`-\` for file, \`d\` for directory).
- Next 3 characters: Owner permissions (Read, Write, Execute).
- Next 3 characters: Group permissions.
- Last 3 characters: All other users permissions.
`
  },
  {
    id: 'les-60-nmap-1',
    title: 'Nmap Introduction & Scan Modes',
    orderIndex: 1,
    type: 'ARTICLE',
    moduleId: 'mod-60-w4',
    content: `### Nmap Practical Guide: Discovery and Scanning Basics

**Network Mapper (Nmap)** is a free, open-source tool used for network discovery and vulnerability scanning. It is the industry-standard tool for mapping host addresses, port statuses, and service versions.

> [!CAUTION]
> **Ethical scanner rule**: Only run Nmap scans against target systems that you own or have explicit authorization to scan. Unauthorized port scanning can trigger firewall blocks, intrusion detection system (IDS) alarms, and is treated as a precursor to an attack.

#### Standard Nmap Scan Command
A basic Nmap scan determines if a host is active and lists open ports:
\`\`\`bash
nmap 192.168.1.50
\`\`\`

#### Essential Scan Types

##### 1. TCP Connect Scan (\`-sT\`)
The client completes the standard TCP 3-way handshake with the target ports.
- **Pros**: Does not require root/administrator privileges to execute.
- **Cons**: Easily logged by firewalls because a full connection is established.

##### 2. SYN Stealth Scan (\`-sS\`)
Also known as "half-open" scanning. Nmap sends a SYN packet; if it receives a SYN-ACK, it sends a RST (reset) packet immediately rather than completing the connection.
- **Pros**: Stealthy, fast, and does not show up as a completed connection in log files.
- **Cons**: Requires root/administrator privileges.

##### 3. Service Version Detection (\`-sV\`)
Instructs Nmap to query open ports to determine what software version is running (e.g., Apache 2.4.41).
- **Pros**: Helps identify vulnerable software versions.
- **Cons**: Takes longer than basic port checks.
`
  },
  {
    id: 'les-60-nmap-2',
    title: 'Understanding Scan Results',
    orderIndex: 2,
    type: 'ARTICLE',
    moduleId: 'mod-60-w4',
    content: `### Interpreting Nmap Scan Output

When Nmap finishes, it displays port states. Understanding these states is crucial for configuration and patching.

#### Port States
1. **Open**: A service is listening on the port and accepting connections. These are potential entry points for security testing.
2. **Closed**: No service is listening on the port, but the host responded to probes.
3. **Filtered**: A firewall, filter, or network obstacle is blocking the probes. Nmap cannot determine if the port is open or closed.
4. **Unfiltered**: The port is accessible, but Nmap cannot determine if it is open or closed (seen in ACK scans).

#### Example Scan Result Analysis
Let's analyze an output:
\`\`\`text
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 8.2p1 (Ubuntu)
80/tcp  open  http    Apache httpd 2.4.41
443/tcp open  ssl/http Apache httpd 2.4.41
\`\`\`
- **Analysis**: The target has an active web server (Apache) and an SSH remote connection path open. As an analyst, you would investigate if the running Apache version (2.4.41) contains known security vulnerabilities (CVEs) that require patching.
`
  }
];

export const mockResources: Resource[] = [
  { id: 'res-1', title: 'Cybersecurity Fundamentals Study Guide', type: 'PDF', url: '/resources/cybersecurity_fundamentals.pdf', sizeBytes: 1542000, moduleId: 'mod-60-w1' },
  { id: 'res-2', title: 'Networking Basics for Security Presentation', type: 'PPT', url: '/resources/networking_basics_presentation.pptx', sizeBytes: 4210000, moduleId: 'mod-60-w2' },
  { id: 'res-3', title: 'Nmap Practical Scanning Guide Sheet', type: 'PDF', url: '/resources/nmap_cheat_sheet.pdf', sizeBytes: 852000, moduleId: 'mod-60-w4' },
  { id: 'res-4', title: 'OWASP Top 10 Web Security Reference Booklet', type: 'PDF', url: '/resources/owasp_top_10.pdf', sizeBytes: 2430000, moduleId: 'mod-60-w6' },
  { id: 'res-5', title: 'Security Incident Response Workflow PPT', type: 'PPT', url: '/resources/incident_response_workflow.pptx', sizeBytes: 6810000, moduleId: 'mod-90-soc-w8' }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asgn-60-1',
    title: 'CIA Triad Case Analysis',
    instruction: 'Read the provided security breach scenario. Identify which pillar of the CIA Triad was compromised in each situation and propose one technical control that would have prevented the compromise. Upload your report as a PDF.',
    deadline: '2026-07-15T23:59:59Z',
    maxPoints: 100,
    moduleId: 'mod-60-w1'
  },
  {
    id: 'asgn-60-2',
    title: 'Network Protocol & Port Mapping',
    instruction: 'Complete the port and protocol worksheet. Map 15 common ports to their standard services and explain the difference between TCP and UDP flags. Submit a PDF document.',
    deadline: '2026-07-22T23:59:59Z',
    maxPoints: 100,
    moduleId: 'mod-60-w2'
  },
  {
    id: 'asgn-60-3',
    title: 'Nmap Practical Lab Execution',
    instruction: 'Configure an authorized local sandbox or use a legal scanning target like scanme.nmap.org. Execute a SYN scan, service version scan, and OS detection scan. Take screenshots of command execution and output. Assemble into a PDF report.',
    deadline: '2026-08-05T23:59:59Z',
    maxPoints: 100,
    moduleId: 'mod-60-w4'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-60-p1',
    title: 'Network Port Audit and Hardening Report',
    type: 'MINI',
    requirements: `**Objective**: Conduct a simulated network security port audit on a client network and deliver a professional security audit report.

**Scope of Work**:
- Perform port scanning using Nmap on authorized target IP addresses.
- Analyze the states (Open, Closed, Filtered) of services.
- Identify software version numbers and cross-reference them with vulnerability databases.

**Deliverables**:
1. Scan Command Syntax: Provide details on command flags used.
2. Port State Matrix: A structured table representing open ports, service names, and versions.
3. Vulnerability Mapping: A list of suspected CVEs based on software versions.
4. Mitigation Plan: Concrete guidelines to patch, disable, or filter unnecessary services.

> [!WARNING]
> **Ethical Boundary**: Do NOT scan systems outside the authorized scope. Only scan your local sandbox environment or legally approved scanning endpoints. Avoid heavy scans that could trigger denial of service.`,
    deadline: '2026-08-10T23:59:59Z',
    programId: 'prog-60-day'
  },
  {
    id: 'proj-60-p2',
    title: 'Web Application Security & OWASP Top 10 Assessment',
    type: 'MAJOR',
    requirements: `**Objective**: Perform a security assessment of a mock vulnerable web application to identify and document vulnerabilities based on the OWASP Top 10 framework.

**Deliverables**:
1. Vulnerability Log: For each bug found, log the Category (e.g., SQL Injection, XSS), URL/Endpoint, Severity (High/Medium/Low), and Proof of Concept (PoC) payload.
2. Remediation Recommendations: Explain how code-level modifications can fix the identified vulnerabilities.
3. Final Audit Report: Provide a polished executive summary suitable for business stakeholders.`,
    deadline: '2026-08-25T23:59:59Z',
    programId: 'prog-60-day'
  }
];

export const mockLiveSessions: LiveSession[] = [
  {
    id: 'live-1',
    title: 'Nmap Scanning & Discovery Q&A',
    startTime: '2026-07-10T15:00:00Z',
    durationMins: 60,
    instructor: 'Mr. Rohan Sharma (Lead Security Analyst)',
    status: 'UPCOMING',
    joinUrl: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 'live-2',
    title: 'Web App Pentesting & OWASP Top 10 Walkthrough',
    startTime: '2026-07-18T16:00:00Z',
    durationMins: 90,
    instructor: 'Ms. Nikita Varma (Senior VAPT Specialist)',
    status: 'UPCOMING',
    joinUrl: 'https://meet.google.com/klm-nopq-rst'
  },
  {
    id: 'live-3',
    title: 'GRC Risk Register Construction Practice',
    startTime: '2026-07-25T11:00:00Z',
    durationMins: 60,
    instructor: 'Mr. Amit Joshi (ISO 27001 Auditor)',
    status: 'UPCOMING',
    joinUrl: 'https://meet.google.com/uvw-xyza-bcd'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Nmap Practical Session Added',
    content: 'We have scheduled a live interactive lab session focusing on Nmap scans and network defense configurations. Set your calendar for July 10th at 3:00 PM IST.',
    date: '2026-07-06T10:00:00Z'
  },
  {
    id: 'ann-2',
    title: 'System Maintenance Window',
    content: 'The student dashboard and learning platform will undergo scheduled performance maintenance on July 12th from 2:00 AM to 4:00 AM IST. Portal services may be temporarily unavailable.',
    date: '2026-07-04T12:00:00Z'
  }
];

export const defaultStudentUser: User = {
  id: 'usr-student-aarav',
  email: 'aarav.sharma@gmail.com',
  name: 'Aarav Sharma',
  role: 'STUDENT',
  createdAt: '2026-06-25T08:00:00Z',
  updatedAt: '2026-06-25T08:00:00Z'
};

export const defaultStudentProfile: Profile = {
  id: 'prof-student-aarav',
  userId: 'usr-student-aarav',
  phone: '+91 98765 43210',
  college: 'National Institute of Technology',
  degree: 'Bachelor of Technology',
  currentYear: '3rd Year',
  city: 'New Delhi',
  experienceLevel: 'Beginner',
  careerGoal: 'SOC Analyst / Threat Incident Responder',
  linkedinUrl: 'https://linkedin.com/in/aaravsharma-placeholder',
  githubUrl: 'https://github.com/aaravsharma-placeholder',
  avatarUrl: '/images/avatar-placeholder.png'
};
