import { useState } from "react";
import "./Introduction.css";

export default function Introduction() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="intro-section" id="about">

      {/* Top Center Heading */}
      <div className="intro-top">
        <h2 className="intro-main-title">Introduction</h2>
        <p className="intro-sub">
          AyuSahayak brings structured and accessible healthcare to villages by
          connecting trained nurses, trusted nearby hospitals, and patients
          through a safe, doctor-supervised digital platform.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="intro-container">

        {/* Left — Video */}
        <div className="intro-left">
          <div className="intro-video-box">
            <video
              className="intro-video"
              src="/AyuSahayakVideo.mp4"
              autoPlay
              loop
              controls
              playsInline
            />
          </div>
        </div>

        {/* Right — Text */}
        <div className="intro-right">
          <h2 className="intro-title">
            Your <span>Healthcare</span> Companion
          </h2>

          <p className="intro-description">
            AyuSahayak enables village nurses to connect patients with qualified
            doctors from nearby hospitals for safe, fast, and accountable care.
            The platform supports primary treatment, supervised procedures,
            digital consultations, and timely referrals.
          </p>

          <button
            className="intro-btn"
            onClick={() => setOpenModal(true)}
          >
            Read More
          </button>
        </div>

      </div>

      {/* ✅ About Us Popup Modal */}
      {openModal && (
        <div className="intro-modal-overlay">
          <div className="intro-modal">

            {/* Close Button */}
            <button
              className="modal-close-btn"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <h2 className="modal-title">About AyuSahayak</h2>

            <div className="modal-content">

              <p>
                <strong>Mission:</strong> To ensure every rural citizen of India
                has access to qualified doctors and safe medical services at
                affordable cost and minimal travel.
              </p>

              <p>
                <strong>Vision:</strong> To become the most trusted hospital-backed
                digital healthcare platform for rural India.
              </p>

              <br />

              {/* 🔹 AI DESIGN PHILOSOPHY */}
              <h3>🧠 Our AI Design Philosophy</h3>
              <p>
                AyuSahayak’s AI is designed to think the way a real doctor thinks —
                not the way traditional disease-prediction models work.
              </p>

              <p>
                A real doctor does not first predict a disease and then decide
                severity. Many diseases share overlapping symptoms, so doctors
                instead assess symptom meaning, vitals, and risk before deciding
                the next step.
              </p>

              <p>
                Our AI follows this same logic by structuring symptoms,
                asking targeted follow-up questions, and classifying cases as
                <strong> low, medium, or high risk</strong>.
              </p>

              <br />

              {/* 🔹 AI MODULES */}
              <h3>📌 Our Healthcare Modules</h3>
              <ul>
                <li>
  <strong>1. Rural Care AI Module</strong> — Structures symptoms, asks
  differentiation questions, and classifies risk so overlapping disease
  symptoms are handled safely under doctor supervision.
</li>


                <li>
                  <strong>2. Skin Care AI Module</strong> — Uses multimodal fusion
                  by combining skin images with symptom understanding, because
                  image-only AI is unsafe for visually similar skin conditions.
                </li>

                <li>
                  <strong>3. Wound Care AI Module</strong> — Assists doctors by
                  assessing wound severity and infection risk to guide local
                  care or hospital referral decisions.
                </li>
              </ul>

              <br />

              {/* 🔹 SAFETY & SCOPE */}
              <h3>🔐 Safety, Scope & Guardrails</h3>
              <p>
                Our AI is intentionally limited in scope. It focuses only on
                high-frequency rural cases such as common infections, chronic
                conditions, and skin or wound problems, with strict escalation
                for anything outside this range.
              </p>

              <p>
                If inputs are unclear or irrelevant, the system stops and asks
                for clarification instead of guessing. All AI outputs are
                advisory — final decisions are always made by qualified doctors.
              </p>

              <br />

              {/* 🔹 TECHNOLOGY */}
              <h3>⚙ Technology Stack</h3>
              <p>
                AyuSahayak is built using <strong>React.js</strong>,
                <strong> Node.js</strong>, <strong>MongoDB</strong>, and deployed
                on cloud infrastructure. AI components use semantic embeddings,
                multimodal models, and explainability tools such as Grad-CAM.
              </p>

              <br />

              {/* 🔹 PURPOSE */}
              <h3>🏥 Our Purpose</h3>
              <p>
                By empowering nurses, supporting doctors, and keeping hospitals
                accountable, AyuSahayak replaces unsafe RMP dependency with a
                trusted, legal, and scalable rural healthcare model.
              </p>

              <br /><br />

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
