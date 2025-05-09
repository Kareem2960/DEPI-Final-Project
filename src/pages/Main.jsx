import React from "react";
import "./Main.css";

const Main = ({ darkMode }) => {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <div className="main-container">
      <header className="hero-section">
        <h1>Welcome to TaskBoard</h1>
        <p className="subtitle">Organize your tasks, boost your productivity</p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>

      <section className="features-section">
        <h2 className="section-title">Why Choose TaskBoard?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📝 Easy Task Management</h3>
            <p>
              Create, organize, and track your tasks with ease. Drag and drop
              functionality for intuitive task organization.
            </p>
          </div>
          <div className="feature-card">
            <h3>📊 Progress Tracking</h3>
            <p>
              Monitor your productivity and stay on top of your goals with
              detailed analytics and progress reports.
            </p>
          </div>
          <div className="feature-card">
            <h3>🔔 Smart Reminders</h3>
            <p>
              Never miss an important deadline with timely notifications and
              customizable reminder settings.
            </p>
          </div>
          <div className="feature-card">
            <h3>👥 Team Collaboration</h3>
            <p>
              Work seamlessly with your team members through shared boards and
              real-time updates.
            </p>
          </div>
          <div className="feature-card">
            <h3>📱 Cross-Platform</h3>
            <p>
              Access your tasks from anywhere - desktop, tablet, or mobile
              device.
            </p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Private</h3>
            <p>
              Your data is protected with enterprise-grade security and privacy
              features.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              "TaskBoard has completely transformed how I manage my daily tasks.
              The interface is intuitive and the features are exactly what I
              needed."
            </p>
            <p className="testimonial-author">
              - Sarah Johnson, Project Manager
            </p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "The team collaboration features are fantastic. We've seen a 40%
              increase in productivity since switching to TaskBoard."
            </p>
            <p className="testimonial-author">- Michael Chen, Team Lead</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "I love how I can access my tasks from any device. The mobile app
              is just as powerful as the desktop version."
            </p>
            <p className="testimonial-author">- Emily Rodriguez, Freelancer</p>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <p className="price">$0</p>
            <ul className="features-list">
              <li>Up to 50 tasks</li>
              <li>Basic task management</li>
              <li>Email notifications</li>
              <li>1 user</li>
            </ul>
            <button className="pricing-button" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="pricing-card featured">
            <h3>Pro</h3>
            <p className="price">
              $9.99<span>/month</span>
            </p>
            <ul className="features-list">
              <li>Unlimited tasks</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
              <li>Up to 5 team members</li>
              <li>Custom categories</li>
            </ul>
            <button className="pricing-button" onClick={handleGetStarted}>
              Get Pro
            </button>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price">
              $29.99<span>/month</span>
            </p>
            <ul className="features-list">
              <li>Everything in Pro</li>
              <li>Unlimited team members</li>
              <li>API access</li>
              <li>Custom integrations</li>
              <li>Dedicated support</li>
            </ul>
            <button className="pricing-button" onClick={handleGetStarted}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to boost your productivity?</h2>
        <p className="cta-subtitle">
          Join thousands of users who have transformed their task management
        </p>
        <button className="secondary-button" onClick={handleGetStarted}>
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Main;