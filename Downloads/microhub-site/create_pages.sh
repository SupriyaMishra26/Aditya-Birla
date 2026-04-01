#!/bin/bash

# Function to create a standard inner page
create_page() {
  local FILE="$1"
  local TITLE="$2"
  local DESC="$3"
  local BREADCRUMB="$4"
  local HERO_ICON="$5"
  local LABEL="$6"
  local H1="$7"
  local HERO_DESC="$8"
  local DEPTH="$9"

  mkdir -p "$(dirname "$FILE")"

  cat > "$FILE" << HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${TITLE} â€” MicroHub</title>
  <meta name="description" content="${DESC}">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${DEPTH}assets/css/main.css">
  <link rel="stylesheet" href="${DEPTH}assets/css/layout.css">
  <link rel="stylesheet" href="${DEPTH}assets/css/components.css">
  <link rel="stylesheet" href="${DEPTH}assets/css/animations.css">
  <link rel="stylesheet" href="${DEPTH}assets/css/responsive.css">
</head>
<body>
<nav class="navbar-custom scrolled" id="navbar">
  <div class="container">
    <div class="d-flex align-items-center justify-content-between">
      <a href="${DEPTH}index.html" class="nav-logo" style="color:var(--dark)">Micro<span>Hub</span></a>
      <div class="nav-links-desktop d-flex align-items-center gap-1">
        <a href="${DEPTH}who-we-are.html" class="nav-link-custom" style="color:var(--dark)">Who We Are</a>
        <a href="${DEPTH}index.html" class="nav-link-custom" style="color:var(--dark)">What We Do</a>
        <div class="has-dropdown position-relative">
          <button class="nav-link-custom border-0 bg-transparent" style="color:var(--dark)">Insights <i class="bi bi-chevron-down" style="font-size:11px"></i></button>
          <div class="dropdown-custom">
            <a href="${DEPTH}insights/blog.html"><i class="bi bi-journal-text"></i> Blog</a>
            <a href="${DEPTH}insights/pricing.html"><i class="bi bi-tag"></i> Pricing</a>
            <a href="${DEPTH}insights/roi-calculator.html"><i class="bi bi-calculator"></i> ROI Calculator</a>
          </div>
        </div>
        <a href="https://repair.microhub.in/register" class="nav-link-custom nav-cta ms-2">Get a Demo <i class="bi bi-arrow-right"></i></a>
      </div>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>
<div class="mobile-menu" id="mobile-menu">
  <a href="${DEPTH}index.html" class="mob-link">Home</a>
  <a href="${DEPTH}who-we-are.html" class="mob-link">Who We Are</a>
  <a href="${DEPTH}insights/blog.html" class="mob-link">Blog</a>
  <a href="${DEPTH}get-started/login.html" class="mob-link">Login</a>
  <a href="https://repair.microhub.in/register" class="mob-link" style="color:var(--primary-light)">Sign Up</a>
</div>
<section class="page-hero">
  <div class="container position-relative" style="z-index:1">
    <div class="col-lg-8 fade-in-up-1">
      <div class="section-label" style="background:rgba(13,148,136,0.2);color:var(--primary-light)"><i class="bi ${HERO_ICON}"></i> ${LABEL}</div>
      <h1 style="color:var(--white)">${H1}</h1>
      <p style="color:rgba(255,255,255,0.7);font-size:1.1rem;margin-top:1.25rem;max-width:600px">${HERO_DESC}</p>
      <div class="d-flex gap-3 mt-4 flex-wrap">
        <a href="https://repair.microhub.in/register" class="btn-primary-custom">Get Started <i class="bi bi-arrow-right"></i></a>
        <a href="${DEPTH}insights/pricing.html" class="btn-outline-custom" style="border-color:rgba(255,255,255,0.3);color:var(--white)"><i class="bi bi-tag"></i> View Pricing</a>
      </div>
    </div>
  </div>
</section>
<section class="section-pad" style="background:var(--white)">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-6 reveal">
        <div class="section-label"><i class="bi bi-stars"></i> Key Capabilities</div>
        <h2 class="section-title">What You <span>Get</span></h2>
        <div class="divider"></div>
        <ul class="feature-list">
          <li class="feature-item"><div class="feature-icon"><i class="bi bi-check"></i></div><span class="feature-text">Enterprise-grade security and compliance built in</span></li>
          <li class="feature-item"><div class="feature-icon"><i class="bi bi-check"></i></div><span class="feature-text">Real-time dashboards and actionable analytics</span></li>
          <li class="feature-item"><div class="feature-icon"><i class="bi bi-check"></i></div><span class="feature-text">Seamless integrations with existing tools</span></li>
          <li class="feature-item"><div class="feature-icon"><i class="bi bi-check"></i></div><span class="feature-text">Dedicated onboarding and customer success</span></li>
          <li class="feature-item"><div class="feature-icon"><i class="bi bi-check"></i></div><span class="feature-text">Mobile-first design for on-the-go access</span></li>
          <li class="feature-item"><div class="feature-icon"><i class="bi bi-check"></i></div><span class="feature-text">99.9% uptime SLA with 24/7 technical support</span></li>
        </ul>
      </div>
      <div class="col-lg-6 reveal reveal-delay-2">
        <div class="row g-3">
          <div class="col-6"><div class="card-custom text-center"><div class="card-icon mx-auto"><i class="bi bi-lightning-charge"></i></div><h5>Fast Setup</h5><p class="text-muted small">Live in hours, not weeks</p></div></div>
          <div class="col-6"><div class="card-custom text-center"><div class="card-icon mx-auto"><i class="bi bi-shield-check"></i></div><h5>Secure</h5><p class="text-muted small">End-to-end encrypted</p></div></div>
          <div class="col-6"><div class="card-custom text-center"><div class="card-icon mx-auto"><i class="bi bi-graph-up"></i></div><h5>Analytics</h5><p class="text-muted small">Real-time insights</p></div></div>
          <div class="col-6"><div class="card-custom text-center"><div class="card-icon mx-auto"><i class="bi bi-headset"></i></div><h5>24/7 Support</h5><p class="text-muted small">Always there for you</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="cta-section">
  <div class="container position-relative" style="z-index:1;text-align:center">
    <h2 style="color:var(--white);margin-bottom:1rem">Ready to Get Started?</h2>
    <p style="color:rgba(255,255,255,0.8);margin-bottom:2rem;max-width:480px;margin-left:auto;margin-right:auto">Join hundreds of businesses already using MicroHub to grow faster and work smarter.</p>
    <div class="d-flex gap-3 justify-content-center flex-wrap">
      <a href="https://repair.microhub.in/register" class="btn-white-custom">Start Free Trial <i class="bi bi-arrow-right"></i></a>
      <a href="https://repair.microhub.in/register" class="btn-outline-custom" style="border-color:rgba(255,255,255,0.4);color:var(--white)"><i class="bi bi-calendar-check"></i> Book a Demo</a>
    </div>
  </div>
</section>
<footer class="footer-custom" style="padding:50px 0 30px">
  <div class="container">
    <div class="row g-4 align-items-center">
      <div class="col-md-4"><div class="footer-logo">Micro<span>Hub</span></div><p class="footer-desc">Enterprise tech made simple.</p></div>
      <div class="col-md-4 text-md-center"><div class="footer-links" style="flex-direction:row;flex-wrap:wrap;justify-content:center;gap:1.25rem"><a href="${DEPTH}index.html">Home</a><a href="${DEPTH}insights/blog.html">Blog</a><a href="https://repair.microhub.in/register">Get Started</a></div></div>
      <div class="col-md-4 text-md-end"><div class="footer-social" style="justify-content:flex-end"><a href="#"><i class="bi bi-linkedin"></i></a><a href="#"><i class="bi bi-twitter-x"></i></a></div></div>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-bottom"><div>Â© 2026 MicroHub Technologies Pvt. Ltd.</div><div class="d-flex gap-3"><a href="${DEPTH}legal/privacy.html">Privacy</a><a href="${DEPTH}legal/terms.html">Terms</a></div></div>
  </div>
</footer>
<button id="back-to-top" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="${DEPTH}assets/js/navigation.js"></script>
<script src="${DEPTH}assets/js/animations.js"></script>
<script src="${DEPTH}assets/js/main.js"></script>
</body>
</html>
HTML
}

D2="../../"
D1="../"

create_page "microhub/what-we-do/solutions/ticketing.html" "Ticketing System" "Streamline customer support with MicroHub's intelligent ticketing platform." '<a href="../../index.html">Home</a><span>/</span><a href="../../index.html">What We Do</a><span>/</span><span>Ticketing System</span>' "bi-ticket-detailed" "Customer Support" "Intelligent Ticketing That Resolves Faster" "Route, prioritize, and resolve customer issues with SLA-driven workflows and AI-assisted responses that keep your team ahead of the queue." "$D2"

create_page "microhub/what-we-do/solutions/inventory.html" "Inventory Management" "Real-time inventory control, automated reordering, and multi-location stock visibility with MicroHub." '<a href="../../index.html">Home</a><span>/</span><span>Inventory Management</span>' "bi-box-seam" "Operations" "Total Inventory Intelligence in Real Time" "Know exactly what's in stock, where it is, and when to reorder â€” across every warehouse and location, all in one place." "$D2"

create_page "microhub/what-we-do/solutions/hr-payroll.html" "HR & Payroll Management" "Automate payroll, attendance, leaves, and HR operations with MicroHub's India-compliant platform." '<a href="../../index.html">Home</a><span>/</span><span>HR / Payroll</span>' "bi-person-badge" "Human Resources" "Automate HR & Payroll, End to End" "From offer letters to final settlements â€” manage the complete employee lifecycle with full compliance to Indian labour laws and GST requirements." "$D2"

create_page "microhub/what-we-do/solutions/task-management.html" "Task Management" "Kanban boards, Gantt charts, and team collaboration tools to keep projects on track." '<a href="../../index.html">Home</a><span>/</span><span>Task Management</span>' "bi-kanban" "Productivity" "Project Management That Moves as Fast as Your Team" "Visualize workloads, track milestones, and collaborate in real-time with an intuitive project management suite built for high-performance teams." "$D2"

create_page "microhub/what-we-do/solutions/financial.html" "Financial Management" "GST-compliant accounting, invoicing, and financial reporting built for Indian businesses." '<a href="../../index.html">Home</a><span>/</span><span>Financial Management</span>' "bi-currency-rupee" "Finance & Accounting" "Complete Financial Control for Indian Businesses" "From GST invoicing to P&L statements, manage every financial operation with accuracy, compliance, and real-time visibility." "$D2"

create_page "microhub/what-we-do/services/it-setup.html" "Infrastructure Services" "Outcome-driven infrastructure design and deployment for offices, branch networks, cloud environments, and resilient support operations." '<a href="../../index.html">Home</a><span>/</span><span>Infrastructure Services</span>' "bi-pc-display" "Infrastructure Services" "Infrastructure that scales and stays resilient." "MicroHub designs the network, compute, cloud, and support layers together so branch rollouts, expansion plans, and recovery paths stay aligned from day one." "$D2"

create_page "microhub/what-we-do/services/networking.html" "Networking Solutions" "Enterprise LAN, WAN, and Wi-Fi network design and implementation by certified network engineers." '<a href="../../index.html">Home</a><span>/</span><span>Networking Solutions</span>' "bi-diagram-3" "Network Engineering" "Fast, Secure, Reliable Enterprise Networks" "Design and deploy high-performance networks that connect your people, systems, and data with zero compromise on speed or security." "$D2"

create_page "microhub/what-we-do/services/servers.html" "Server Setup & Management" "On-premises and cloud server setup, configuration, and ongoing management by certified engineers." '<a href="../../index.html">Home</a><span>/</span><span>Server Setup</span>' "bi-hdd-rack" "Infrastructure" "Enterprise Server Solutions, On-Prem or Cloud" "From rack installation to virtual machine configuration and cloud migration â€” we handle every aspect of your server environment with precision." "$D2"

create_page "microhub/what-we-do/services/amc.html" "AMC Maintenance Packages" "Annual maintenance contracts covering all IT assets, with guaranteed SLAs and proactive monitoring." '<a href="../../index.html">Home</a><span>/</span><span>AMC Maintenance</span>' "bi-shield-check" "Managed Services" "Comprehensive IT Asset Coverage, All Year Round" "Peace of mind through predictable, all-inclusive annual maintenance contracts covering hardware, software, and on-site support visits." "$D2"

create_page "microhub/what-we-do/services/support.html" "Remote Technical Support" "24/7 remote IT support for businesses across India â€” fast response, expert resolution." '<a href="../../index.html">Home</a><span>/</span><span>Remote Technical Support</span>' "bi-headset" "Technical Support" "Expert IT Support, Whenever You Need It" "Our certified support engineers resolve issues remotely with screen sharing, remote access, and real-time diagnostics â€” no waiting for on-site visits." "$D2"

create_page "microhub/what-we-do/services/cybersecurity.html" "Cybersecurity Protection" "Protect your business from threats with enterprise-grade cybersecurity â€” firewalls, endpoint security, and compliance." '<a href="../../index.html">Home</a><span>/</span><span>Cybersecurity</span>' "bi-shield-lock" "Security & Compliance" "Defend Your Business Against Every Cyber Threat" "From firewall deployment to employee security training, we deliver a layered cybersecurity strategy that keeps your data safe and your business compliant." "$D2"

create_page "microhub/what-we-do/services/web-dev.html" "Website Development" "Professional website and web application development for businesses, e-commerce, and enterprise portals." '<a href="../../index.html">Home</a><span>/</span><span>Website Development</span>' "bi-globe" "Web Development" "Websites That Work as Hard as You Do" "High-performance websites, e-commerce platforms, and enterprise portals â€” designed for conversions, built for speed, and optimized for search." "$D2"

create_page "microhub/what-we-do/services/erp-apps.html" "ERP Applications" "Custom ERP implementation and deployment for manufacturing, retail, distribution, and service businesses." '<a href="../../index.html">Home</a><span>/</span><span>ERP Applications</span>' "bi-grid-3x3-gap" "Enterprise Resource Planning" "Unify Your Entire Business on One ERP Platform" "Integrate finance, operations, supply chain, HR, and sales into a single, intelligent ERP system â€” configured for your industry, deployed on your timeline." "$D2"

create_page "microhub/what-we-do/hardware/laptops.html" "Business Laptops" "Procure premium business laptops from Dell, HP, Lenovo, and Apple through MicroHub's authorized channel." '<a href="../../index.html">Home</a><span>/</span><span>Laptops</span>' "bi-laptop" "Hardware Procurement" "Premium Business Laptops, Configured & Ready to Deploy" "Source enterprise-grade laptops from all major brands, pre-configured with your corporate image, software, and security policies â€” delivered to your door." "$D2"

create_page "microhub/what-we-do/hardware/desktops.html" "Business Desktops" "Enterprise desktop procurement and configuration from Dell, HP, Lenovo, and other leading brands." '<a href="../../index.html">Home</a><span>/</span><span>Desktops</span>' "bi-pc-display-horizontal" "Hardware Procurement" "Powerful Desktops for Every Business Role" "High-performance business desktops for workstations, reception, and executive use â€” all procured, imaged, and deployed by our certified team." "$D2"

create_page "microhub/what-we-do/hardware/smartphones.html" "Business Smartphones" "Corporate smartphone procurement and MDM enrollment for Android and iOS enterprise devices." '<a href="../../index.html">Home</a><span>/</span><span>Smartphones</span>' "bi-phone" "Hardware Procurement" "Enterprise Smartphones, Secured & Enrolled" "Samsung, Apple, and OnePlus business devices â€” bulk procurement with MDM enrollment, corporate email setup, and security policies applied." "$D2"

create_page "microhub/what-we-do/hardware/mac.html" "Mac Devices for Business" "Authorized Apple Mac procurement for businesses â€” MacBook, iMac, and Mac mini with enterprise enrollment." '<a href="../../index.html">Home</a><span>/</span><span>Mac Devices</span>' "bi-apple" "Apple Hardware" "Official Apple Business Channel â€” Mac for the Enterprise" "Procure MacBook Pro, MacBook Air, iMac, and Mac mini through MicroHub's authorized Apple Business channel with DEP enrollment and enterprise MDM." "$D2"

create_page "microhub/what-we-do/hardware/printers.html" "Enterprise Printers" "Business printer procurement â€” laser, multifunction, label, and wide-format printers for every office need." '<a href="../../index.html">Home</a><span>/</span><span>Printers</span>' "bi-printer" "Hardware Procurement" "The Right Printer for Every Business Environment" "From compact laser printers to high-volume MFPs â€” procured, networked, and configured by our team for immediate productivity." "$D2"

create_page "microhub/what-we-do/hardware/networking.html" "Networking Hardware" "Enterprise switches, routers, access points, and firewalls from Cisco, Fortinet, Ubiquiti, and more." '<a href="../../index.html">Home</a><span>/</span><span>Networking Hardware</span>' "bi-router" "Network Hardware" "Enterprise Networking Hardware, Configured & Installed" "Source and deploy Cisco, Fortinet, Ubiquiti, and TP-Link enterprise networking hardware â€” with professional installation and configuration by certified engineers." "$D2"

create_page "microhub/what-we-do/hardware/accessories.html" "IT Accessories" "Monitors, keyboards, docking stations, headsets, and all enterprise IT accessories from leading brands." '<a href="../../index.html">Home</a><span>/</span><span>Accessories</span>' "bi-plug" "IT Accessories" "Complete Your Workstation with Premium Accessories" "From 4K monitors to noise-cancelling headsets and ergonomic peripherals â€” everything your team needs to work at peak performance." "$D2"

echo "All solution/service/hardware pages created."


