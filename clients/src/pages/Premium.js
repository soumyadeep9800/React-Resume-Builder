import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect , useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import bb from "../images/bb.png";
const FAQItem = ({ question, answer }) => (
  <details className="faq-item">
    <summary className="faq-question">{question}</summary>
    <p className="faq-answer">{answer}</p>
  </details>
);

const FAQSection = () => {
  const faqs = [
    {
      question: "Will my Premium account renew automatically?",
      answer:
        "No, our pricing model is not subscription based. Therefore, you will not be charged automatically without your consent.",
    },
    {
      question:
        "Will my information be saved after the Premium period expires?",
      answer:
        "All the information will be saved in your account, even when the Premium period expires.",
    },
    {
      question: "Are there any hidden costs?",
      answer:
        "No, our pricing model is not subscription based. Therefore, you will not be charged automatically without your consent.",
    },
    {
      question: "Is my payment information secure?",
      answer: "All transactions are 100% secure.",
    },
    {
      question: "Can I try before I buy?",
      answer:
        "Most of the Premium features (they have a White star next to them) can be tested in the Basic account. The only difference is that downloading a document with Premium features is not possible in the Basic account.",
    },
    {
      question: "What format will the documents be saved as?",
      answer:
        "For increased security, readability, and overall visual aspect, all the documents are saved as PDFs - which is a format that looks the same on all devices.",
    },
  ];
  return (
    <div className="faq-section" id="faq">
      <h2 className="faq-header">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default function Premium() {
  // for faq scroll
  const location=useLocation();
  useEffect(()=>{
    if(location.hash==="#faq"){
      const faqsection=document.getElementById("faq");
      if(faqsection){
        faqsection.scrollIntoView({behavior:"smooth"});
      }
    }
  },[location]);

  const [selectedPlan, setSelectedPlan] = useState(""); // 'year', 'quarter', or 'month'
  const handleCheckboxChange = (plan) => {
    setSelectedPlan(plan === selectedPlan ? "" : plan); // toggle logic
  };
  return (
    <>
      <div className="premium">
        <div className="premium-1">
          {/* Basic Plan Section */}
          <div className="pleft">
            <div className="pl-H">Basic</div>
            <div className="pl-2">Free</div>
            <div className="pl-3">Get Started</div>
            <div className="pl-list">
              <ul>
                <li>
                  <p>Single version</p>
                </li>
                <li>
                  <p>Max 1-page Resume</p>
                </li>
                <li>
                  <p>Predefined Layouts</p>
                </li>
                <li>
                  <p>1 Font</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Premium Plan Section */}
          <div className="pright">
            <div className="pr-H">Premium</div>
            <div className="pr-2">
              <div className="pr-21">
                Year
                <div className="pr211">2499 INR</div>
                <div className="pr21save">Save 3500</div>
                <div class="checkbox-wrapper-31">
                  <input
                    type="checkbox"
                    name="customCheckbox"
                    class="custom-checkbox"
                    checked={selectedPlan === "year"}
                    onChange={() => handleCheckboxChange("year")}
                  />
                  <svg viewBox="0 0 35.6 35.6">
                    <circle
                      class="background"
                      cx="17.8"
                      cy="17.8"
                      r="17.8"
                    ></circle>
                    <circle
                      class="stroke"
                      cx="17.8"
                      cy="17.8"
                      r="14.37"
                    ></circle>
                    <polyline
                      class="check"
                      points="11.78 18.12 15.55 22.23 25.17 12.87"
                    ></polyline>
                  </svg>
                </div>
              </div>
              <div className="pr-21">
                Quarter
                <div className="pr211">1099 INR</div>
                <div className="pr21save">Save 400</div>
                <div class="checkbox-wrapper-31">
                  <input
                    type="checkbox"
                    name="customCheckbox"
                    class="custom-checkbox"
                    checked={selectedPlan === "quarter"}
                    onChange={() => handleCheckboxChange("quarter")}
                  />
                  <svg viewBox="0 0 35.6 35.6">
                    <circle
                      class="background"
                      cx="17.8"
                      cy="17.8"
                      r="17.8"
                    ></circle>
                    <circle
                      class="stroke"
                      cx="17.8"
                      cy="17.8"
                      r="14.37"
                    ></circle>
                    <polyline
                      class="check"
                      points="11.78 18.12 15.55 22.23 25.17 12.87"
                    ></polyline>
                  </svg>
                </div>
              </div>
              <div className="pr-21">
                Month
                <div className="pr211">499 INR</div>
                <div className="pr2111x">
                  <div className="pr21save3">Equal to</div>
                  <div className="pizza"><img src={bb} alt="Description" /></div>
                </div>
                <div className="afterpizza">
                <div class="checkbox-wrapper-31">
                  <input
                    type="checkbox"
                    name="customCheckbox"
                    class="custom-checkbox"
                    id="third"
                    checked={selectedPlan === "month"}
                    onChange={() => handleCheckboxChange("month")}
                  />
                  <svg viewBox="0 0 35.6 35.6">
                    <circle
                      class="background"
                      cx="17.8"
                      cy="17.8"
                      r="17.8"
                    ></circle>
                    <circle
                      class="stroke"
                      cx="17.8"
                      cy="17.8"
                      r="14.37"
                    ></circle>
                    <polyline
                      class="check"
                      points="11.78 18.12 15.55 22.23 25.17 12.87"
                    ></polyline>
                  </svg>
                </div>
                </div>
              </div>
            </div>
            <div className="pr-3"
            onClick={() => {
            if (selectedPlan) {
            window.open("https://rzp.io/rzp/hxetkvT", "_blank");
            } else {
            toast.warning("Please select a plan before proceeding.");
            }
            }}
            >
              Upgrade Now
              <div className="prr-3">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
            <div className="pr-list">
              <ul>
                <li>
                  <p>Multiple version</p>
                </li>
                <li>
                  <p>Max 3-page Resume</p>
                </li>
                <li>
                  <p>Changeable Layouts</p>
                </li>
                <li>
                  <p>3 Fonts</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}
